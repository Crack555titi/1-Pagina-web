/* Socios: planes, tabla comparativa, beneficios, preguntas frecuentes y panel de socio.
   Precios, descuentos y textos son de ejemplo: editá libremente.
   Las elecciones del socio (plan y deportes) se guardan en este navegador (localStorage). */
(function () {
    const PLANES = [
        { id: 'individual', nombre: 'Individual', desc: 'Para vos, con acceso a las actividades de tu sede.', una: 900, todas: 1300, descuento: 0, personas: 'Solo vos', invitados: '1', prioridad: false, req: 'DNI' },
        { id: 'familiar', nombre: 'Familiar', destacado: true, desc: 'Hasta 4 integrantes del mismo domicilio, con descuento en cada deporte.', una: 2200, todas: 3200, descuento: 10, personas: 'Hasta 4', invitados: '3', prioridad: true, req: 'Mismo domicilio' },
        { id: 'estudiante', nombre: 'Estudiante', desc: 'Una cuota más baja para quienes estudian.', una: 650, todas: 950, descuento: 15, personas: 'Solo vos', invitados: '1', prioridad: false, req: 'Certificado de alumno regular' },
        { id: 'jubilado', nombre: 'Jubilado', desc: 'Pensado para mayores de 60 años, con los mayores descuentos.', una: 550, todas: 800, descuento: 20, personas: 'Solo vos', invitados: '2', prioridad: true, req: 'Mayor de 60 años' }
    ];
    const BENEFICIOS = [
        ['🪪', 'Carnet digital con QR', 'Entrá a cualquier sede con tu celular, sin plástico ni papeles.'],
        ['🏪', 'Descuentos en comercios', 'Ahorros en comercios del barrio que apoyan al club.'],
        ['🎟️', 'Entradas a eventos', 'Torneos, fiestas y jornadas del club con entrada preferencial.'],
        ['⚡', 'Prioridad en inscripciones', 'Reservá lugar primero en los cupos de cada temporada.'],
        ['🤝', 'Invitados', 'Traé amigos o familia a entrenar con vos cada mes.'],
        ['🎁', 'Primera clase gratis', 'Probá cualquier deporte antes de decidirte.']
    ];
    const FAQ = [
        ['¿Cómo me hago socio?', 'Iniciá sesión (o registrate), elegí tu plan en esta página y sumá los deportes que quieras. Tu carnet digital queda disponible en tu panel de socio.'],
        ['¿La cuota social incluye los deportes?', 'La cuota social te da acceso al club y a todos sus beneficios. Cada deporte se abona aparte con su cuota mensual, y tu plan te suma un descuento sobre ellas.'],
        ['¿Qué diferencia hay entre "Una sede" y "Todas las sedes"?', 'Con "Una sede" entrenás en la sede que elijas. Con "Todas las sedes" podés usar Palomar, Villa Luzuriaga y Parque Patricio cuando quieras.'],
        ['¿Puedo cambiar de plan?', 'Sí, podés cambiar de plan o de alcance cuando quieras desde esta misma página; la nueva cuota rige desde el mes siguiente.'],
        ['¿Cómo funciona el plan familiar?', 'Incluye hasta 4 integrantes que vivan en el mismo domicilio. Todos comparten la cuota social y el descuento en deportes.'],
        ['¿Cómo me doy de baja?', 'Escribinos desde la página de contacto o acercate a cualquiera de nuestras sedes y lo gestionamos sin cargo.']
    ];
    const CATS = { campo: 'Campo y aire libre', indoor: 'Cancha cubierta', gym: 'Gimnasio y clases', ring: 'Artes marciales y combate', agua: 'Natación' };

    const $ = id => document.getElementById(id);
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const money = n => '$' + Math.round(n).toLocaleString('es-AR');
    const precioDep = d => parseInt(String(d.precio).replace(/\D/g, ''), 10) || 0;
    const plan = id => PLANES.find(p => p.id === id);
    const leer = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
    const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };

    let user = null, alcance = 'una', pickAbierto = false;
    const keySocio = () => 'aerus_socio_' + user.id;
    const socio = () => user ? leer(keySocio()) : null;

    // ---------- Planes
    function renderPlanes() {
        const s = socio();
        $('planes').innerHTML = PLANES.map(p => {
            const actual = s && s.plan === p.id && s.alcance === alcance;
            return `<article class="plan${p.destacado ? ' destacado' : ''}${actual ? ' actual' : ''}">
                ${p.destacado ? '<span class="badge">Más elegido</span>' : ''}
                <h3>${p.nombre}</h3>
                <div class="precio-plan">${money(p[alcance])}<small> /mes</small></div>
                <p>${p.desc}</p>
                <button class="hero-btn ${actual ? 'secondary' : 'primary'}" data-plan="${p.id}" ${actual ? 'disabled' : ''}>${actual ? 'Tu plan actual' : 'Elegir plan'}</button>
            </article>`;
        }).join('');
    }
    function renderTabla() {
        const si = '<span class="si">✓</span>', no = '<span class="no">—</span>';
        const fila = (t, f) => `<tr><td>${t}</td>${PLANES.map(p => `<td>${f(p)}</td>`).join('')}</tr>`;
        $('tabla').innerHTML = `<thead><tr><th>¿Qué incluye?</th>${PLANES.map(p => `<th>${p.nombre}</th>`).join('')}</tr></thead><tbody>
            ${fila('Cuota social (una sede)', p => money(p.una))}
            ${fila('Cuota social (todas las sedes)', p => money(p.todas))}
            ${fila('Personas incluidas', p => p.personas)}
            ${fila('Descuento en cuotas de deportes', p => p.descuento ? p.descuento + '%' : no)}
            ${fila('Invitados por mes', p => p.invitados)}
            ${fila('Prioridad en inscripciones', p => p.prioridad ? si : no)}
            ${fila('Descuentos en comercios', () => si)}
            ${fila('Carnet digital con QR', () => si)}
            ${fila('Requisito', p => p.req)}</tbody>`;
    }
    function renderEstaticos() {
        $('beneficios').innerHTML = BENEFICIOS.map(b => `<div class="benef"><span class="ic">${b[0]}</span><h3>${b[1]}</h3><p>${b[2]}</p></div>`).join('');
        $('faq').innerHTML = FAQ.map(f => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');
    }

    // ---------- Panel de socio
    function pintarQR(el, texto) {
        const fallback = () => { el.innerHTML = `<div class="qr-txt">${esc(texto)}</div>`; };
        const crear = () => { try { el.innerHTML = ''; new QRCode(el, { text: texto, width: 120, height: 120 }); } catch (e) { fallback(); } };
        if (window.QRCode) return crear();
        const sc = document.createElement('script');
        sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
        sc.onload = crear; sc.onerror = fallback;
        document.head.appendChild(sc);
    }

    function renderPanel() {
        const cont = $('panelSocio'), inv = $('invita');
        if (!user) {
            cont.hidden = true;
            inv.innerHTML = `<div class="invita"><p>Iniciá sesión para elegir tu plan y acceder a tu panel de socio con tu carnet digital.</p><a class="hero-btn primary" href="LogIn.html">Iniciar sesión</a></div>`;
            return;
        }
        inv.innerHTML = '';
        const s = socio();
        if (!s) { cont.hidden = true; return; }
        const p = plan(s.plan), seleccion = DEPORTES.filter(d => s.deportes.includes(d.slug));
        const cuotaDep = seleccion.reduce((t, d) => t + precioDep(d), 0) * (1 - p.descuento / 100);
        const total = p[s.alcance] + cuotaDep;
        const numero = 'AER-' + String(user.id).padStart(5, '0');
        const nombre = [user.nombre, user.apellido].filter(Boolean).join(' ') || 'Socio';
        const ordenados = [...seleccion].sort((a, b) => parseFloat(a.horarios) - parseFloat(b.horarios));
        const grupos = Object.entries(CATS).map(([k, label]) => `<div><b style="color:var(--gold);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase">${label}</b>${
            DEPORTES.filter(d => d.cat === k).map(d => `<label><input type="checkbox" data-dep="${d.slug}" ${s.deportes.includes(d.slug) ? 'checked' : ''}> ${esc(d.nombre)} · ${esc(d.precio)}</label>`).join('')}</div>`).join('');

        cont.hidden = false;
        cont.innerHTML = `
        <div class="sec-head"><small>Hola, ${esc(user.nombre || 'socio')}</small><h2>Tu panel de socio</h2></div>
        <div class="panel-grid">
            <div>
                <div class="caja">
                    <div class="resumen">
                        <div><b>${p.nombre}</b><span>Plan · ${s.alcance === 'una' ? 'Una sede' : 'Todas las sedes'}</span></div>
                        <div><b>${money(total)}</b><span>Cuota mensual total</span></div>
                        <div><b>${seleccion.length}</b><span>Deportes</span></div>
                    </div>
                    <p class="aviso-local">Cuota social ${money(p[s.alcance])}${p.descuento ? ` + deportes con ${p.descuento}% de descuento (${money(cuotaDep)})` : ` + deportes (${money(cuotaDep)})`}. <a href="#planesSec" style="color:var(--gold-light)">Cambiar de plan</a></p>
                </div>
                <div class="caja">
                    <h3>Mis deportes</h3>
                    ${seleccion.length ? `<ul class="lista-dep">${seleccion.map(d => `<li><a href="deporte.html?d=${d.slug}">${d.emoji} ${esc(d.nombre)}<small>${esc(d.sedes)}</small></a><b>${money(precioDep(d) * (1 - p.descuento / 100))}</b></li>`).join('')}</ul>` : '<p>Todavía no sumaste deportes. Elegí los que quieras acá abajo.</p>'}
                    <details class="agregar" ${pickAbierto ? 'open' : ''}><summary>Agregar o quitar deportes</summary><div class="pick">${grupos}</div></details>
                </div>
                <div class="caja">
                    <h3>Mis horarios</h3>
                    ${ordenados.length ? `<ul class="lista-dep">${ordenados.map(d => `<li><span>${d.emoji} ${esc(d.nombre)}<small>${esc(d.sedes)}</small></span><b>${esc(d.horarios)}</b></li>`).join('')}</ul>` : '<p>Cuando sumes deportes, vas a ver tus horarios acá.</p>'}
                </div>
            </div>
            <div class="carnet">
                <div class="marca">AERUS CLUB</div>
                <div class="nombre">${esc(nombre)}</div>
                <div class="meta">Socio N° <b>${numero}</b><br>Plan <b>${p.nombre}</b> · ${s.alcance === 'una' ? 'Una sede' : 'Todas las sedes'}<br>${esc(user.email || '')}</div>
                <div class="qr" id="qrBox"></div>
                <p class="aviso-local">Presentá este código al ingresar a la sede.</p>
            </div>
        </div>
        <p class="aviso-local" style="text-align:center;margin-top:18px">Tus elecciones se guardan en este navegador.</p>`;
        pintarQR($('qrBox'), `AERUS|${numero}|${p.id}|${s.alcance}`);
    }

    // ---------- Eventos
    function elegirPlan(id) {
        if (!user) { guardar('aerus_plan_pendiente', { plan: id, alcance }); location.href = 'LogIn.html'; return; }
        const s = socio() || { deportes: [] };
        guardar(keySocio(), { plan: id, alcance, deportes: s.deportes });
        renderPlanes(); renderPanel();
        $('panelSocio').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    $('planes').addEventListener('click', e => { const b = e.target.closest('[data-plan]'); if (b) elegirPlan(b.dataset.plan); });
    document.querySelectorAll('.toggle button').forEach(b => b.addEventListener('click', () => {
        alcance = b.dataset.alcance;
        document.querySelectorAll('.toggle button').forEach(x => x.classList.toggle('on', x === b));
        renderPlanes();
    }));
    $('panelSocio').addEventListener('change', e => {
        const c = e.target.closest('[data-dep]'); if (!c || !user) return;
        const s = socio(); if (!s) return;
        s.deportes = c.checked ? [...new Set([...s.deportes, c.dataset.dep])] : s.deportes.filter(x => x !== c.dataset.dep);
        guardar(keySocio(), s); pickAbierto = true; renderPanel();
    });

    renderEstaticos(); renderTabla(); renderPlanes();

    fetch('../PHP/comproba_session.php', { credentials: 'same-origin' })
        .then(r => r.json())
        .then(data => {
            user = data.logueado ? data.usuario : null;
            const pend = user && leer('aerus_plan_pendiente');
            if (pend && plan(pend.plan)) {
                alcance = pend.alcance === 'todas' ? 'todas' : 'una';
                const s = socio() || { deportes: [] };
                guardar(keySocio(), { plan: pend.plan, alcance, deportes: s.deportes });
            }
            try { localStorage.removeItem('aerus_plan_pendiente'); } catch (e) { /* nada */ }
            const s = socio();
            if (s) alcance = s.alcance;
            document.querySelectorAll('.toggle button').forEach(x => x.classList.toggle('on', x.dataset.alcance === alcance));
            renderPlanes(); renderPanel();
        })
        .catch(() => { renderPanel(); /* sin servidor PHP: versión para visitantes */ });
})();
