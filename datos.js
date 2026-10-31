/* =====================================================================
   TRIVIA NIGHT · DATOS
   Acá se edita todo el contenido. La app (index.html) no hace falta tocarla.
   - Textos entre comillas simples: 'así'. Si el texto lleva un apóstrofo, usá comillas dobles.
   - Cada elemento de una lista termina con coma.
   - Si algo deja de andar después de editar, casi siempre es una coma o una comilla faltante.
   ===================================================================== */

window.TRIVIA = {
  titulo: 'Trivia Night',
  edicion: 'Edición Bioingeniería 2026',

  /* ---------- Apertura de cine ----------
     Antes de la fanfarria: "Apaguen sus celulares" mientras baja la luz, y después estos créditos, uno por vez.
     { estudio, texto } = logo de productora · { chico, grande } = texto chico arriba y grande abajo. */
  creditos: [
    { estudio: 'Lautaro Entertainment', texto: 'presenta' },
    { chico: 'en asociación con', grande: 'Claude' },
    { chico: 'con datos provistos por', grande: 'GLPI y Metabase' },
    { grande: 'Basada en hechos reales' },
    { grande: 'Segunda edición' },
  ],
  apertura: { celulares: 5500, credito: 2800 },   // milisegundos del cartel de celulares y de cada crédito

  /* ---------- Música (ID del video de YouTube / YouTube Music) ----------
     El ID es lo que va después de "watch?v=" en el link.
     "inicio" = segundo desde el que arranca (opcional). */
  musica: {
    intro:        { id: '5jrs1DEWzx0', nombre: '20th Century Fox Fanfare' },
    presentacion: { id: '7EhnvUTkBZM', nombre: 'The Good, the Bad and the Ugly' },
    pregunta:     { id: 'usLbaOEjqV4', nombre: '100-1000 Questions' },
    trivia:       { id: '7suM-GShRqw', nombre: 'Quiz Time' },
    tension:      { id: 'xznaPaJLwDw', nombre: 'No Time for Thoughts' },
    datos:        { id: 'aBE9EQ7gXKI', nombre: 'Spanish Flea' },
    ganador:      { id: '',            nombre: 'A definir' },   // vacío: usa la de "datos"
  },

  /* Qué música suena en cada momento (nombres de la lista de arriba, o null = silencio) */
  momentos: {
    logo: null,
    intro: 'intro',
    presentacion: 'presentacion',
    contendientes: 'presentacion', // todos juntos al final de la presentación
    reglas: 'presentacion',
    ronda: 'trivia',
    pregunta: 'pregunta',     // cuando hacés la pregunta
    pizarras: 'pregunta',     // mientras escriben sigue la misma (no se reinicia)
    tension: 'tension',       // cuando ya están por terminar
    revelado: 'datos',        // después de la respuesta: datos curiosos
    marcador: 'datos',
    cuenta: 'tension',        // cuenta final, del último al segundo
    ganador: 'ganador',       // suena después del redoble
  },

  /* ---------- Luces (Tuya directo) ----------
     Cada "look" es un estado de la lámpara del techo:
       tipo 'color'  → h: tono 0-360 (0 rojo, 40 dorado, 120 verde, 220 azul, 280 violeta), s: saturación 0-100, brillo 1-100
       tipo 'blanco' → brillo 1-100, calidez 0-100 (0 = cálido, 100 = frío)
       tipo 'efecto' → modo 'respirar' (fundido entre colores) o 'salto' (cambio brusco),
                       colores: [[h, s, brillo], ...], paso: segundos por color (0.1 a 10; la tele usa el mismo ritmo)
       respaldo: escena de SmartThings que se usa si Tuya falla ('tension', 'festejo' o 'normal')
     La pantalla se tiñe del mismo color y se oscurece cuando la luz baja. */
  looks: {
    sala:      { tipo: 'blanco', brillo: 60, calidez: 20, respaldo: 'normal' },
    oscuro:    { tipo: 'color', h: 225, s: 90, brillo: 2, respaldo: 'tension' },     // casi negro azulado: antes de un golpe
    escenario: { tipo: 'color', h: 230, s: 75, brillo: 12, respaldo: 'normal' },     // azul tenue de presentación
    azul:      { tipo: 'color', h: 220, s: 85, brillo: 30, respaldo: 'normal' },     // mientras se lee la pregunta
    pizarras:  { tipo: 'color', h: 28, s: 85, brillo: 20, respaldo: 'normal' },      // ámbar tenue mientras escriben
    tension:   { tipo: 'efecto', modo: 'respirar', colores: [[0, 100, 55], [0, 100, 6]], paso: 1.2, respaldo: 'tension' },
    dorado:    { tipo: 'color', h: 38, s: 95, brillo: 100, respaldo: 'festejo' },    // el golpe de la respuesta
    flash:     { tipo: 'blanco', brillo: 100, calidez: 60, respaldo: 'festejo' },    // destello corto
    noche:     { tipo: 'color', h: 232, s: 90, brillo: 7, respaldo: 'tension' },       // azul de noche para los reflectores de la intro
    pulso:     { tipo: 'color', h: 30, s: 85, brillo: 45, respaldo: 'normal' },       // destello cálido con cada crédito
    foco:      { tipo: 'blanco', brillo: 70, calidez: 25, respaldo: 'normal' },       // foco del presentador
    destello:  { tipo: 'efecto', modo: 'salto', colores: [[42, 90, 100], [0, 0, 100]], paso: 0.15, respaldo: 'festejo' },  // celebración corta
    fiesta:    { tipo: 'efecto', modo: 'salto', colores: [[38, 95, 100], [350, 95, 100], [280, 90, 100], [195, 90, 100], [120, 85, 100]], paso: 0.4, respaldo: 'festejo' },
  },

  /* Guion de luces: qué look va en cada momento.
     Un nombre de look, o una secuencia [[ms, look], ...] donde ms es cuándo se tiene que VER la luz desde que tocás el botón.
     La app la dispara antes según la "demora de la lámpara" que configures en el control. */
  guion: {
    logo: 'sala',
    // cine: lo arma la app sola (baja la luz y un pulso por crédito). Para personalizarlo, agregá cine: [[ms, look], ...]
    intro: [[0, 'noche'], [6100, 'dorado'], [7300, 'destello'], [8700, 'dorado'], [10500, 'sala']],   // golpe dorado con el título
    presentacion: [[0, 'flash'], [650, 'escenario']],           // destello con cada participante
    contendientes: [[0, 'flash'], [600, 'fiesta']],
    presentador: [[0, 'oscuro'], [1600, 'foco']],              // apagón y un único foco
    reglas: 'sala',
    ronda: 'sala',
    // { fade: look, de, a, ms, cada }: la luz se va apagando de a poco mientras dura el momento
    pregunta: { fade: 'azul', de: 36, a: 20, ms: 12000, cada: 3000 },        // brillo de 36% a 20%
    pizarras: { fade: 'pizarras', de: 24, a: 7, ms: 24000, cada: 3000 },     // de 24% a 7% mientras escriben
    tension: { fade: 'tension', de: 100, a: 45, ms: 12000, cada: 3000 },     // el latido rojo pierde fuerza…
    redoble: 'oscuro',        // cae la luz durante el redoble...
    revelado: 'dorado',       // ...y explota justo con la respuesta (vuelve a brillar)
    despues: 'sala',          // para los datos curiosos (a los segundos que marques en el control)
    marcador: 'sala',
    cuenta: 'oscuro',
    ganadorRedoble: 'oscuro',
    ganador: 'fiesta',
  },

  /* La pregunta aparece estos milisegundos después de que arranca su música (la de "¿Quién quiere ser millonario?") */
  entradaPregunta: 4500,

  /* ---------- Participantes ----------
     foto: archivo subido al repositorio, por ejemplo 'fotos/paulina.jpg'. Si no hay foto, muestra las iniciales.
     genero: 'f' o 'm' (para decir "ganadora" o "ganador").
     ⚠️ Edades FICTICIAS: reemplazar. */
  jugadores: [
    { nombre: 'Paulina',  foto: '', genero: 'f', edad: 27, rol: 'Auxiliar ingeniera biomédica', antiguedad: '2 años en Bioingeniería', frase: '' },
    { nombre: 'Carolina', foto: '', genero: 'f', edad: 26, rol: 'Auxiliar ingeniera biomédica', antiguedad: '2 años en Bioingeniería', frase: '' },
    { nombre: 'Lucas',    foto: '', genero: 'm', edad: 29, rol: 'Técnico electrónico',          antiguedad: '2 años en Bioingeniería', frase: '' },
    { nombre: 'Tomás',    foto: '', genero: 'm', edad: 28, rol: 'Técnico electrónico',          antiguedad: '2 años en Bioingeniería', frase: '' },
    { nombre: 'Nicolás',  foto: '', genero: 'm', edad: 23, rol: 'Pasante',                      antiguedad: 'En Bioingeniería desde septiembre de 2026', frase: '' },
  ],

  /* Presentador: aparece después de los participantes, con un único foco */
  presentador: { nombre: 'Lautaro', foto: '', rol: 'Responsable de Bioingeniería', antiguedad: 'En Bioingeniería desde 2021', frase: '' },

  /* ---------- Reglas ----------
     La primera línea (cuántas preguntas hay de cada tipo) la arma la app sola. */
  reglas: [
    'Cada uno responde en su pizarra.',
    'En opción múltiple y ¿Quién dijo?, suma un punto cada uno que acierte.',
    'En aproximación, el punto es para el que quede más cerca. Si empatan, suman todos los empatados.',
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
