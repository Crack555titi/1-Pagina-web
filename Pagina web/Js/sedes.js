/* Estado abierto/cerrado + "Cómo llegar" + página de cada sede. Requiere sedes-data.js */
(function () {
    const TZ = 'America/Argentina/Buenos_Aires';
    const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const hh = n => String(n).padStart(2, '0') + ':00';
    const horasDe = (sede, dia) => dia === 0 ? sede.horarios.dom : sede.horarios.lun_sab;

    function ahora() {
        const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
            .formatToParts(new Date()).map(x => [x.type, x.value]));
        return { dia: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), hora: +p.hour + (+p.minute) / 60 };
    }

    function estado(sede) {
        const { dia, hora } = ahora();
        const [a, c] = horasDe(sede, dia);
        if (hora >= a && hora < c) return { abierto: true, texto: `Abierto ahora · cierra a las ${hh(c)}` };
        if (hora < a) return { abierto: false, texto: `Cerrado · abre hoy a las ${hh(a)}` };
        const mañana = (dia + 1) % 7;
        return { abierto: false, texto: `Cerrado · abre ${mañana === 0 ? 'el domingo' : 'mañana'} a las ${hh(horasDe(sede, mañana)[0])}` };
    }

    const badge = sede => { const e = estado(sede); return `<span class="estado ${e.abierto ? 'abierto' : 'cerrado'}" data-estado="${sede.slug}"><i></i>${e.texto}</span>`; };
    const comoLlegar = sede => `https://www.google.com/maps/dir/?api=1&destination=${sede.lat},${sede.lng}`;

    function refrescar() {
        document.querySelectorAll('[data-estado]').forEach(el => {
            const sede = SEDES.find(s => s.slug === el.dataset.estado); if (!sede) return;
            const e = estado(sede);
            el.className = 'estado ' + (e.abierto ? 'abierto' : 'cerrado');
            el.innerHTML = '<i></i>' + e.texto;
        });
    }
    setInterval(refrescar, 60000);

    // ---- Listado (sedes.html): agrega estado y botones a cada tarjeta
    document.querySelectorAll('.sede[data-sede]').forEach(card => {
        const sede = SEDES.find(s => s.slug === card.dataset.sede); if (!sede) return;
        card.querySelector('h2').insertAdjacentHTML('afterend', badge(sede));
        card.insertAdjacentHTML('beforeend', `<div class="sede-acciones">
            <a class="hero-btn primary" href="sede.html?s=${sede.slug}">Ver sede</a>
            <a class="hero-btn secondary" href="${comoLlegar(sede)}" target="_blank" rel="noopener">Cómo llegar</a></div>`);
    });

    // ---- Página de una sede (sede.html)
    const main = document.getElementById('contenido');
    if (!main || typeof DEPORTES === 'undefined') return;
    const i = SEDES.findIndex(s => s.slug === new URLSearchParams(location.search).get('s'));
    if (i < 0) {
        main.innerHTML = '<div class="vacio"><h2>No encontramos esa sede</h2><div class="hero-actions"><a class="hero-btn primary" href="sedes.html">Ver sedes</a></div></div>';
        return;
    }
    const s = SEDES[i], prev = SEDES[(i + SEDES.length - 1) % SEDES.length], next = SEDES[(i + 1) % SEDES.length];
    document.title = `Sede ${s.nombre} | Aerus Club`;
    document.getElementById('tituloH1').textContent = `Sede ${s.nombre}`;
    const iconos = { Estacionamiento: '🅿️', Vestuarios: '🚿', Buffet: '🍽️', Accesibilidad: '♿' };
    const deportes = DEPORTES.filter(d => d.sedes.includes(s.nombre));

    main.innerHTML = `
    <div class="dep-hero">
        <img src="../imagenes/${esc(s.foto)}" alt="Sede ${esc(s.nombre)}">
        <div class="dep-hero-txt"><span class="desde">Abierta desde ${s.desde}</span><h2>${esc(s.nombre)}</h2></div>
    </div>
    <div class="dep-wrap sede-wrap">
        <div class="sede-barra">${badge(s)}
            <a class="hero-btn primary" href="${comoLlegar(s)}" target="_blank" rel="noopener">Cómo llegar</a>
            <a class="hero-btn secondary" href="deportes.html?sede=${s.slug}">Ver sus deportes</a></div>
        <div class="sec-head"><small>${esc(s.lema)}</small><h2>Datos de la sede</h2></div>
        <div class="datos-grid">
            ${Object.entries(s.datos).map(([k, v]) => `<div class="dato"><span class="ic">${iconos[k] || 'ℹ️'}</span><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}
            <div class="dato"><span class="ic">🕒</span><b>Horarios</b>
                <table class="horarios-tabla"><tr><td>Lunes a sábado</td><td>${hh(s.horarios.lun_sab[0])} a ${hh(s.horarios.lun_sab[1])}</td></tr>
                <tr><td>Domingo</td><td>${hh(s.horarios.dom[0])} a ${hh(s.horarios.dom[1])}</td></tr></table></div>
        </div>
        <div class="sec-head"><small>Nuestra historia</small><h2>${esc(s.nombre)} en Aerus</h2></div>
        <div class="linea" style="--x:0">${s.hitos.map(h => `<article class="hito"><div class="texto"><span class="anio">${h[0]}</span><p>${esc(h[1])}</p></div><div></div></article>`).join('')}</div>
        <div class="sec-head"><small>Ubicación</small><h2>Dónde estamos</h2></div>
        <div class="mapa-sede"><iframe src="${esc(s.mapa)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen title="Mapa de la sede ${esc(s.nombre)}"></iframe></div>
        <div class="sec-head"><small>Actividades</small><h2>Deportes en esta sede</h2></div>
        <div class="dep-mini">${deportes.map(d => `<a href="deporte.html?d=${d.slug}">${d.emoji} ${esc(d.nombre)}</a>`).join('')}</div>
        <div class="dep-nav">
            <a class="hero-btn secondary" href="sede.html?s=${prev.slug}">← ${esc(prev.nombre)}</a>
            <a class="hero-btn secondary" href="sede.html?s=${next.slug}">${esc(next.nombre)} →</a>
        </div>
    </div>`;
})();
