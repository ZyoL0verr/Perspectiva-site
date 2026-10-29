(() => {
    const header = document.querySelector('.navbar');
    const btn = document.querySelector('.menu-btn');
    const menu = document.getElementById('menu');
    const links = [...menu.querySelectorAll('a')];

    // Menu mobile
    const setMenu = (open) => {
        document.body.classList.toggle('menu-open', open);
        btn.setAttribute('aria-expanded', open);
        btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
    links.forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    window.matchMedia('(min-width: 801px)').addEventListener('change', () => setMenu(false));

    // Sombra na navbar ao rolar
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Link ativo conforme a seção visível
    const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));

    // Ano do rodapé
    const ano = document.getElementById('ano');
    if (ano) ano.textContent = new Date().getFullYear();

    // O olho do hero acompanha o cursor (ou o dedo): o site "olha" para você
    const eye = document.querySelector('.eye');
    const iris = document.getElementById('iris');
    if (eye && iris && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const maxX = 42, maxY = 20;
        window.addEventListener('pointermove', e => {
            const r = eye.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
            const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
            const x = Math.max(-1, Math.min(1, dx)) * maxX;
            const y = Math.max(-1, Math.min(1, dy)) * maxY;
            iris.style.transform = `translate(${x}px, ${y}px)`;
        }, { passive: true });
    }
})();