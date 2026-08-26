// Controla o menu mobile (hambúrguer)

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile_menu');

function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
}

hamburger.addEventListener('click', (event) => {
    event.stopPropagation(); // impede que esse clique já feche o menu pelo listener abaixo
    toggleMenu();
});

// Fecha o menu se o usuário clicar em qualquer lugar fora dele
document.addEventListener('click', (event) => {
    const clickedOutside = !mobileMenu.contains(event.target) && !hamburger.contains(event.target);
    if (clickedOutside) {
        closeMenu();
    }
});

// Fecha o menu ao apertar Esc (acessibilidade via teclado)
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

// Fecha o menu ao clicar em um dos links (evita ele ficar aberto após navegar)
document.querySelectorAll('#mobile_nav_list a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

const herocard = document.querySelector('.hero-card');

herocard.addEventListener('mousemove', (e) => {
    const rect = herocard.getBoundingClientRect(); // posição do card na tela
    const x = e.clientX - rect.left;                // posição do mouse RELATIVA ao card
    const y = e.clientY - rect.top;

    console.log("mouse em:", x, y);

    herocard.style.setProperty('--mouse-x', `${x}px`);
    herocard.style.setProperty('--mouse-y', `${y}px`);
});
