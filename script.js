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
})();