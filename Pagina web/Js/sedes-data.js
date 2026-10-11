/* Datos de las sedes (de ejemplo: editá libremente textos, fotos y horarios).
   horarios: [hora de apertura, hora de cierre] en formato 24 hs. dom = domingo.
   foto: archivo dentro de /imagenes (reemplazalo por una foto real de la sede). */
const SEDES = [
 {
  "slug": "palomar",
  "nombre": "Palomar",
  "desde": 1952,
  "lat": -34.5988629,
  "lng": -58.6580119,
  "foto": "hist-1952.jpg",
  "lema": "La casa donde todo empezó",
  "horarios": {
   "lun_sab": [
    8,
    23
   ],
   "dom": [
    9,
    21
   ]
  },
  "datos": {
   "Estacionamiento": "Playa propia para 40 autos y bicicletero",
   "Vestuarios": "Con duchas y lockers, separados por género",
   "Buffet": "Abierto todos los días con menú del día",
   "Accesibilidad": "Rampa de acceso y baños adaptados"
  },
  "hitos": [
   [
    1952,
    "Un grupo de vecinos levanta la canchita original con ladrillos, maderas y mucha voluntad."
   ],
   [
    1974,
    "Se inaugura la pileta de 25 metros, la primera del barrio."
   ],
   [
    2004,
    "La sede festeja la Copa de Oro con la mejor camada de juveniles de su historia."
   ]
  ],
  "mapa": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52547.352415257374!2d-58.65801197832031!3d-34.5988629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb84d00a8c91b%3A0xbcc1aa1f048ebd3c!2sClub%20AFALP!5e0!3m2!1ses!2sar!4v1780402203372!5m2!1ses!2sar"
 },
 {
  "slug": "villa-luzuriaga",
  "nombre": "Villa Luzuriaga",
  "desde": 1989,
  "lat": -34.6741683,
  "lng": -58.5897325,
  "foto": "cat-indoor.jpg",
  "lema": "Gimnasio, salas y cancha grande",
  "horarios": {
   "lun_sab": [
    7,
    22
   ],
   "dom": [
    9,
    21
   ]
  },
  "datos": {
   "Estacionamiento": "Cocheras en la vereda y bicicletero techado",
   "Vestuarios": "Con duchas, lockers y secadores",
   "Buffet": "Cantina con desayunos y meriendas",
   "Accesibilidad": "Acceso sin escalones y ascensor al gimnasio"
  },
  "hitos": [
   [
    1989,
    "Abre la segunda sede del club, con gimnasio y un salón para artes marciales."
   ],
   [
    2001,
    "Se estrena la cancha de Fútbol 11, la única de la red de sedes."
   ],
   [
    2013,
    "Renovación completa del gimnasio y nacimiento de las salas de Yoga y Pilates."
   ]
  ],
  "mapa": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.2290464077796!2d-58.589732524880795!3d-34.67416826122112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc7c2adb51d89%3A0x4cd13e6de367e239!2sRED%20FITNESS%20CLUB%20(Sede%20Salamanca)!5e0!3m2!1ses!2sar!4v1780402689031!5m2!1ses!2sar"
 },
 {
  "slug": "parque-patricio",
  "nombre": "Parque Patricio",
  "desde": 2018,
  "lat": -34.6373794,
  "lng": -58.4105974,
  "foto": "cat-campo.jpg",
  "lema": "La sede más joven, la que abre más temprano",
  "horarios": {
   "lun_sab": [
    5,
    21
   ],
   "dom": [
    8,
    21
   ]
  },
  "datos": {
   "Estacionamiento": "Estacionamiento sobre la calle y bicicletero",
   "Vestuarios": "Con duchas y lockers, renovados en 2024",
   "Buffet": "Kiosco y buffet los fines de semana",
   "Accesibilidad": "Rampas y baño adaptado en planta baja"
  },
  "hitos": [
   [
    2018,
    "Se inaugura Parque Patricio y el club completa sus tres sedes."
   ],
   [
    2021,
    "El gimnasio empieza a abrir a las 5 de la mañana, para los madrugadores del barrio."
   ],
   [
    2024,
    "Se suman las canchas de Tenis y el salón de Tenis de Mesa."
   ]
  ],
  "mapa": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.6858075123414!2d-58.410597423416355!3d-34.637379359278285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb0e4d34e289%3A0x1138b4a8351088cd!2sHurac%C3%A1n%20Social%20Gym!5e0!3m2!1ses!2sar!4v1780524268274!5m2!1ses!2sar"
 }
];
