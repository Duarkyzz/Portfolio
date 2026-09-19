// Sem JavaScript, os links continuam visíveis. Com JS, ativamos o menu mobile.
document.documentElement.classList.add('js');
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('nav-links');
hamburger.hidden = false;

function closeMenu(returnFocus = false) {
    menu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu');
    if (returnFocus) hamburger.focus();
}
hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true);
});
document.addEventListener('click', event => {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu());

// Animações de entrada: o conteúdo continua visível caso a API não exista.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const entranceAnimations = new Set();
let entranceObserver;

function setupEntrances() {
    entranceObserver?.disconnect();
    entranceAnimations.forEach(animation => animation.cancel());
    entranceAnimations.clear();
    if (motionPreference.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

    entranceObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const element = entry.target;
            entranceObserver.unobserve(element);
            if (element.dataset.entered) return;
            element.dataset.entered = 'true';
            const animation = element.animate([
                { opacity: 0, transform: 'translateY(18px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], { duration: 650, easing: 'cubic-bezier(.2,.65,.3,1)' });
            entranceAnimations.add(animation);
            animation.onfinish = () => entranceAnimations.delete(animation);
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.hero-copy, .tech-strip, .section-heading, .card, .about > div, .contact')
        .forEach(element => entranceObserver.observe(element));
}
motionPreference.addEventListener('change', setupEntrances);
setupEntrances();
