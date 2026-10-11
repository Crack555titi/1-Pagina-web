/* Filtro de deportes por sede, categoría y rango de precio. Requiere deportes-data.js */
(function () {
    const fSede = document.getElementById('fSede'), fCat = document.getElementById('fCat'), fPrecio = document.getElementById('fPrecio');
    const form = document.getElementById('filtros'), count = document.getElementById('fCount'), vacio = document.getElementById('sinRes');
    if (!form || typeof DEPORTES === 'undefined') return;

    const porSlug = Object.fromEntries(DEPORTES.map(d => [d.slug, d]));
    const tarjetas = [...document.querySelectorAll('a.deporte-link')].map(a => ({
        el: a, d: porSlug[new URL(a.href).searchParams.get('d')]
    })).filter(t => t.d);
    const precio = d => parseInt(String(d.precio).replace(/\D/g, ''), 10) || 0;

    function aplicar() {
        const [min, max] = fPrecio.value ? fPrecio.value.split('-').map(Number) : [0, Infinity];
        let n = 0;
        tarjetas.forEach(({ el, d }) => {
            const ok = (!fSede.value || d.sedes.includes(fSede.value)) && (!fCat.value || d.cat === fCat.value) && precio(d) >= min && precio(d) <= max;
            el.hidden = !ok;
            if (ok) n++;
        });
        count.textContent = n === tarjetas.length ? `Mostrando los ${n} deportes` : `${n} de ${tarjetas.length} deportes`;
        vacio.hidden = n > 0;
    }

    [fSede, fCat, fPrecio].forEach(f => f.addEventListener('change', aplicar));
    form.addEventListener('reset', () => setTimeout(aplicar));
    form.addEventListener('submit', e => e.preventDefault());

    // Desde la página de una sede: deportes.html?sede=palomar
    const q = new URLSearchParams(location.search).get('sede');
    const mapa = { 'palomar': 'Palomar', 'villa-luzuriaga': 'Villa Luzuriaga', 'parque-patricio': 'Parque Patricio' };
    if (mapa[q]) fSede.value = mapa[q];
    aplicar();
})();
