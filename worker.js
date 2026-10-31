/* =====================================================================
   TRIVIA NIGHT · Intermediario Tuya (Cloudflare Worker)
   Recibe las órdenes de luz desde la app y las firma para la nube de Tuya.
   La clave de Tuya queda guardada acá, nunca en la página.

   Variables que hay que cargar en Cloudflare (Settings → Variables and Secrets):
     TUYA_ID      → Access ID / Client ID del proyecto de Tuya          (texto)
     TUYA_SECRET  → Access Secret del proyecto de Tuya                  (secreto)
     TUYA_DEVICE  → ID de la lámpara                                     (texto)
     TRIVIA_KEY   → una clave que inventes vos, la misma que pondrás en la app (secreto)
     TUYA_BASE    → (opcional) dirección según el centro de datos. Por defecto Western America:
                    Western America  https://openapi.tuyaus.com
                    Eastern America  https://openapi-ueaz.tuyaus.com
                    Central Europe   https://openapi.tuyaeu.com
                    Western Europe   https://openapi-weaz.tuyaeu.com
                    India            https://openapi.tuyain.com
                    China            https://openapi.tuyacn.com
   ===================================================================== */

let tokenCache = { token: null, exp: 0 };
const enc = new TextEncoder();

const toHex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
async function sha256Hex(str) { return toHex(await crypto.subtle.digest('SHA-256', enc.encode(str))); }
async function hmacHex(key, msg) {
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toHex(await crypto.subtle.sign('HMAC', k, enc.encode(msg))).toUpperCase();
}

async function tuya(env, method, path, bodyObj, withToken = true) {
  const base = (env.TUYA_BASE || 'https://openapi.tuyaus.com').replace(/\/+$/, '');
  const body = bodyObj ? JSON.stringify(bodyObj) : '';
  const t = Date.now().toString();
  const nonce = crypto.randomUUID();
  const stringToSign = [method, await sha256Hex(body), '', path].join('\n');
  const accessToken = withToken ? await getToken(env) : '';
  const sign = await hmacHex(env.TUYA_SECRET, env.TUYA_ID + accessToken + t + nonce + stringToSign);
  const headers = { client_id: env.TUYA_ID, sign, t, nonce, sign_method: 'HMAC-SHA256', 'Content-Type': 'application/json' };
  if (accessToken) headers.access_token = accessToken;
  const r = await fetch(base + path, { method, headers, body: body || undefined });
  return r.json();
}

async function getToken(env) {
  if (tokenCache.token && Date.now() < tokenCache.exp) return tokenCache.token;
  const j = await tuya(env, 'GET', '/v1.0/token?grant_type=1', null, false);
  if (!j.success) throw new Error('No se pudo obtener el token de Tuya: ' + (j.msg || j.code));
  tokenCache = { token: j.result.access_token, exp: Date.now() + (j.result.expire_time - 120) * 1000 };
  return tokenCache.token;
}

async function call(env, method, path, body) {
  let j = await tuya(env, method, path, body);
  if (!j.success && [1010, 1011, 1012].includes(j.code)) { // token vencido o inválido: renovar y reintentar
    tokenCache = { token: null, exp: 0 };
    j = await tuya(env, method, path, body);
  }
  return j;
}

export default {
  async fetch(req, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ORIGEN || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Trivia-Key',
      'Access-Control-Max-Age': '7200',
    };
    const out = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

    const url = new URL(req.url);
    if (url.pathname === '/' && req.method === 'GET') return out({ ok: true, msg: 'Intermediario de la Trivia funcionando' });
    if (!env.TRIVIA_KEY || req.headers.get('X-Trivia-Key') !== env.TRIVIA_KEY) return out({ ok: false, error: 'Clave de la trivia incorrecta' }, 401);
    if (!env.TUYA_ID || !env.TUYA_SECRET || !env.TUYA_DEVICE) return out({ ok: false, error: 'Faltan variables en Cloudflare (TUYA_ID, TUYA_SECRET o TUYA_DEVICE)' }, 500);

    const dev = env.TUYA_DEVICE;
    try {
      if (url.pathname === '/estado') {
        const j = await call(env, 'GET', `/v1.0/iot-03/devices/${dev}/status`);
        return out({ ok: !!j.success, result: j.result, error: j.msg, code: j.code });
      }
      if (url.pathname === '/cmd' && req.method === 'POST') {
        const { commands } = await req.json();
        if (!Array.isArray(commands) || !commands.length) return out({ ok: false, error: 'Sin comandos' }, 400);
        const j = await call(env, 'POST', `/v1.0/iot-03/devices/${dev}/commands`, { commands });
        return out({ ok: !!j.success, error: j.msg, code: j.code });
      }
      return out({ ok: false, error: 'Ruta desconocida' }, 404);
    } catch (e) {
      return out({ ok: false, error: String((e && e.message) || e) }, 500);
    }
  },
};
