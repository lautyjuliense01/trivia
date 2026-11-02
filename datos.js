/* =====================================================================
   TRIVIA NIGHT · DATOS
   Acá se edita todo el contenido. La app (index.html) no hace falta tocarla.
   - Textos entre comillas simples: 'así'. Si el texto lleva un apóstrofo, usá comillas dobles.
   - Cada elemento de una lista termina con coma.
   - Si algo deja de andar después de editar, casi siempre es una coma o una comilla faltante.
   ===================================================================== */

window.TRIVIA = {
  titulo: 'El Ticket Dorado',
  premio: 'el ticket dorado',     // lo que se lleva el ganador ("¿Quién se llevará el ticket dorado?")
  edicion: 'Edición Bioingeniería 2026',

  /* ---------- Apertura de cine ----------
     Antes de la fanfarria: "Apaguen sus celulares" mientras baja la luz, y después estos créditos, uno por vez.
     { estudio, texto } = logo de productora · { chico, grande } = texto chico arriba y grande abajo. */
  creditos: [
    // Intro de estudio "El monumento" (dura 11 s; para cambiarlo: ms: 12000).
    // monograma: letras del emblema (si no, las iniciales) · anillo: texto alrededor del emblema
    { estudio: 'Lautaro Entertainment', texto: 'presenta', monograma: 'LE', anillo: 'Lautaro Entertainment · MMXXVI' },
    { chico: 'una producción para', grande: 'Bioingeniería' },
    { chico: 'en asociación con', grande: 'Claude' },
    { chico: 'con la colaboración involuntaria de', grande: 'GLPI y Metabase' },
    { chico: 'basada en', grande: 'Datos reales' },
    { chico: 'filmada íntegramente en el', grande: 'Hospital Italiano' },
    { chico: 'y un agradecimiento muy especial', grande: 'al enchufe' },
    { chico: 'MMXXVI', grande: 'Segunda edición' },
  ],
  apertura: {
    credito: 2800,          // ms de cada crédito (si no se usa duracionCreditos)
    duracionCreditos: 64000,  // ms: los créditos duran lo mismo que la música (1:04) y se reparten solos
    estudioMs: 12000,       // la intro de estudio
    finalMs: 16000,         // el último ("Segunda edición"), más largo
    climax: null,           // segundo de la música en que cae el golpe del final (null = 2 s después de que entra)
    golpes: 'extremos',     // golpe grave en los créditos: 'todos', 'extremos' (solo el último) o 'ninguno'
    graveEstudio: true,     // golpe grave cuando el emblema de la intro de estudio se asienta
    graves: true,           // cada aviso entra con un golpe grave de cine (false = avisos en silencio)
    volGraves: 1,           // volumen de los graves (0 a 1.5)
    // Avisos de sala antes de los créditos. ms opcional; si no, se calcula por el largo del texto.
    // sonido (opcional): 'grave' (el de siempre), 'envolvente' (crece, gira por la sala y golpea), 'audio/archivo.mp3' o '' (silencio).
    // audio opcional: 'audio/archivo.mp3' subido al repositorio (por ejemplo, una voz en off grabada).
    // Locución de sala: el audio (subido al repositorio) con una placa por frase. en = segundo del audio en que arranca esa frase.
    // Si está, reemplaza a los avisos de abajo (menos "Bioingeniería Surround", que sigue después). Sin archivo = avisos mudos.
    locucion: {
      archivo: 'avisos.mp3', volumen: 1,
      placas: [
        { en: 0,    texto: 'Te damos la bienvenida', sub: 'a nuestra sala' },
        { en: 2.45, texto: 'La función está por comenzar' },
        { en: 5.4,  icono: 'butaca',   texto: 'Tomá asiento' },
        { en: 10.25, icono: 'mudo',    texto: 'Silencio en la sala' },
        { en: 16.65, icono: 'celular', texto: 'Apagá tu celular' },
        { en: 21.75, icono: 'pantalla', texto: 'Sin dispositivos durante los desafíos' },
        { en: 27.7, icono: 'salida',   texto: 'Salida de emergencia' },
        { en: 31.8, icono: 'salida',   texto: 'En caso de derrota desastrosa' },
        { en: 36.45, icono: 'camara',  texto: 'Fotos permitidas', sub: 'con discreción' },
        { en: 40.35, icono: 'comida',  texto: 'Bebidas y comida', sub: 'durante toda la función' },
        { en: 45.7, estilo: 'legal',   texto: 'La organización no se responsabiliza por daños ocasionados a reputaciones ni amistades como consecuencia de los resultados de esta competencia.' },
        { en: 54.25, texto: 'Te deseamos una excelente función' },
        { en: 57.4, texto: 'El Ticket Dorado', sub: 'comienza en instantes', hasta: 62.5 },
      ],
    },
    avisos: [
      // icono: 'shh', 'celular', 'silencio', 'marcador', 'salida', 'sonido', 'reloj' o 'estrella'
      { icono: 'shh',      texto: 'Silencio, por favor', sub: 'Se apagan las luces de la sala', sonido: '' },   // sin sonido
      { icono: 'celular',  texto: 'Por favor, apaguen sus celulares', sub: 'La función está por comenzar' },
      { icono: 'silencio', texto: 'Se ruega no soplar las respuestas', sub: 'El que sabe, sabe' },
      { icono: 'marcador', texto: 'Tengan a mano su pizarra y marcador', sub: 'Las respuestas se escriben, no se gritan' },
      { icono: 'salida',   texto: 'Las salidas de emergencia están señalizadas', sub: 'Pero nadie se va hasta el final' },
      // Prueba de sonido para la barra: unos 5 s de sonido que crece y gira, golpe grave, destello del techo y aparece el texto.
      // subida: ms hasta el golpe · luz: false para que el techo no destelle
      { texto: 'Bioingeniería Surround', sonido: 'envolvente', subida: 4800 },
    ],
  },

  /* Conexión celu ↔ tele: en el celu se reconecta a mano (tocando el estado 🔄).
     pantallaAuto: la tele rehace sola un servidor que se cae (no se la puede tocar en el show). false = también a mano. */
  conexion: { pantallaAuto: true },

  /* ---------- Previa automática ----------
     Desde el celu tocás "Comenzar previa automática". Antes de cada paso aparece un aviso con cuenta regresiva
     y un botón para deshacer: si lo tocás, se frena toda la secuencia y seguís a mano.
     en: segundo de la pista · resta: segundos antes del final · fin: cuando termina la pista */
  previa: {
    resumen: 'Luz de sala (tira apagada) y Hold the Line al 20 → al 1:30, pantalla hipnótica → a 1 min del final, baja la luz, prende la tira y el volumen sube hasta 70 → al terminar, arranca la apertura.',
    inicio: { luz: 'salaInicio', pista: 'pista0', volumen: 20, pantalla: 'apagado' },   // salaInicio = luz de sala con la tira apagada; la tira prende cuando baja la luz (ambiente)
    pasos: [
      { en: 90, pantalla: 'hipnotico', aviso: 'Pantalla hipnótica' },
      { resta: 60, luz: 'ambiente', volumen: 70, rampa: true, aviso: 'Luz ambiente y volumen subiendo hasta 70' },
      { fin: true, siguiente: true, aviso: 'Arranca la apertura de cine' },
    ],
    avisoSeg: 8,             // segundos de aviso antes de cada paso
    pruebaDesde: 170,        // para probar: tildando "🧪 Prueba" en el celu, Hold the Line arranca en 2:50 (ya hipnótica, a punto de bajar la luz)
    hastaGolpe: true,        // al terminar la previa sigue sola: apertura, fanfarria, tu entrada y el golpe (false = se frena en la apertura)
  },

  /* ---------- Cortometraje antes de la película (como Pixar) ----------
     Va después de los avisos de sala ("Bioingeniería Surround") y antes de la intro de estudio.
     A pantalla completa, sin controles; cuando termina sigue sola.
     inicio / fin: segundos para recortarlo (fin sirve para cortar antes de la pantalla final de YouTube) · volumen: 0 a 1 */
  corto: { local: true, archivo: '', id: '', nombre: 'La historia de Bioingeniería', inicio: 0, fin: null, volumen: 1 },
  // local: true = el video se elige de los archivos de la compu de la tele (botón 🎞️ en su pantalla de inicio; en Chrome/Edge queda recordado)
  // archivo: mp4 subido al repositorio (si pesa menos de 100 MB) · id: un video de YouTube · todo vacío/false = sin corto

  /* ---------- Música (ID del video de YouTube / YouTube Music) ----------
     El ID es lo que va después de "watch?v=" en el link.
     "inicio" = segundo desde el que arranca (opcional). */
  musica: {
    previa:       { id: '',            nombre: 'A definir: música de previa' },       // mientras esperan, pantalla en negro
    cine:         { id: '6h2qMHjHGvo', nombre: 'Apertura de cine (Dolby Atmos)', inicio: 0, repetir: false, credito: false },   // completa (1:04), entra con la intro de estudio
    intro:        { id: 'zQdK6HLN2qI', nombre: 'Universal Pictures (100 años)' },
    presentacion: { id: '7EhnvUTkBZM', nombre: 'The Good, the Bad and the Ugly' },
    pregunta:     { id: 'usLbaOEjqV4', nombre: '100-1000 Questions', bucle: [7, 35], revela: 49 },
                  // bucle: [desde, hasta] → al llegar a "hasta" vuelve a "desde", así la pregunta dura lo que haga falta (acepta decimales: 35.2).
                  //   Se afina en el celu, en la pregunta (🔁 Bucle del tema), y después se copia acá.
                  // revela: al tocar Revelar sale del bucle y la respuesta aparece justo en ese segundo; después el tema sigue hasta el final y pasa a "datos"
                  // tension: (opcional) segundo en que la luz pasa a tensión; si no está, al final del bucle
    final:        { id: 'vScraQIhz4M', nombre: "Let's Play for One Million!" },   // la última pregunta y el desempate
    tension:      { id: 'xznaPaJLwDw', nombre: 'No Time for Thoughts' },
    datos:        { id: 'aBE9EQ7gXKI', nombre: 'Spanish Flea' },
    anfitrionVoz: { id: 'q9C_euAFpW8', nombre: 'Voz: Ladies and gentlemen', inicio: 0, duracion: 21, fin: 19 },   // los últimos 2 s son silencio: en el 19 entra el tema
                  // opcionales: fin: segundo en que se corta la voz · solape: segundos que se pisan voz y tema (0.3)
    anfitrion:    { id: 'p3l7fgvrEKM', nombre: 'Freed from Desire (Gala)', inicio: 10 },   // tu entrada (antes: I Gotta Feeling Jt0qUO4pqWQ)
    redoble:      { id: '',            nombre: 'A definir: redoble' },                 // suena en un segundo reproductor, arranca al instante
    respuesta:    { id: '',            nombre: 'A definir: golpe de respuesta' },      // al revelar; después pasa a "datos"

    ganador:      { id: '',            nombre: 'A definir' },   // vacío: usa la de "datos"
    premios:      { id: '',            nombre: 'A definir: entrega de premios' },
    enjuego:      { id: 'BuYf0taXoNw', nombre: 'Presentación de premios' },   // mientras se dan vuelta los premios
    ticket:       { id: '',            nombre: 'A definir: aparece el ticket dorado' },  // cuando aparece el ticket
    muletilla:    { id: '',            nombre: 'A definir: muletilla del ticket', inicio: 0 },   // fragmento corto para el botón 🎫 (vacío = campanas)
    gracias:      { id: '-QuVe-hjMs0', nombre: 'Cierre: palabras de agradecimiento', inicio: 20, volumen: 0.55, credito: false },   // suena más bajo (55 %) para hablar encima
    cierre:       { id: '0T-if-Vj2Xs', nombre: 'Créditos finales', credito: false },   // el rodillo de créditos dura lo que la canción
  },

  /* ---------- Pistas a mano ----------
     Aparecen como botones en el celu (🎵 Pistas a mano) y suenan en la tele cuando las tocás,
     hasta que pases de pantalla o vuelvas a "Automático". */
  pistas: [
    { id: 'ZP69PLBqFUo', nombre: 'Hold the Line (Toto)' },
  ],

  /* Cuánto dura el golpe de respuesta antes de pasar a la música de datos curiosos (ms) */
  respuestaMs: 4000,

  /* Al salir de una pregunta, lo que venía sonando se desvanece en este tiempo (ms) mientras arranca lo siguiente */
  desvanecerMs: 5000,

  /* Qué música suena en cada momento (nombres de la lista de arriba, o null = silencio) */
  momentos: {
    previa: 'previa',
    cine: 'cine',
    intro: 'intro',
    presentamos: 'presentacion',  // arranca con el título "Presentamos a los contendientes"
    presentacion: 'presentacion',
    contendientes: 'presentacion', // todos juntos al final de la presentación
    presentador: 'anfitrion',
    enjuego: 'enjuego',       // presentación de premios (si está vacío, sigue la que venía)
    enjuegoTicket: 'enjuego', // cuando aparece el ticket dorado sigue la misma (Piratas del Caribe)
    reglas: 'presentacion',
    ronda: null,              // a definir (Quiz Time queda afuera)
    pregunta: 'pregunta',     // cuando hacés la pregunta
    pizarras: 'pregunta',     // mientras escriben sigue la misma (no se reinicia)
    tension: 'pregunta',      // sigue la misma: la música de tensión queda para la cuenta final
    revelado: 'datos',        // después del golpe de respuesta: datos curiosos
    marcador: 'datos',
    cuenta: 'tension',        // cuenta final, del último al segundo
    ganador: 'ganador',       // suena después del redoble
    premios: 'premios',
    gracias: 'gracias',       // tus palabras de cierre
    cierre: 'cierre',
  },

  /* Intro: milisegundo de la fanfarria en que aparece el título (con Universal, el 15) */
  intro: { titulo: 15000, salida: null },   // salida: segundo de la fanfarria en que pasa sola a tu entrada (null = cuando termina)

  /* ---------- Lámparas ----------
     Nombre → ID de Tuya. Los mismos IDs tienen que estar en TUYA_DEVICE del intermediario (separados por coma).
     En el control elegís si se usa una, la otra o todas juntas. */
  lamparas: {
    techo: 'eba75b70df50a7545c9thx',
    // tira LED detrás del sillón, en "DP Instruction" (funciones reales en formato texto).
    //   modo 'dp'   → color, blanco, escenas y fundidos nativos (requiere la tira en modo DP en Tuya)
    //   modo 'vivo' → solo la orden en vivo (usar si la volvés a "Standard Instruction")
    //   escenas: false → sin escenas (si las escenas no le andan, los fundidos usan la orden en vivo)
    //   vMin1000: brillo mínimo (0-1000) para que no se apague en los looks muy oscuros
    //   Es solo RGB: los blancos se arman con color (si algún día tuviera canal blanco: blanco: true)
    tira:  { id: 'eb65b658340d7685eatgz1', modo: 'dp', vMin1000: 10, escala: 0.7 },   // detrás de la tele: escala baja su brillo en todos los looks (1 = igual que el techo)
  },

  /* ---------- Luces (Tuya directo) ----------
     Si querés que una lámpara haga algo distinto en un look, agregale una variante con su nombre:
       ej.  escenario: { tipo: 'color', h: 230, s: 75, brillo: 12, tira: { h: 280, brillo: 30 } }
       o    tira: { apagar: true } para que en ese look la tira se apague.
     Cada "look" es un estado de la lámpara del techo:
       tipo 'color'  → h: tono 0-360 (0 rojo, 40 dorado, 120 verde, 220 azul, 280 violeta), s: saturación 0-100, brillo 1-100
       tipo 'blanco' → brillo 1-100, calidez 0-100 (0 = cálido, 100 = frío)
       tipo 'efecto' → modo 'respirar' (fundido entre colores) o 'salto' (cambio brusco),
                       colores: [[h, s, brillo], ...], paso: segundos por color (0.1 a 10; la tele usa el mismo ritmo)
       respaldo: escena de SmartThings que se usa si Tuya falla ('tension', 'festejo' o 'normal')
     La pantalla se tiñe del mismo color y se oscurece cuando la luz baja. */
  looks: {
    // transicion: segundos que tarda la lámpara en llegar a este look (fundido suave). Sin transicion = cambio inmediato.
    sala:      { tipo: 'blanco', brillo: 60, calidez: 20, transicion: 2, respaldo: 'normal' },
    salaInicio: { tipo: 'blanco', brillo: 60, calidez: 20, transicion: 2, respaldo: 'normal', tira: { apagar: true } },   // llegada: techo de sala, tira apagada
    ambiente:  { tipo: 'color', h: 30, s: 80, brillo: 16, transicion: 4, respaldo: 'normal' },          // previa: cálido y tenue
    oscuro:    { tipo: 'color', h: 225, s: 90, brillo: 2, respaldo: 'tension' },     // casi negro azulado: antes de un golpe
    escenario: { tipo: 'color', h: 230, s: 75, brillo: 12, transicion: 0.8, respaldo: 'normal' },     // azul tenue de presentación
    azul:      { tipo: 'color', h: 220, s: 85, brillo: 30, transicion: 1.5, respaldo: 'normal' },     // mientras se lee la pregunta
    pizarras:  { tipo: 'color', h: 28, s: 85, brillo: 20, respaldo: 'normal' },      // ámbar tenue mientras escriben
    tension:   { tipo: 'efecto', modo: 'respirar', colores: [[0, 100, 55], [0, 100, 6]], paso: 1.2, respaldo: 'tension' },
    dorado:    { tipo: 'color', h: 38, s: 95, brillo: 100, respaldo: 'festejo' },    // el golpe de la respuesta
    flash:     { tipo: 'blanco', brillo: 100, calidez: 60, respaldo: 'festejo' },    // destello corto
    noche:     { tipo: 'color', h: 232, s: 90, brillo: 7, respaldo: 'tension' },       // azul de noche para los reflectores de la intro
    pulso:     { tipo: 'color', h: 30, s: 85, brillo: 45, respaldo: 'normal' },       // destello cálido con cada crédito
    foco:      { tipo: 'blanco', brillo: 75, calidez: 25, respaldo: 'normal', tira: { tipo: 'color', h: 38, s: 90, brillo: 55 } },   // foco blanco (ya no se usa en tu entrada)
    // Tu entrada. tele: 'ritmo' = la tele no copia la lámpara: hace su propio juego, clavado al bombo del tema.
    latido:      { tipo: 'efecto', modo: 'respirar', colores: [[355, 85, 14], [355, 85, 1]], paso: 0.94, respaldo: 'tension', tira: { colores: [[352, 90, 30], [352, 90, 3]] } },        // carmesí que late lento
    latidoRapido: { tipo: 'efecto', modo: 'respirar', colores: [[8, 90, 22], [8, 90, 1]], paso: 0.47, respaldo: 'tension', tira: { colores: [[10, 95, 45], [10, 95, 4]] } },   // late al doble: "con ustedes…"
    estroboHost: { tipo: 'efecto', modo: 'salto', colores: [[0, 0, 100], [0, 0, 0]], paso: 0, respaldo: 'festejo', tele: 'ritmo' },
    // Paleta cálida (dorado, ámbar, carmesí): la tira ahora está detrás de la tele y tiene que acompañar lo que se ve.
    fiestaHost:  { tipo: 'efecto', modo: 'salto', colores: [[42, 95, 40], [22, 95, 36], [48, 85, 42], [355, 85, 32]], paso: 0.94, respaldo: 'festejo', tele: 'ritmo',
                   tira: { modo: 'respirar', colores: [[40, 90, 55], [20, 95, 35]], paso: 0.94 } },   // fiesta sin encandilar
    contraluz:   { tipo: 'color', h: 20, s: 90, brillo: 4, respaldo: 'festejo', tele: 'ritmo',
                   tira: { tipo: 'efecto', modo: 'salto', colores: [[42, 95, 85], [18, 95, 70], [48, 85, 90], [355, 90, 60]], paso: 0.47 } },   // techo casi apagado, la tira detrás de la tele
    fiestaDorada: { tipo: 'efecto', modo: 'salto', colores: [[38, 95, 40], [15, 95, 40], [355, 95, 40], [45, 90, 40]], paso: 0.94, respaldo: 'festejo', tele: 'ritmo', tira: { modo: 'respirar', colores: [[44, 85, 55], [30, 95, 40]], paso: 0.94 } },
    barrido:     { tipo: 'efecto', modo: 'respirar', colores: [[42, 95, 40], [8, 90, 34]], paso: 0.94, respaldo: 'festejo', tele: 'ritmo', tira: { modo: 'respirar', colores: [[40, 90, 55], [12, 90, 40]], paso: 0.94 } },   // dorado ↔ carmesí
    destello:  { tipo: 'efecto', modo: 'salto', colores: [[42, 90, 100], [0, 0, 100]], paso: 0.15, respaldo: 'festejo' },  // celebración corta
    apagado:   { tipo: 'apagado' },   // apaga todo; el look siguiente las vuelve a prender solo
    estrobo:   { tipo: 'efecto', modo: 'salto', colores: [[0, 0, 100], [0, 0, 0]], paso: 0, respaldo: 'festejo' },   // titila lo más rápido posible, 100 ↔ 0
    flashUnico: { tipo: 'flashUnico', ms: 40, lamparas: ['techo'], respaldo: 'festejo' },   // un solo destello blanco frío (solo techo) y vuelve a lo que había
    calido:    { tipo: 'color', h: 32, s: 75, brillo: 26, transicion: 2, respaldo: 'normal' },   // después de la respuesta: tenue, sin cortar el clima
    fiesta:    { tipo: 'efecto', modo: 'salto', colores: [[42, 95, 85], [26, 95, 75], [48, 80, 90], [10, 90, 65]], paso: 0.6, respaldo: 'festejo', tira: { modo: 'respirar', colores: [[40, 90, 60], [24, 95, 40]], paso: 1.2 } },   // festejo dorado (sin arcoíris)
  },

  /* Guion de luces: qué look va en cada momento.
     Un nombre de look, o una secuencia [[ms, look], ...] donde ms es cuándo se tiene que VER la luz desde que tocás el botón.
     La app la dispara antes según la "demora de la lámpara" que configures en el control. */
  guion: {
    previa: 'salaInicio',    // al reiniciar la partida queda la luz de sala (tira apagada), lista para la previa
    presentamos: [[0, 'oscuro'], [1700, 'escenario']],
    // cine: lo arma la app sola (baja la luz y un pulso por crédito). Para personalizarlo, agregá cine: [[ms, look], ...]
    intro: [[0, 'noche'], [15300, 'dorado'], [16500, 'destello'], [17900, 'dorado'], [19700, 'calido']],   // golpe dorado con el título (seg. 15)
    presentacion: [[0, 'flash'], [650, 'escenario']],           // destello con cada participante
    contendientes: [[0, 'oscuro'], [1650, 'flash'], [2250, 'fiesta']],   // aparecen a oscuras y explota el festejo
    // presentador: lo arma la app según tus textos (oscuro → latido → latido rápido en "con ustedes…")
    // presentadorGolpe: lo arma la app: 2 compases de estrobo y después frases de 4 compases que van cambiando
    //   (las frases se eligen en presentador.frases), con un compás de estrobo cada 8
    reglas: 'calido',        // cálido y tenue; cada regla que se da vuelta tira un pulso de luz
    enjuego: 'calido',       // premios en juego: pulso con cada premio; destello y dorado con el ticket
    ronda: 'sala',
    // { fade: look, de, a, ms }: la luz se va apagando suave (una sola orden, la lámpara hace el fundido; máx. 10 s)
    pregunta: { fade: 'azul', de: 36, a: 12, ms: 10000 },
    pizarras: null,           // null = no cambia: sigue la luz que venía
    tension: 'tension',
    redoble: 'oscuro',        // cae la luz durante el redoble...
    revelado: 'dorado',       // ...y explota justo con la respuesta (vuelve a brillar)
    despues: 'calido',        // para los datos curiosos (a los segundos que marques en el control)
    marcador: 'sala',
    cuenta: 'oscuro',
    ganadorRedoble: 'oscuro',
    ganador: 'fiesta',
    premios: 'calido',
    cierre: 'ambiente',
  },

  /* Velocidad de las escenas de las luces: segundos por cada punto de velocidad de Tuya (calibrado con la tira: velocidad 5 ≈ 6 s).
     Si los efectos salen más lentos de lo pedido, subilo un poco; si salen más rápidos, bajalo. */
  escalaEscena: 0.065,

  /* La pregunta aparece estos milisegundos después de que arranca su música (la de "¿Quién quiere ser millonario?") */
  entradaPregunta: 4500,
  /* El número de la pregunta entra antes que el texto (si no se pone, 1,5 s antes: 3000) */
  entradaNumero: 3000,

  /* Fotos: 'duotono' (todas con el mismo tratamiento dorado, para que fotos muy distintas queden como un set), 'byn' o 'color' */
  fotos: { estilo: 'duotono' },

  /* ---------- Participantes ----------
     foto: archivo subido al repositorio, por ejemplo 'fotos/paulina.jpg'. Si no hay foto, muestra las iniciales.
     genero: 'f' o 'm' (para decir "ganadora" o "ganador").
     apodo: opcional, aparece chico debajo del nombre (si no, aparece el puesto).
     guion: lo que vas a contar antes de decir el nombre; lo ves en el celu como ayuda (no sale en la tele).
     ⚠️ Edades FICTICIAS: reemplazar. */
  jugadores: [
    { nombre: 'Paulina',  foto: '', genero: 'f', edad: 27, rol: 'Auxiliar ingeniera biomédica', antiguedad: '2 años en Bioingeniería', frase: '', apodo: '', guion: '' },
    { nombre: 'Carolina', foto: '', genero: 'f', edad: 26, rol: 'Auxiliar ingeniera biomédica', antiguedad: '2 años en Bioingeniería', frase: '', apodo: '', guion: '' },
    { nombre: 'Lucas',    foto: '', genero: 'm', edad: 29, rol: 'Técnico electrónico',          antiguedad: '2 años en Bioingeniería', frase: '', apodo: '', guion: '' },
    { nombre: 'Tomás',    foto: '', genero: 'm', edad: 28, rol: 'Técnico electrónico',          antiguedad: '2 años en Bioingeniería', frase: '', apodo: '', guion: '' },
    { nombre: 'Nicolás',  foto: '', genero: 'm', edad: 23, rol: 'Pasante',                      antiguedad: 'En Bioingeniería desde septiembre de 2026', frase: '', apodo: '', guion: '' },
  ],

  /* Presentación de contendientes: contás sus datos y, al decir el nombre, tocás el botón.
     El nombre aparece con su sello y a los ms se va, para dejar la pantalla limpia. estilo: 'fotos' = la versión anterior */
  presentacion: { ms: 3000 },

  /* Presentador: entra después de la intro y antes de presentar a los contendientes */
  presentador: {
    nombre: 'Lautaro', foto: '', rol: 'Responsable de Bioingeniería', antiguedad: 'En Bioingeniería desde 2021', frase: '',
    // Lo que aparece a oscuras mientras entrás, estilo tráiler. Cada texto entra en un segundo de:
    //   voz: la voz de presentación (0 a 21) · tema: el video del tema (el segundo que ves en YouTube; arranca en el 10)
    // dura: segundos que queda si el siguiente tarda (6 por defecto). El último queda hasta el golpe.
    // En el celu, arriba, ves el segundo de la voz y del tema mientras suenan: así lo ajustás fino.
    textos: [
      { texto: '¿Están listos?', voz: 2 },
      { texto: 'Damas y caballeros', voz: 7 },
      { texto: 'Bienvenidos', voz: 10 },
      { texto: 'Esta noche', tema: 12, dura: 9 },
      { texto: 'Solo uno conoce todas las respuestas', tema: 21, dura: 11 },
      { texto: 'Él escribió las preguntas', tema: 33, dura: 6.5 },
      { texto: 'Sabe quién dijo qué', tema: 40, dura: 6.5 },
      { texto: 'Y no va a soplar ninguna', tema: 47, dura: 7 },
      { texto: 'Con ustedes', tema: 55 },
    ],
    // Golpe de entrada automático: segundo del tema en que cae (con la apertura en automático). null = siempre a mano.
    golpeTema: 59,
    // Qué aparece en el golpe: 'logo' (el logo de la trivia, como en la tele) o 'nombre' (tu nombre y foto)
    revelar: 'logo',
    logoArriba: 'Segunda edición',
    golpeAuto: 0,   // ms: si es mayor que 0, el golpe de entrada sale solo a ese tiempo (si no lo tocás antes)
    // Ritmo del tema para que la tele destelle en el bombo. Lo más fácil: calibrarlo en el ensayo desde el celu (🥁 Calibrar).
    // fase: segundo del video en que cae un golpe (lo da la calibración). Sin fase, el compás arranca cuando tocás el golpe.
    ritmo: { bpm: 129, fase: null },
    // Después del golpe: juegos de luces de 4 compases cada uno, en este orden (se repiten ~1 minuto)
    frases: ['fiestaHost', 'contraluz', 'fiestaDorada', 'barrido'],
    // Efectos marcados a mano (segundos del video del tema). Se marcan en el ensayo desde el celu (🎯 Marcar efectos):
    // en cada uno, un compás de estrobo antes y en la marca explota (confeti) y cambia el juego de luces.
    // Vacío = como antes: el efecto sale solo cada 8 compases. Lo que marques en el celu manda sobre esto.
    acentos: [],
    // marcaDemora: { celu: 0.25, pantalla: 0.08 },   // segundos que se descuentan a cada toque (demora de la red + reacción)
  },

  /* ---------- Lo que está en juego ----------
     Después de las reglas: se dan vuelta los premios de a uno y al final aparece el ticket dorado.
     foto: opcional ('premios/archivo.jpg' subido al repositorio) · detalle: opcional, una línea */
  premiosEnJuego: [
    { nombre: 'Premio 1', detalle: '' },
    { nombre: 'Premio 2', detalle: '' },
    { nombre: 'Premio 3', detalle: '' },
    { nombre: 'Premio 4', detalle: '' },
    { nombre: 'Premio 5', detalle: '' },
  ],
  /* Botón 🎫 del celu: lo tocás antes de decir "el ticket dorado" y aparece en la tele con su sonido, en cualquier momento.
     ms: cuánto dura · luz: false para que el techo no destelle */
  muletilla: { ms: 3600, luz: true },
  /* Cierre: foto del equipo (subila al repositorio) */
  gracias: { foto: '', titulo: 'Gracias', texto: 'por otro año de equipo' },

  ticketDorado: {},   // el diseño del ticket (sin beneficios ni número)

  /* ---------- Reglas ----------
     La primera línea (cuántas preguntas hay de cada tipo) la arma la app sola. */
  // Se muestran como tarjetas que se dan vuelta de a una (un toque por regla). La primera (rondas y preguntas) la arma la app.
  // icono: 'marcador', 'pizarra', 'estrella', 'diana', 'ticket', 'corona', 'reloj', 'silencio', 'celular', 'salida', 'sonido', 'rondas', 'regalo'
  reglas: [
    { icono: 'marcador', titulo: 'En la pizarra', texto: 'Cada uno escribe su respuesta. Nada de soplar.' },
    { icono: 'pizarra',  titulo: 'Solo la respuesta', texto: 'En la pizarra no puede haber nada más escrito: ni cuentas, ni borradores, ni dibujos.' },
    { icono: 'estrella', titulo: 'Un punto', texto: 'En opción múltiple y ¿Quién dijo?, suma cada uno que acierte.' },
    { icono: 'diana',    titulo: 'El más cerca', texto: 'En aproximación gana el punto quien quede más cerca. Si empatan, suman todos.' },
    { icono: 'ticket',   titulo: 'Desempate', texto: 'Si al final hay empate, una pregunta más define quién se lleva el ticket dorado.' },
  ],

  /* ---------- Rondas y preguntas ----------
     tipo 'opciones' → opciones: [...], correctas: [índices desde 0]. Sin opciones = respuesta abierta (usa "respuesta").
     tipo 'quien'    → mensajes: [{ texto, hora }], respuesta: quién lo dijo, imagen: opcional ('img/archivo.jpg').
     tipo 'aprox'    → respuesta: número.
     nota: dato curioso para comentar al revelar (lo ves solo vos en el celu, y opcionalmente en la tele con mostrarNota: true).
     ⚠️ Preguntas de la trivia 2025, como base. */
  rondas: [
    {
      titulo: 'Opción múltiple',
      tipo: 'opciones',
      preguntas: [
        { texto: '¿Cuál es el día de la semana que más tickets se realizaron?', respuesta: 'Martes',
          nota: 'La diferencia es de solo 3 tickets.' },
        { texto: '¿Quién fue la persona que más tickets realizó a Bioingeniería en 2025?',
          opciones: ['Gabriela Avila', 'Yanina Gonzalez', 'Roxana Zalazar', 'Marcela Tula'], correctas: [0],
          nota: 'Más de 100. Mención especial para Natalia Gutierrez, que entra en el top 5.' },
        { texto: '¿A qué familia pertenece el equipo con más reportes de falla en el año?',
          opciones: ['Autoclave', 'Polígrafo', 'Colposcopio', 'EEG'], correctas: [0, 1, 2, 3],
          nota: '¡Todas correctas! Con 8 reportes cada uno, el autoclave, uno de los polígrafos, un colposcopio y el EEG empatan.' },
      ],
    },
    {
      titulo: '¿Quién dijo?',
      tipo: 'quien',
      preguntas: [
        { mensajes: [{ texto: 'A eso le falta un adaptador o no?', hora: '14:02' }], respuesta: 'Magalí Bori' },
        { mensajes: [{ texto: 'Holaa, recién llego a mi casa y me di cuenta que me traje el celu de la oficina', hora: '18:54' }], respuesta: 'Paulina' },
        { mensajes: [{ texto: 'Olvídate, saco a flote al hospital en una semana', hora: '18:22' }], respuesta: 'Tomás' },
        { mensajes: [{ texto: 'Pero lpm me olvidé el cargador', hora: '05:07' }], respuesta: 'Lucas' },
        { mensajes: [{ texto: 'Y ese quién es? Jajajajaja', hora: '09:15' }], respuesta: 'Magui Bori' },
        { mensajes: [{ texto: 'Alguien tiene 810 usd para prestarme', hora: '01:36' }], respuesta: 'Paulina' },
        { mensajes: [{ texto: 'Y traé una pila AA', hora: '15:03' }, { texto: 'El termómetro no prende', hora: '15:03' }], respuesta: 'Magalí Bori' },
        { mensajes: [{ texto: 'Perdón, necesito que exista un secador de pelo instantáneo', hora: '19:50' }], respuesta: 'Lucio Giuffrida (PPS)' },
        { mensajes: [{ texto: 'Corté la luz', hora: '13:50' }], respuesta: 'Carolina' },
        { mensajes: [{ texto: 'Hay olor a buenas vibras', hora: '18:24' }, { texto: 'Prendimos un palo santo', hora: '18:24' }], respuesta: 'Magui Bori' },
      ],
    },
    {
      titulo: 'Aproximación',
      tipo: 'aprox',
      preguntas: [
        { texto: '¿Cuántos incidentes fueron realizados a Bioingeniería en el año 2025?', respuesta: 2114,
          nota: 'Esto representa atender unos 10 tickets por día hábil.' },
        { texto: '¿Cuántos MP se realizaron en el año 2025 según lo cargado en GLPI?', respuesta: 196 },
        { texto: '¿Cuál es el récord de más MP realizados en un mismo mes este año?', respuesta: 39,
          nota: 'Agosto: récord absoluto, seguido de octubre.' },
        { texto: '¿Cuántos equipos activos tenemos registrados en GLPI en Córdoba?', respuesta: 1256,
          nota: 'Incluye tensiómetros.' },
        { texto: '¿Cuántas personas distintas hicieron un incidente a Bioingeniería?', respuesta: 287,
          nota: 'Aproximadamente un cuarto del hospital.' },
      ],
    },
  ],

  /* Pregunta de desempate (aproximación). Solo aparece si hay empate al final. */
  desempate: { texto: '¿Cuántos kilómetros recorrió el equipo de Bioingeniería entre sedes en 2025?', respuesta: 1500,
               nota: '⚠️ Pregunta de ejemplo: reemplazar.' },
};
