/* Datos de ejemplo (historias inventadas). Editá libremente. */
const DEPORTES = [
 {
  "slug": "futbol-5",
  "nombre": "Fútbol 5",
  "emoji": "⚽",
  "cat": "campo",
  "anio": 1952,
  "precio": "$450/mes",
  "sedes": "Palomar, Villa Luzuriaga",
  "horarios": "18:30 - 20:00",
  "hitos": [
   {
    "a": 1952,
    "t": "Nace como el primer deporte del club: seis amigos del barrio juegan en un baldío de Palomar con arcos de madera."
   },
   {
    "a": 1971,
    "t": "Se arma la primera liga interna con 8 equipos y árbitros del propio club."
   },
   {
    "a": 1998,
    "t": "La cancha de césped sintético reemplaza a la de tierra y el torneo de verano pasa a ser un clásico."
   }
  ],
  "titulos": [
   "Campeón Liga Zonal Oeste 1974",
   "Copa Amistad Aerus 1999"
  ]
 },
 {
  "slug": "futbol-7",
  "nombre": "Fútbol 7",
  "emoji": "⚽",
  "cat": "campo",
  "anio": 1964,
  "precio": "$550/mes",
  "sedes": "Palomar, Parque Patricio",
  "horarios": "19:00 - 20:30",
  "hitos": [
   {
    "a": 1964,
    "t": "Se crea para los pibes que ya no entraban en el 5 pero todavía no llegaban a la 11."
   },
   {
    "a": 1983,
    "t": "Primer título de campeón del interbarrial con una final jugada bajo la lluvia."
   },
   {
    "a": 2011,
    "t": "Se incorpora la categoría +35, que hoy llena los viernes de Parque Patricio."
   }
  ],
  "titulos": [
   "Campeón Interbarrial 1983",
   "Subcampeón Copa Provincia 2007"
  ]
 },
 {
  "slug": "futbol-11",
  "nombre": "Fútbol 11",
  "emoji": "⚽",
  "cat": "campo",
  "anio": 1952,
  "precio": "$650/mes",
  "sedes": "Villa Luzuriaga",
  "horarios": "20:00 - 21:30",
  "hitos": [
   {
    "a": 1952,
    "t": "Es el deporte fundacional: el primer equipo del club debuta el día de la inauguración."
   },
   {
    "a": 1968,
    "t": "Se gana el ascenso a la liga metropolitana con una racha de 14 partidos invictos."
   },
   {
    "a": 1987,
    "t": "El ‘equipo del 87’ conquista el campeonato y es recibido por todo el barrio en caravana."
   }
  ],
  "titulos": [
   "Campeón Liga Metropolitana 1987",
   "Ascenso a Primera 1968",
   "Copa de Oro Aerus 2004"
  ]
 },
 {
  "slug": "voley-femenino",
  "nombre": "Vóley Femenino",
  "emoji": "🏐",
  "cat": "indoor",
  "anio": 1969,
  "precio": "$400/mes",
  "sedes": "Palomar, Villa Luzuriaga, Parque Patricio",
  "horarios": "20:00 - 21:30",
  "hitos": [
   {
    "a": 1969,
    "t": "Un grupo de profesoras de educación física arma el primer equipo con una red prestada."
   },
   {
    "a": 1990,
    "t": "Primera gira nacional: el equipo viaja en micro a Mendoza y vuelve con la copa."
   },
   {
    "a": 2015,
    "t": "Se consagra bicampeón y la capitana es convocada a la selección bonaerense."
   }
  ],
  "titulos": [
   "Campeón Provincial 1990 y 2015",
   "Copa Ciudad de Mendoza 1990"
  ]
 },
 {
  "slug": "voley-masculino",
  "nombre": "Vóley Masculino",
  "emoji": "🏐",
  "cat": "indoor",
  "anio": 1973,
  "precio": "$400/mes",
  "sedes": "Palomar, Parque Patricio",
  "horarios": "21:00 - 22:30",
  "hitos": [
   {
    "a": 1973,
    "t": "Nace con apenas 7 jugadores y entrenaba en el patio techado de la sede."
   },
   {
    "a": 1995,
    "t": "Llega a la final del Torneo Metropolitano, perdiendo en el quinto set."
   },
   {
    "a": 2008,
    "t": "Se toma revancha y levanta la copa en el gimnasio repleto."
   }
  ],
  "titulos": [
   "Campeón Metropolitano 2008",
   "Subcampeón Metropolitano 1995"
  ]
 },
 {
  "slug": "voley-mixto",
  "nombre": "Vóley Mixto",
  "emoji": "🏐",
  "cat": "indoor",
  "anio": 1985,
  "precio": "$380/mes",
  "sedes": "Villa Luzuriaga, Parque Patricio",
  "horarios": "19:30 - 21:00",
  "hitos": [
   {
    "a": 1985,
    "t": "Idea de la comisión directiva para que familias y amigos jueguen juntos."
   },
   {
    "a": 2001,
    "t": "Se organiza el primer Mundialito Mixto con 24 equipos de todo el oeste."
   },
   {
    "a": 2019,
    "t": "El torneo ya reúne a más de 300 jugadores cada primavera."
   }
  ],
  "titulos": [
   "Campeón Mundialito Mixto 2001",
   "Premio Juego Limpio 2019"
  ]
 },
 {
  "slug": "hockey-femenino",
  "nombre": "Hockey Femenino",
  "emoji": "🏑",
  "cat": "campo",
  "anio": 1979,
  "precio": "$500/mes",
  "sedes": "Palomar, Villa Luzuriaga",
  "horarios": "18:00 - 19:30",
  "hitos": [
   {
    "a": 1979,
    "t": "Se funciona con palos importados de la India que trajo una socia fundadora."
   },
   {
    "a": 1996,
    "t": "El plantel asciende a la máxima división del hockey zonal."
   },
   {
    "a": 2012,
    "t": "Las ‘Leonas de Aerus’ ganan su primer campeonato invictas."
   }
  ],
  "titulos": [
   "Campeón Zonal 2012",
   "Ascenso Primera División 1996"
  ]
 },
 {
  "slug": "hockey-masculino",
  "nombre": "Hockey Masculino",
  "emoji": "🏑",
  "cat": "campo",
  "anio": 1988,
  "precio": "$500/mes",
  "sedes": "Palomar, Parque Patricio",
  "horarios": "22:00 - 23:30",
  "hitos": [
   {
    "a": 1988,
    "t": "Nace cuando un grupo de jugadores de fútbol se engancha con el hockey en un verano."
   },
   {
    "a": 2003,
    "t": "Primera final jugada ante 800 personas en el estadio de Palomar."
   },
   {
    "a": 2017,
    "t": "Se consagra campeón con un gol sobre la hora."
   }
  ],
  "titulos": [
   "Campeón Liga Metropolitana 2017",
   "Copa Verano 2003"
  ]
 },
 {
  "slug": "musculacion",
  "nombre": "Musculación",
  "emoji": "💪",
  "cat": "gym",
  "anio": 1976,
  "precio": "$350/mes",
  "sedes": "Palomar, Villa Luzuriaga, Parque Patricio",
  "horarios": "7:00 - 23:00",
  "hitos": [
   {
    "a": 1976,
    "t": "Abre la primera sala con pesas de hierro armadas por un herrero del barrio."
   },
   {
    "a": 1994,
    "t": "Se renuevan las máquinas y se suman entrenadores profesionales."
   },
   {
    "a": 2018,
    "t": "Se inaugura la sala de 600 m² en Villa Luzuriaga."
   }
  ],
  "titulos": [
   "Mejor Gimnasio del Oeste 2018",
   "Récord de socios activos 2022"
  ]
 },
 {
  "slug": "cardio",
  "nombre": "Cardio",
  "emoji": "🏃",
  "cat": "gym",
  "anio": 1989,
  "precio": "$300/mes",
  "sedes": "Palomar, Villa Luzuriaga, Parque Patricio",
  "horarios": "6:00 - 22:00",
  "hitos": [
   {
    "a": 1989,
    "t": "Llegan las primeras cintas de correr, una auténtica novedad para el barrio."
   },
   {
    "a": 2006,
    "t": "Se estrena la sala de cardio con vista a la cancha."
   },
   {
    "a": 2020,
    "t": "Durante la pandemia, las clases se dan por videollamada y suman 400 alumnos."
   }
  ],
  "titulos": [
   "Premio Innovación Deportiva 2020"
  ]
 },
 {
  "slug": "entrenamiento-funcional",
  "nombre": "Entrenamiento Funcional",
  "emoji": "⚡",
  "cat": "gym",
  "anio": 2009,
  "precio": "$400/mes",
  "sedes": "Palomar, Villa Luzuriaga",
  "horarios": "18:00 - 19:30",
  "hitos": [
   {
    "a": 2009,
    "t": "Arranca con un grupo de 10 personas al aire libre, con neumáticos y sogas."
   },
   {
    "a": 2014,
    "t": "Se arma la primera ‘Competencia Aerus Funcional’."
   },
   {
    "a": 2021,
    "t": "Se suma el box de entrenamiento con estructura propia."
   }
  ],
  "titulos": [
   "Campeón Open Funcional Zonal 2014",
   "Copa Resistencia 2021"
  ]
 },
 {
  "slug": "yoga",
  "nombre": "Yoga",
  "emoji": "🧘",
  "cat": "gym",
  "anio": 1997,
  "precio": "$320/mes",
  "sedes": "Villa Luzuriaga, Parque Patricio",
  "horarios": "10:00 - 11:30",
  "hitos": [
   {
    "a": 1997,
    "t": "Una profesora llegada de Mendoza dicta la primera clase en el SUM del club."
   },
   {
    "a": 2008,
    "t": "Se arma el primer retiro de fin de semana con 40 asistentes."
   },
   {
    "a": 2022,
    "t": "Las clases al atardecer en la terraza se vuelven ritual de los jueves."
   }
  ],
  "titulos": [
   "Reconocimiento Bienestar Comunitario 2008"
  ]
 },
 {
  "slug": "pilates",
  "nombre": "Pilates",
  "emoji": "🤸",
  "cat": "gym",
  "anio": 2003,
  "precio": "$380/mes",
  "sedes": "Palomar, Villa Luzuriaga",
  "horarios": "9:00 - 10:30",
  "hitos": [
   {
    "a": 2003,
    "t": "Se inaugura con 6 camillas compradas gracias a una rifa de socios."
   },
   {
    "a": 2012,
    "t": "Se incorporan las máquinas reformer."
   },
   {
    "a": 2020,
    "t": "Se suma el programa de rehabilitación junto a kinesiólogos."
   }
  ],
  "titulos": [
   "Mejor Estudio del Oeste 2012"
  ]
 },
 {
  "slug": "tenis",
  "nombre": "Tenis",
  "emoji": "🎾",
  "cat": "campo",
  "anio": 1957,
  "precio": "$470/mes",
  "sedes": "Palomar, Parque Patricio",
  "horarios": "8:00 - 19:00",
  "hitos": [
   {
    "a": 1957,
    "t": "Se estrenan dos canchas de polvo de ladrillo por la donación de una familia fundadora."
   },
   {
    "a": 1980,
    "t": "Primer torneo abierto, con inscriptos de toda la provincia."
   },
   {
    "a": 2005,
    "t": "Un joven del club gana el Abierto Juvenil de Buenos Aires."
   }
  ],
  "titulos": [
   "Abierto Aerus 1980",
   "Campeón Juvenil Buenos Aires 2005"
  ]
 },
 {
  "slug": "tenis-de-mesa",
  "nombre": "Tenis de Mesa",
  "emoji": "🏓",
  "cat": "indoor",
  "anio": 1966,
  "precio": "$280/mes",
  "sedes": "Villa Luzuriaga, Parque Patricio",
  "horarios": "18:00 - 22:00",
  "hitos": [
   {
    "a": 1966,
    "t": "Una mesa de ping-pong en el buffet termina convertida en sección oficial."
   },
   {
    "a": 1991,
    "t": "El equipo gana la liga metropolitana por segunda vez consecutiva."
   },
   {
    "a": 2014,
    "t": "Se consigue la sede de un torneo nacional."
   }
  ],
  "titulos": [
   "Bicampeón Metropolitano 1990-1991",
   "Sede Torneo Nacional 2014"
  ]
 },
 {
  "slug": "badminton",
  "nombre": "Badminton",
  "emoji": "🏸",
  "cat": "indoor",
  "anio": 2002,
  "precio": "$300/mes",
  "sedes": "Palomar, Villa Luzuriaga",
  "horarios": "19:00 - 20:30",
  "hitos": [
   {
    "a": 2002,
    "t": "Llega de la mano de un socio que lo conoció en un viaje a Dinamarca."
   },
   {
    "a": 2010,
    "t": "Se arma el primer interclub con 5 instituciones."
   },
   {
    "a": 2018,
    "t": "Dos jugadoras compiten en el Panamericano juvenil."
   }
  ],
  "titulos": [
   "Campeón Interclub 2010",
   "Participación Panamericano 2018"
  ]
 },
 {
  "slug": "karate",
  "nombre": "Karate",
  "emoji": "🥋",
  "cat": "ring",
  "anio": 1968,
  "precio": "$350/mes",
  "sedes": "Palomar, Villa Luzuriaga, Parque Patricio",
  "horarios": "17:00 - 20:30",
  "hitos": [
   {
    "a": 1968,
    "t": "Un sensei llegado de Japón funda la escuela en el sótano de la sede."
   },
   {
    "a": 1986,
    "t": "El primer cinturón negro del club se recibe ante 300 familiares."
   },
   {
    "a": 2009,
    "t": "Se gana el Campeonato Argentino por equipos."
   }
  ],
  "titulos": [
   "Campeón Argentino por Equipos 2009",
   "Primer Dan Aerus 1986"
  ]
 },
 {
  "slug": "taekwondo",
  "nombre": "Taekwondo",
  "emoji": "🥋",
  "cat": "ring",
  "anio": 1981,
  "precio": "$380/mes",
  "sedes": "Palomar, Parque Patricio",
  "horarios": "18:00 - 19:30",
  "hitos": [
   {
    "a": 1981,
    "t": "Se abre la sección con tres alumnos y un maestro coreano."
   },
   {
    "a": 1999,
    "t": "Se conquistan cinco medallas en el campeonato provincial."
   },
   {
    "a": 2016,
    "t": "Un alumno del club integra la selección juvenil."
   }
  ],
  "titulos": [
   "5 medallas Provincial 1999",
   "Selección Juvenil 2016"
  ]
 },
 {
  "slug": "boxeo",
  "nombre": "Boxeo",
  "emoji": "🥊",
  "cat": "ring",
  "anio": 1955,
  "precio": "$420/mes",
  "sedes": "Palomar, Villa Luzuriaga",
  "horarios": "18:00 - 20:00",
  "hitos": [
   {
    "a": 1955,
    "t": "El club monta un ring de madera en el galpón de Palomar."
   },
   {
    "a": 1972,
    "t": "Noche mítica de guantes: velada con 1.200 espectadores."
   },
   {
    "a": 1993,
    "t": "Se corona el primer campeón argentino amateur del club."
   }
  ],
  "titulos": [
   "Campeón Argentino Amateur 1993",
   "Guantes de Oro Zonal 1972"
  ]
 },
 {
  "slug": "natacion-adultos",
  "nombre": "Natación Adultos",
  "emoji": "🏊",
  "cat": "agua",
  "anio": 1974,
  "precio": "$390/mes",
  "sedes": "Palomar, Villa Luzuriaga",
  "horarios": "18:00 - 19:30",
  "hitos": [
   {
    "a": 1974,
    "t": "Se estrena la pileta de 25 metros, la primera del barrio."
   },
   {
    "a": 1992,
    "t": "El equipo de posta gana el Torneo Metropolitano de Masters."
   },
   {
    "a": 2013,
    "t": "Se cubre la pileta y el club nada todo el año."
   }
  ],
  "titulos": [
   "Campeón Masters Metropolitano 1992",
   "Récord Posta 4x50 2013"
  ]
 },
 {
  "slug": "natacion-infantil",
  "nombre": "Natación Infantil",
  "emoji": "🏊",
  "cat": "agua",
  "anio": 1976,
  "precio": "$330/mes",
  "sedes": "Palomar, Villa Luzuriaga",
  "horarios": "16:00 - 17:00",
  "hitos": [
   {
    "a": 1976,
    "t": "Nacen los primeros cursos para chicos de 4 a 10 años."
   },
   {
    "a": 1998,
    "t": "Se hace la primera gran fiesta de fin de año en el agua."
   },
   {
    "a": 2015,
    "t": "Se forma el equipo competitivo infantil."
   }
  ],
  "titulos": [
   "Campeón Copa Pelusa 1998",
   "Mejor Escuela Infantil 2015"
  ]
 },
 {
  "slug": "zumba",
  "nombre": "Zumba",
  "emoji": "💃",
  "cat": "gym",
  "anio": 2008,
  "precio": "$280/mes",
  "sedes": "Villa Luzuriaga, Parque Patricio",
  "horarios": "19:00 - 20:00",
  "hitos": [
   {
    "a": 2008,
    "t": "La profe más querida del club trae la zumba desde Colombia."
   },
   {
    "a": 2013,
    "t": "Se hace el primer ‘Zumba Maratón’ con 200 asistentes."
   },
   {
    "a": 2023,
    "t": "El evento anual ya lleva 15 horas continuas de baile."
   }
  ],
  "titulos": [
   "Récord Zumba Maratón 2023"
  ]
 },
 {
  "slug": "aerobica",
  "nombre": "Aeróbica",
  "emoji": "🎵",
  "cat": "gym",
  "anio": 1983,
  "precio": "$300/mes",
  "sedes": "Palomar, Villa Luzuriaga, Parque Patricio",
  "horarios": "18:00 - 19:00",
  "hitos": [
   {
    "a": 1983,
    "t": "Explota la fiebre de la aeróbica y el SUM se llena de calzas de colores."
   },
   {
    "a": 1990,
    "t": "El grupo participa en el festival provincial de gimnasia."
   },
   {
    "a": 2010,
    "t": "Se renueva la sala con espejos y sistema de sonido."
   }
  ],
  "titulos": [
   "Primer Puesto Festival Provincial 1990"
  ]
 },
 {
  "slug": "spinning",
  "nombre": "Spinning",
  "emoji": "🚴",
  "cat": "gym",
  "anio": 2000,
  "precio": "$360/mes",
  "sedes": "Palomar, Villa Luzuriaga",
  "horarios": "18:30 - 19:30",
  "hitos": [
   {
    "a": 2000,
    "t": "Se compran 8 bicicletas fijas y la sala se llena a la semana."
   },
   {
    "a": 2011,
    "t": "Se arma el primer desafío ‘Cien kilómetros por una causa’."
   },
   {
    "a": 2019,
    "t": "Se incorporan bicicletas inteligentes con medición de potencia."
   }
  ],
  "titulos": [
   "Desafío 100 km 2011"
  ]
 },
 {
  "slug": "basquetbol",
  "nombre": "Básquetbol",
  "emoji": "🏀",
  "cat": "indoor",
  "anio": 1960,
  "precio": "$430/mes",
  "sedes": "Palomar, Parque Patricio",
  "horarios": "20:00 - 21:30",
  "hitos": [
   {
    "a": 1960,
    "t": "El primer aro se cuelga en el patio con una red de pescador."
   },
   {
    "a": 1978,
    "t": "El equipo mayor logra el ascenso a la liga de la provincia."
   },
   {
    "a": 2002,
    "t": "Se levanta la copa en el Estadio Cubierto, con triple sobre la chicharra."
   }
  ],
  "titulos": [
   "Campeón Provincial 2002",
   "Ascenso Liga Provincial 1978"
  ]
 },
 {
  "slug": "handball",
  "nombre": "Handball",
  "emoji": "🏐",
  "cat": "indoor",
  "anio": 1989,
  "precio": "$420/mes",
  "sedes": "Villa Luzuriaga, Parque Patricio",
  "horarios": "19:30 - 21:00",
  "hitos": [
   {
    "a": 1989,
    "t": "Un profesor de educación física lo introduce con una pelota de goma."
   },
   {
    "a": 2005,
    "t": "El equipo gana el torneo de handball amateur."
   },
   {
    "a": 2020,
    "t": "Se arma el equipo juvenil con 40 jugadores."
   }
  ],
  "titulos": [
   "Campeón Amateur 2005"
  ]
 },
 {
  "slug": "futsal",
  "nombre": "Futsal",
  "emoji": "🥅",
  "cat": "indoor",
  "anio": 1977,
  "precio": "$480/mes",
  "sedes": "Palomar, Villa Luzuriaga, Parque Patricio",
  "horarios": "20:30 - 22:00",
  "hitos": [
   {
    "a": 1977,
    "t": "Aprovechando el salón techado, nace el futsal del club."
   },
   {
    "a": 1996,
    "t": "El equipo gana el Torneo Relámpago del oeste."
   },
   {
    "a": 2014,
    "t": "Se consagra campeón metropolitano ante su gente."
   }
  ],
  "titulos": [
   "Campeón Metropolitano 2014",
   "Torneo Relámpago 1996"
  ]
 },
 {
  "slug": "basquetbol-3x3",
  "nombre": "Basquetbol 3x3",
  "emoji": "⛹️",
  "cat": "indoor",
  "anio": 2019,
  "precio": "$350/mes",
  "sedes": "Parque Patricio",
  "horarios": "18:00 - 20:00",
  "hitos": [
   {
    "a": 2019,
    "t": "Se pinta una cancha en Parque Patricio y empiezan los picados."
   },
   {
    "a": 2021,
    "t": "Primer torneo callejero, con 32 parejas."
   },
   {
    "a": 2024,
    "t": "Un jugador del club clasifica al Nacional."
   }
  ],
  "titulos": [
   "Clasificado al Nacional 2024"
  ]
 },
 {
  "slug": "esgrima",
  "nombre": "Esgrima",
  "emoji": "🤺",
  "cat": "ring",
  "anio": 1962,
  "precio": "$400/mes",
  "sedes": "Villa Luzuriaga",
  "horarios": "19:00 - 20:30",
  "hitos": [
   {
    "a": 1962,
    "t": "Un maestro italiano trae sus sables y funda la sala de armas."
   },
   {
    "a": 1985,
    "t": "Primer torneo interclubes de la historia del club."
   },
   {
    "a": 2007,
    "t": "Se consigue una medalla en el Campeonato Argentino."
   }
  ],
  "titulos": [
   "Medalla Campeonato Argentino 2007",
   "Torneo Interclubes 1985"
  ]
 },
 {
  "slug": "voleibol-de-playa",
  "nombre": "Voleibol de Playa",
  "emoji": "🏐",
  "cat": "campo",
  "anio": 1994,
  "precio": "$360/mes",
  "sedes": "Palomar, Parque Patricio",
  "horarios": "17:00 - 19:00",
  "hitos": [
   {
    "a": 1994,
    "t": "Se llena un sector del club con arena traída en camiones."
   },
   {
    "a": 2006,
    "t": "Primer torneo de verano con parejas de 3 provincias."
   },
   {
    "a": 2017,
    "t": "Se inauguran las dos canchas oficiales."
   }
  ],
  "titulos": [
   "Campeón Torneo de Verano 2006"
  ]
 }
];
