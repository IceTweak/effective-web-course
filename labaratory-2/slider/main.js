const slideContainer = document.querySelector(".container");
const slide = document.querySelector(".slides");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const interval = 4000;
const keyStorage = "currentSlideKey";

const getSlides = () => document.querySelectorAll(".slide");

let slides = getSlides();
let index = 1;
let autoSlide;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

const move = (slideTo) => {
  slides = getSlides();
  if (index >= slides.length - 1 || index <= 0) return;
  slideTo === "next" ? index++ : index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = ".7s";
  clearInterval(autoSlide);
  localStorage.setItem(keyStorage, index);
  startSlide();
};

const startSlide = () => {
  autoSlide = setInterval(() => {
    move("next");
  }, interval);
};
startSlide();

const infiniteHandle = () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = "none";
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  if (slides[index].id === lastClone.id) {
    slide.style.transition = "none";
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
};

slide.addEventListener("transitionend", () => {
  infiniteHandle();
});

slideContainer.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

slideContainer.addEventListener("mouseleave", startSlide);

nextBtn.addEventListener("click", () => move("next"));
prevBtn.addEventListener("click", () => move("prev"));

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "Space":
      move("next");
      break;
    case "ArrowRight":
      move("next");
      break;
    case "ArrowLeft":
      move("prev");
      break;
  }
});

function checkStorage() {
  slides = getSlides();
  index = Number(localStorage.getItem(keyStorage) || 1);
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  infiniteHandle();
}
checkStorage();
