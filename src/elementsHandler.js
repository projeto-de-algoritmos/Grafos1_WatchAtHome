let lupa = document.querySelector('img#lupa-icon');
let searchBox = document.querySelector('input#search-box');

let signupButton = document.getElementById('signup');
let loginButton = document.getElementById('login');

let registerForm = document.getElementsByClassName('modal-form')[0];
let closeRegisterFormBtn = document.getElementById('close-register-form');

let arrowLeft = document.querySelector('div.popular-movies').firstElementChild;
let arrowRight = document.querySelector('div.popular-movies').lastElementChild;
let movies = document.getElementsByClassName('movies-list')[0];

let marginLeftStatic = 0;

function init() {
    let mainFooter = document.getElementById('main-footer');
    let footerInfo = document.createElement('span');

    let today = new Date();
    let year = today.getFullYear();
    footerInfo.textContent = `© Copyright todos os direitos reservados - ${year}`;

    mainFooter.appendChild(footerInfo);
}

function openSearchBox() {
    searchBox.style.visibility = "visible";
    lupa.style.maxWidth = "40px";
    lupa.style.maxHeight = "40px";
    lupa.style.marginTop = "-1em";
}

function closeSearchBox(event) {
    if (searchBox !== event.target && lupa !== event.target) {
        searchBox.style.visibility = "hidden";
        lupa.style.maxWidth = "50px";
        lupa.style.maxHeight = "50px";
        lupa.style.marginTop = "";
    }
}

function openRegisterForm() {
    registerForm.style.display = "block";
}

function closeRegisterForm() {
    registerForm.style.display = "none";
}

function openLoginForm() {

}

function passToLeft() {
    if (marginLeftStatic < 0) {
        marginLeftStatic += 170;
        movies.style.marginLeft = marginLeftStatic + "px";
    }
}

function passToRight() {
    if (marginLeftStatic > -2210) {
        marginLeftStatic -= 170;
        movies.style.marginLeft = marginLeftStatic + "px";
    }
}

init();

lupa.addEventListener("click", openSearchBox);
document.addEventListener("click", closeSearchBox);
signupButton.addEventListener("click", openRegisterForm);
loginButton.addEventListener("click", openLoginForm);
closeRegisterFormBtn.addEventListener("click", closeRegisterForm);
arrowLeft.addEventListener("click", passToLeft);
arrowRight.addEventListener("click", passToRight);