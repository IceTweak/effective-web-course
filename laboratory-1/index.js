
let body = document.querySelector('body')
let burger = document.querySelector('.header--burger')
let headerMenu = document.querySelector('.header--nav')

// Apply .active class to burger menu 
burger.onclick = () => {
    burger.classList.toggle('active')
    headerMenu.classList.toggle('active')
    body.classList.toggle('lock')
}