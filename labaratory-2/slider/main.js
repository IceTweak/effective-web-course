const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const interval = 3000;

let slides = document.querySelectorAll('.slide');
let index = 1;
let autoSlide;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

const getSlides = () => document.querySelectorAll('.slide');

const move = (slideTo) => {
    slides = getSlides();
    if (index >= slides.length - 1 || index <= 0) return;
    slideTo === 'next' ? index++ : index--;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    slide.style.transition = '.7s';
};

const startSlide = () => {
    autoSlide = setInterval(() => {
        move('next');
    }, interval);
};

slide.addEventListener('transitionend', () => {
    slides = getSlides();
    if (slides[index].id === firstClone.id) {
        slide.style.transition = 'none';
        index = 1;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
    if (slides[index].id === lastClone.id) {
        slide.style.transition = 'none';
        index = slides.length - 2;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
});

slideContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

slideContainer.addEventListener('mouseleave', startSlide);

nextBtn.addEventListener('click', () => move('next'));
prevBtn.addEventListener('click', () => move('prev'));