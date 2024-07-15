const carousel = document.querySelector('.carousel');
const movies = document.querySelectorAll('.movie');

const prevButton = document.createElement('button');
prevButton.textContent = 'Prev';
prevButton.classList.add('control-button', 'prev');
prevButton.addEventListener('click', () => {
    moveCarousel('prev');
});

const nextButton = document.createElement('button');
nextButton.textContent = 'Next';
nextButton.classList.add('control-button', 'next');
nextButton.addEventListener('click', () => {
    moveCarousel('next');
});

document.querySelector('.carousel-container').appendChild(prevButton);
document.querySelector('.carousel-container').appendChild(nextButton);

let currentIndex = 0;
const slideWidth = movies[0].offsetWidth + 20; // Incluir margen

function moveCarousel(direction) {
    if (direction === 'prev') {
        currentIndex = currentIndex <= 0 ? movies.length - 1 : currentIndex - 1;
    } else {
        currentIndex = currentIndex >= movies.length - 1 ? 0 : currentIndex + 1;
    }
    carousel.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
}
