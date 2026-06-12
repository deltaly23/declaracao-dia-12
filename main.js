
const cards = document.querySelectorAll('.card');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let current = 0;

function updateCards() {
    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === current) {
            card.classList.add('active');
        }
    });

    // esconder/mostrar botão anterior
    if (current === 0) {
        prevBtn.classList.add('ocult');
    } else {
        prevBtn.classList.remove('ocult');
    }

    // opcional: esconder próximo no último
    if (current === cards.length - 1) {
        nextBtn.classList.add('ocult');
    } else {
        nextBtn.classList.remove('ocult');
    }
}

nextBtn.addEventListener('click', () => {
    if (current < cards.length - 1) {
        current++;
        updateCards();
    }
});

prevBtn.addEventListener('click', () => {
    if (current > 0) {
        current--;
        updateCards();
    }
});

updateCards();