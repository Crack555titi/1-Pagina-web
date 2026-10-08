(function () {
    // Aparición suave al hacer scroll
    const els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: .15 });
        els.forEach(el => io.observe(el));
    } else { els.forEach(el => el.classList.add('in')); }

    // Contadores animados
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count, 10), plus = el.dataset.plus ? '+' : '';
        const run = () => {
            const t0 = performance.now(), dur = 1400;
            const step = (t) => {
                const p = Math.min((t - t0) / dur, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + plus;
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };
        if ('IntersectionObserver' in window) {
            const io2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io2.disconnect(); } }, { threshold: .6 });
            io2.observe(el);
        } else run();
    });
})();
