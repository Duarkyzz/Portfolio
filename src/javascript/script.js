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

// Controla o efeito de hover no card da hero section

const heroCard = document.querySelector('.hero-card');

heroCard.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // luz (já existente)
    heroCard.style.setProperty('--mouse-x', `${x}px`);
    heroCard.style.setProperty('--mouse-y', `${y}px`);

    // NOVO: inclinação baseada na distância até o centro do card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 4;   // até 4° pros lados
    const rotateX = ((y - centerY) / centerY) * -4;  // até 4° pra cima/baixo (invertido)

    heroCard.style.setProperty('--rotate-x', `${rotateX}deg`);
    heroCard.style.setProperty('--rotate-y', `${rotateY}deg`);
});

heroCard.addEventListener('mouseleave', () => {
    heroCard.style.setProperty('--rotate-x', '0deg');
    heroCard.style.setProperty('--rotate-y', '0deg');
});