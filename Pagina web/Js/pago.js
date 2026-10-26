/* Socios: planes, tabla comparativa, beneficios, preguntas frecuentes y panel de socio.
   Precios, descuentos y textos son de ejemplo: editá libremente.
   Las elecciones del socio (plan y deportes) se guardan en este navegador (localStorage).
   El estado de los pagos y el código del QR de la credencial vienen del servidor (PHP/pagos.php). */
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
        ['¿Cómo me hago socio?', 'Iniciá sesión (o registrate), elegí tu plan, pagá con Mercado Pago e ingresá el número de operación. Un encargado del club verifica tu pago personalmente y, una vez aprobado, se habilita tu credencial con QR.'],
        ['¿La cuota social incluye los deportes?', 'La cuota social te da acceso al club y a todos sus beneficios. Cada deporte se abona aparte con su cuota mensual, y tu plan te suma un descuento sobre ellas.'],
        ['¿Qué diferencia hay entre "Una sede" y "Todas las sedes"?', 'Con "Una sede" entrenás en la sede que elijas. Con "Todas las sedes" podés usar Palomar, Villa Luzuriaga y Parque Patricio cuando quieras.'],
        ['¿Puedo cambiar de plan?', 'Sí, podés cambiar de plan o de alcance cuando quieras desde esta misma página; la nueva cuota rige desde el mes siguiente.'],
        ['¿Cómo funciona el plan familiar?', 'Incluye hasta 4 integrantes que vivan en el mismo domicilio. Todos comparten la cuota social y el descuento en deportes.'],
        ['¿Por qué no veo mi credencial?', 'La credencial se habilita recién cuando tu pago figura como aprobado. Mientras diga "En revisión" todavía no se muestra el QR.'],
        ['¿Cómo me doy de baja?', 'Escribinos desde la página de contacto o acercate a cualquiera de nuestras sedes y lo gestionamos sin cargo.']
    ];
    // Aspecto de la credencial según el plan (acc: color de acento, qr: color oscuro del QR, que debe seguir contrastando con el blanco)
    const TEMAS = {
        individual: { acc: '#d4af37', qr: '#1a1405', lema: 'Socio individual' },
        familiar:   { acc: '#5aa9e6', qr: '#07263d', lema: 'Grupo familiar · hasta 4 integrantes' },
        estudiante: { acc: '#a58be0', qr: '#2a1650', lema: 'Socio estudiante' },
        jubilado:   { acc: '#cfd3da', qr: '#1c1f26', lema: 'Socio jubilado' }
    };
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
    const socio = () => user ? (leer(keySocio()) || desdePagos()) : null;
    // Plan y deportes tal como figuran en la base de datos (sirve en cualquier dispositivo)
    function desdePagos() {
        const pl = pagos.filter(p => p.concepto.startsWith('plan:'));
        if (!pl.length) return null;
        const [, pid, alc] = pl[pl.length - 1].concepto.split(':');
        if (!plan(pid)) return null;
        const deps = [...new Set(pagos.filter(p => p.concepto.startsWith('deporte:')).map(p => p.concepto.slice(8)))];
        return { plan: pid, alcance: alc === 'todas' ? 'todas' : 'una', deportes: deps };
    }
    // Último plan con pago aprobado: define la credencial
    function planAprobado() {
        const l = pagos.filter(p => p.estado === 'aprobado' && p.concepto.startsWith('plan:'));
        if (!l.length) return null;
        const [, pid, alc] = l[l.length - 1].concepto.split(':');
        return plan(pid) ? { plan: pid, alcance: alc === 'todas' ? 'todas' : 'una' } : null;
    }

    // ---------- Planes
    function renderPlanes() {
        const s = socio();
        $('planes').innerHTML = PLANES.map(p => {
            const actual = s && s.plan === p.id && s.alcance === alcance;
            const est = actual ? estadoDe(`plan:${p.id}:${alcance}`) : null;
            let txt = 'Elegir plan', cls = 'primary', dis = false;
            if (actual && est === 'aprobado') { txt = 'Plan activo'; cls = 'secondary'; dis = true; }
            else if (actual && est === 'en_revision') { txt = 'Pago en revisión'; cls = 'secondary'; dis = true; }
            else if (actual && est === 'rechazado') { txt = 'Reintentar pago'; }
            else if (actual) { txt = 'Pagar ahora'; }
            return `<article class="plan${p.destacado ? ' destacado' : ''}${actual ? ' actual' : ''}">
                ${p.destacado ? '<span class="badge">Más elegido</span>' : ''}
                ${actual ? chip(est) : ''}
                <h3>${p.nombre}</h3>
                <div class="precio-plan">${money(p[alcance])}<small> /mes</small></div>
                <p>${p.desc}</p>
                <button class="hero-btn ${cls}" data-plan="${p.id}" ${dis ? 'disabled' : ''}>${txt}</button>
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
    function pintarQR(el, texto, oscuro) {
        const fallback = () => { el.innerHTML = `<div class="qr-txt">${esc(texto)}</div>`; };
        const crear = () => { try { el.innerHTML = ''; new QRCode(el, { text: texto, width: 130, height: 130, colorDark: oscuro || '#000000', colorLight: '#ffffff' }); } catch (e) { fallback(); } };
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
            inv.innerHTML = `<div class="invita"><p>Iniciá sesión para elegir tu plan y acceder a tu panel de socio con tu credencial digital.</p><a class="hero-btn primary" href="LogIn.html">Iniciar sesión</a></div>`;
            return;
        }
        inv.innerHTML = '';
        const s = socio();
        if (!s) { cont.hidden = true; return; }
        const p = plan(s.plan), seleccion = DEPORTES.filter(d => s.deportes.includes(d.slug));
        const dto = 1 - p.descuento / 100;
        const cuotaDep = seleccion.reduce((t, d) => t + precioDep(d), 0) * dto;
        const total = p[s.alcance] + cuotaDep;
        const numero = 'AER-' + String(user.id).padStart(5, '0');
        const nombre = [user.nombre, user.apellido].filter(Boolean).join(' ') || 'Socio';
        const alc = s.alcance === 'una' ? 'Una sede' : 'Todas las sedes';
        const ordenados = [...seleccion].sort((a, b) => parseFloat(a.horarios) - parseFloat(b.horarios));
        const grupos = Object.entries(CATS).map(([k, label]) => `<div><b style="color:var(--gold);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase">${label}</b>${
            DEPORTES.filter(d => d.cat === k).map(d => `<label><input type="checkbox" data-dep="${d.slug}" ${s.deportes.includes(d.slug) ? 'checked' : ''}> ${esc(d.nombre)} · ${esc(d.precio)}</label>`).join('')}</div>`).join('');

        const est = estadoDe(`plan:${s.plan}:${s.alcance}`);
        const pasos = [
            ['Plan elegido', 'hecho'],
            ['Pago enviado', est ? 'hecho' : 'activo'],
            ['Verificación', est === 'aprobado' ? 'hecho' : est === 'rechazado' ? 'error' : est === 'en_revision' ? 'activo' : ''],
            ['Credencial', est === 'aprobado' ? 'hecho' : '']
        ];
        const aprobadoOtro = planAprobado() && est !== 'aprobado';
        const btnPagar = t => `<button class="hero-btn primary" data-plan="${s.plan}" type="button">${t}</button>`;
        const msg = {
            aprobado: ['ok', '¡Pago verificado!', 'Tu credencial ya está habilitada. Presentala al ingresar a la sede.', ''],
            en_revision: ['rev', 'Estamos verificando tu pago', 'Un encargado del club lo revisa personalmente. Cuando lo apruebe, tu credencial con QR aparece acá.', ''],
            rechazado: ['no', 'No pudimos verificar tu pago', 'Revisá el número de operación o acercate a la sede. Podés intentarlo de nuevo.', btnPagar('Reintentar pago')],
            sin: ['pend', 'Falta abonar tu plan', 'La credencial se habilita después de pagar y de que verifiquemos tu pago.', btnPagar('Pagar ahora')]
        }[est || 'sin'];
        if (aprobadoOtro) msg[2] += ' Mientras tanto, tu credencial actual sigue activa.';

        const apr = planAprobado();
        const carnet = apr ? (() => {
            const pa = plan(apr.plan), t = TEMAS[apr.plan], alcA = apr.alcance === 'una' ? 'Una sede' : 'Todas las sedes';
            return `
            <div class="carnet activo plan-${apr.plan}" style="--acc:${t.acc}">
                <div class="carnet-top"><span class="marca">AERUS CLUB</span><span class="sello">SOCIO ACTIVO</span></div>
                <div class="plan-banda">${esc(pa.nombre)}</div>
                <div class="nombre">${esc(nombre)}</div>
                <div class="meta">Socio N° <b>${numero}</b><br>${esc(t.lema)}<br>Alcance: <b>${alcA}</b><br>${esc(user.email || '')}</div>
                <div class="qr" id="qrBox" data-qr="${t.qr}"></div>
                <p class="aviso-local">Presentá este código al ingresar a la sede.</p>
            </div>`;
        })() : `
            <div class="carnet bloqueado">
                <div class="carnet-top"><span class="marca">AERUS CLUB</span><span class="sello">NO HABILITADA</span></div>
                <div class="nombre">${esc(nombre)}</div>
                <div class="meta">Socio N° <b>${numero}</b><br>Plan <b>${p.nombre}</b> · ${alc}</div>
                <div class="qr fantasma" aria-hidden="true"></div>
                <div class="candado"><span>🔒</span><b>Credencial bloqueada</b><small>${est === 'en_revision' ? 'Se habilita cuando verifiquemos tu pago' : 'Se habilita después de pagar y verificar el pago'}</small></div>
            </div>`;

        cont.hidden = false;
        cont.innerHTML = `
        <div class="sec-head"><small>Hola, ${esc(user.nombre || 'socio')}</small><h2>Tu panel de socio</h2></div>
        <ol class="pasos-estado">${pasos.map((x, i) => `<li class="${x[1]}"><span>${x[1] === 'hecho' ? '✓' : x[1] === 'error' ? '!' : i + 1}</span>${x[0]}</li>`).join('')}</ol>
        <div class="aviso ${msg[0]}"><div><b>${msg[1]}</b><p>${msg[2]}</p></div>${msg[3]}</div>
        <div class="panel-grid">
            <div>
                <div class="caja">
                    <div class="resumen">
                        <div><b>${p.nombre}</b><span>Plan · ${alc}</span></div>
                        <div><b>${money(total)}</b><span>Cuota mensual total</span></div>
                        <div><b>${seleccion.length}</b><span>Deportes</span></div>
                    </div>
                    <p class="aviso-local">Cuota social ${money(p[s.alcance])}${p.descuento ? ` + deportes con ${p.descuento}% de descuento (${money(cuotaDep)})` : ` + deportes (${money(cuotaDep)})`}. <a href="#planesSec" style="color:var(--gold-light)">Cambiar de plan</a></p>
                </div>
                <div class="caja">
                    <h3>Mis deportes</h3>
                    ${seleccion.length ? `<ul class="lista-dep">${seleccion.map(d => `<li><a href="deporte.html?d=${d.slug}">${d.emoji} ${esc(d.nombre)}<small>${esc(d.sedes)}</small></a><span class="der">${chip(estadoDe('deporte:' + d.slug))}<b>${money(precioDep(d) * dto)}</b></span></li>`).join('')}</ul>` : '<p>Todavía no sumaste deportes. Elegí los que quieras acá abajo.</p>'}
                    <details class="agregar" ${pickAbierto ? 'open' : ''}><summary>Agregar o quitar deportes</summary><div class="pick">${grupos}</div></details>
                </div>
                <div class="caja">
                    <h3>Mis horarios</h3>
                    ${ordenados.length ? `<ul class="lista-dep">${ordenados.map(d => `<li><span>${d.emoji} ${esc(d.nombre)}<small>${esc(d.sedes)}</small></span><b>${esc(d.horarios)}</b></li>`).join('')}</ul>` : '<p>Cuando sumes deportes, vas a ver tus horarios acá.</p>'}
                </div>
            </div>
            ${carnet}
        </div>
        <p class="aviso-local" style="text-align:center;margin-top:18px">Tus elecciones se guardan en este navegador.</p>`;
        if (apr) cargarCredencial();
    }

    // El código del QR lo entrega el servidor y solo si el pago del plan está aprobado
    async function cargarCredencial() {
        const d = await llamarPagos({ accion: 'credencial' });
        const box = $('qrBox'); if (!box) return;
        if (d.exito && d.codigo) pintarQR(box, d.codigo, box.dataset.qr);
        else box.innerHTML = '<div class="qr-txt">No se pudo cargar la credencial. Recargá la página.</div>';
    }

    // ---------- Eventos
    // ---------- Pagos (manual, $10 por compra)
    const MONTO_PAGO = 10;
    const QR_IMG = '../imagenes/qr-10.png';
    let pagos = [];

    async function llamarPagos(datos) {
        try {
            const r = await fetch('../PHP/pagos.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            return await r.json();
        } catch (e) {
            return { exito: false, mensaje: 'No se pudo conectar con el servidor.' };
        }
    }

    async function cargarPagos() {
        const d = await llamarPagos({ accion: 'listar' });
        pagos = d.exito ? d.pagos : [];
    }

    const pagado = concepto => pagos.some(p => p.concepto === concepto && p.estado === 'aprobado');
    const ESTADOS = { en_revision: ['En revisión', 'rev'], aprobado: ['Aprobado', 'ok'], rechazado: ['Rechazado', 'no'] };
    const estadoDe = c => { const l = pagos.filter(p => p.concepto === c); return l.length ? l[l.length - 1].estado : null; };
    const chip = e => e && ESTADOS[e] ? `<span class="chip ${ESTADOS[e][1]}">${ESTADOS[e][0]}</span>` : '<span class="chip pend">Sin pagar</span>';
    const nombreConcepto = c => {
        const [tipo, a, b] = c.split(':');
        if (tipo === 'plan') return `Plan ${plan(a).nombre} · ${b === 'una' ? 'Una sede' : 'Todas las sedes'}`;
        const d = DEPORTES.find(x => x.slug === a); return `Deporte: ${d ? d.nombre : a}`;
    };

    // Muestra el QR de $10 y registra el número de operación.
    // Resuelve true si se registró el pago, false si se canceló.
    function pedirPago(concepto) {
        return new Promise(resolve => {
            const modal = document.createElement('div');
            modal.className = 'pago-modal';
            modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-labelledby', 'pagoTitulo');
            modal.innerHTML = `
                <div class="pago-caja">
                    <button type="button" class="pago-x" id="pagoX" aria-label="Cerrar">×</button>
                    <div id="pagoVista">
                        <span class="pago-kicker">PASO 2 · PAGO</span>
                        <h3 id="pagoTitulo">${esc(nombreConcepto(concepto))}</h3>
                        <div class="pago-monto">$${MONTO_PAGO}</div>
                        <div class="pago-qr"><img src="${QR_IMG}" alt="QR de pago de Mercado Pago" width="200"></div>
                        <ol class="pago-pasos"><li>Escaneá el QR con Mercado Pago</li><li>Pagá $${MONTO_PAGO}</li><li>Copiá el número de operación y pegalo acá</li></ol>
                        <label class="campo">Número de operación<input id="pagoRef" placeholder="Ej: 1234567890" maxlength="64" autocomplete="off"></label>
                        <small id="pagoMsg" role="alert"></small>
                        <div class="pago-acciones">
                            <button type="button" id="pagoCancel" class="hero-btn secondary">Cancelar</button>
                            <button type="button" id="pagoOk" class="hero-btn primary">Ya pagué</button>
                        </div>
                    </div>
                </div>`;
            document.body.appendChild(modal);
            const q = id => modal.querySelector(id);
            let enviado = false;
            const cerrar = valor => { document.removeEventListener('keydown', tecla); modal.remove(); resolve(valor); };
            const tecla = e => { if (e.key === 'Escape') cerrar(enviado); };
            const msg = t => { q('#pagoMsg').textContent = t; };
            document.addEventListener('keydown', tecla);
            modal.addEventListener('click', e => { if (e.target === modal) cerrar(enviado); });
            q('#pagoX').onclick = () => cerrar(enviado);
            q('#pagoCancel').onclick = () => cerrar(false);
            q('#pagoRef').focus();
            q('.pago-qr img').addEventListener('error', e => { e.target.parentNode.innerHTML = '<span class="pago-qr-err">No se pudo cargar el QR de pago. Escribinos desde Contacto.</span>'; });

            q('#pagoOk').onclick = async () => {
                const ref = q('#pagoRef').value.trim();
                if (!ref) { msg('Escribí el número de operación.'); return; }
                const ok = q('#pagoOk'); ok.disabled = true; ok.textContent = 'Enviando…'; msg('');
                const d = await llamarPagos({ accion: 'registrar', concepto, pago_ref: ref });
                if (!d.exito) { ok.disabled = false; ok.textContent = 'Ya pagué'; msg(d.mensaje); return; }
                await cargarPagos();
                enviado = true;
                q('#pagoVista').innerHTML = `
                    <div class="pago-ok"><span>✓</span></div>
                    <h3 id="pagoTitulo">¡Pago enviado!</h3>
                    <p class="pago-txt">Recibimos tu número de operación. Un encargado del club verificará tu pago personalmente.</p>
                    <p class="pago-txt">Cuando lo apruebe, tu credencial con QR se habilita en tu panel de socio.</p>
                    <div class="pago-acciones"><button type="button" id="pagoFin" class="hero-btn primary">Entendido</button></div>`;
                q('#pagoFin').onclick = () => cerrar(true);
                q('#pagoFin').focus();
            };
        });
    }

    async function elegirPlan(id) {
        if (!user) { guardar('aerus_plan_pendiente', { plan: id, alcance }); location.href = 'LogIn.html'; return; }

        if (!(await pedirPago(`plan:${id}:${alcance}`))) return;

        const s = socio() || { deportes: [] };
        guardar(keySocio(), { plan: id, alcance, deportes: s.deportes });
        renderPlanes(); renderPanel();
        $('panelSocio').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    $('planes').addEventListener('click', e => { const b = e.target.closest('[data-plan]'); if (b) elegirPlan(b.dataset.plan); });
    $('panelSocio').addEventListener('click', e => { const b = e.target.closest('[data-plan]'); if (b) elegirPlan(b.dataset.plan); });
    document.querySelectorAll('.toggle button').forEach(b => b.addEventListener('click', () => {
        alcance = b.dataset.alcance;
        document.querySelectorAll('.toggle button').forEach(x => x.classList.toggle('on', x === b));
        renderPlanes();
    }));
    $('panelSocio').addEventListener('change', async e => {
        const c = e.target.closest('[data-dep]'); if (!c || !user) return;
        const s = socio(); if (!s) return;

        if (c.checked) {
            if (!(await pedirPago(`deporte:${c.dataset.dep}`))) { c.checked = false; return; }
            s.deportes = [...new Set([...s.deportes, c.dataset.dep])];
        } else {
            s.deportes = s.deportes.filter(x => x !== c.dataset.dep);
        }

        guardar(keySocio(), s); pickAbierto = true; renderPanel();
    });

    renderEstaticos(); renderTabla(); renderPlanes();

    fetch('../PHP/comproba_session.php', { credentials: 'same-origin' })
        .then(r => r.json())
        .then(async data => {
            user = data.logueado ? data.usuario : null;
            const pend = user && leer('aerus_plan_pendiente');
            if (pend && plan(pend.plan)) {
                alcance = pend.alcance === 'todas' ? 'todas' : 'una';
            }
            try { localStorage.removeItem('aerus_plan_pendiente'); } catch (e) { /* nada */ }
            await cargarPagos();
            const s = socio();
            if (s) alcance = s.alcance;
            document.querySelectorAll('.toggle button').forEach(x => x.classList.toggle('on', x.dataset.alcance === alcance));
            renderPlanes(); renderPanel();
        })
        .catch(() => { renderPanel(); /* sin servidor PHP: versión para visitantes */ });
})();
