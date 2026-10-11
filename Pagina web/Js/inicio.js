/* Inicio: novedades, próximos eventos y testimonios.
   Los datos son de ejemplo: editá libremente estos arreglos. */
(function () {
    const NOVEDADES = [
        '📢 Abiertas las inscripciones para la temporada 2027',
        '🎉 Primera clase gratis en cualquier deporte',
        '🏆 Hockey Femenino se consagró campeón zonal',
        '🆕 Musculación en Parque Patricio desde las 5hs',
        '🛠️ Vestuarios renovados en Villa Luzuriaga'
    ];

    // fecha en formato AAAA-MM-DD (los eventos pasados se ocultan solos)
    const EVENTOS = [
        { fecha: '2026-10-17', hora: '15:00', titulo: 'Torneo interbarrial de Fútbol 7', sede: 'Palomar', tag: 'Torneo' },
        { fecha: '2026-10-24', hora: '10:00', titulo: 'Clase abierta de Yoga y Pilates', sede: 'Villa Luzuriaga', tag: 'Clase abierta' },
        { fecha: '2026-11-07', hora: '16:00', titulo: 'Copa de Vóley Mixto', sede: 'Parque Patricio', tag: 'Torneo' },
        { fecha: '2026-11-21', hora: '11:00', titulo: 'Jornada de Natación Infantil', sede: 'Palomar', tag: 'Familia' },
        { fecha: '2026-12-12', hora: '20:00', titulo: 'Gran cena de fin de año del club', sede: 'Palomar', tag: 'Fiesta' }
    ];

    const TESTIMONIOS = [
        { nombre: 'Marcela R.', detalle: 'Socia desde 2016 · Vóley', estrellas: 5, texto: 'Llegué por mi hija y terminé jugando yo también. Acá te sentís en casa desde el primer día.' },
        { nombre: 'Diego F.', detalle: 'Socio desde 2009 · Fútbol 7', estrellas: 5, texto: 'Los viernes de fútbol con los muchachos son sagrados. Un club de barrio de verdad.' },
        { nombre: 'Lucía P.', detalle: 'Socia desde 2021 · Pilates', estrellas: 4, texto: 'Excelentes profes y horarios cómodos. Lo que más me gusta es el ambiente tranquilo.' }
    ];

    const KEY = 'aerus_testimonios';
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const $ = id => document.getElementById(id);
    const leer = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };

    // --- Novedades (la lista se duplica para que el scroll sea continuo)
    const nov = $('novList');
    if (nov) {
        const items = NOVEDADES.map(t => `<span class="nov-item">${esc(t)}</span>`).join('');
        nov.innerHTML = items + items;
    }

    // --- Eventos
    const ev = $('eventosList');
    if (ev) {
        const hoy = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' }).format(new Date());
        const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
        const prox = EVENTOS.filter(e => e.fecha >= hoy).sort((a, b) => a.fecha.localeCompare(b.fecha)).slice(0, 5);
        ev.innerHTML = prox.length ? prox.map(e => {
            const [, m, d] = e.fecha.split('-');
            return `<article class="evento reveal">
                <div class="ev-fecha"><b>${+d}</b><span>${meses[+m - 1]}</span></div>
                <div class="ev-info"><h3>${esc(e.titulo)}</h3><p>📍 Sede ${esc(e.sede)} · 🕒 ${esc(e.hora)} hs</p></div>
                <span class="ev-tag">${esc(e.tag)}</span></article>`;
        }).join('') : '<p class="ev-vacio">Pronto vamos a anunciar nuevos eventos. ¡Seguinos en Instagram!</p>';
        ev.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    }

    // --- Testimonios
    const grid = $('testiGrid');
    function pintar() {
        if (!grid) return;
        const propios = leer().map(t => ({ ...t, detalle: 'Comentario reciente' }));
        grid.innerHTML = [...propios, ...TESTIMONIOS].slice(0, 6).map(t => `
            <article class="testi reveal">
                <div class="estrellas" aria-label="${t.estrellas} de 5">${'★'.repeat(t.estrellas)}${'☆'.repeat(5 - t.estrellas)}</div>
                <p>${esc(t.texto)}</p>
                <div class="quien">${esc(t.nombre)}<small>${esc(t.detalle)}</small></div>
            </article>`).join('');
        grid.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    }
    pintar();

    const form = $('testiForm');
    if (form) form.addEventListener('submit', e => {
        e.preventDefault();
        const nombre = form.nombre.value.trim().slice(0, 40);
        const texto = form.texto.value.trim().slice(0, 240);
        const msg = $('testiMsg');
        if (nombre.length < 2 || texto.length < 10) { msg.textContent = 'Completá tu nombre y un comentario de al menos 10 caracteres.'; return; }
        const lista = leer();
        lista.unshift({ nombre, texto, estrellas: +form.estrellas.value });
        try { localStorage.setItem(KEY, JSON.stringify(lista.slice(0, 20))); } catch (err) { /* sin almacenamiento */ }
        form.reset();
        msg.textContent = '¡Gracias por tu comentario!';
        pintar();
    });
})();
