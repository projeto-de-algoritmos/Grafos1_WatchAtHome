import './../assets/css/style.css';

import lupaImg from './../assets/images/lupa.png';
import logoImg from './../assets/images/logo.png';
import imdbIcon from './../assets/images/imdb_icon.png';

import renderMovies from './renderMovies';
import { ManagerUsers } from './managerUser.js';

let lupa = document.querySelector('img#lupa-icon');
let searchBox = document.querySelector('input#search-box');
let searchBoxMain = document.getElementById('search-box-main');
let targetButton = document.querySelector('button#button-search-main');
let buttonSearch2nd = document.getElementById('button-search');
let termSearched;

let signupButton = document.getElementById('signup');
let loginButton = document.getElementById('login');

let registerForm = document.getElementsByClassName('modal-form')[0];
let closeRegisterFormBtn = document.getElementById('close-register-form');

let arrowLeft = document.querySelector('div.popular-movies').firstElementChild;
let arrowRight = document.querySelector('div.popular-movies').lastElementChild;
let movies = document.getElementsByClassName('movies-list')[0];

let email = document.getElementById('user-email');
let username = document.getElementById('username');
let password = document.getElementById('user-password');
let sexMale = document.getElementById('masculino');
let sexFemale = document.getElementById('feminino');
let createUserButton = document.getElementById('submit-user');

let marginLeftStatic = 0;

function init() {
    let mainFooter = document.getElementById('main-footer');
    let footerInfo = document.createElement('span');

    let today = new Date();
    let year = today.getFullYear();
    footerInfo.textContent = `© Copyright todos os direitos reservados - ${year}`;

    mainFooter.appendChild(footerInfo);

    lupa.addEventListener("click", openSearchBox);
    document.addEventListener("click", closeSearchBox);
    signupButton.addEventListener("click", openRegisterForm);
    loginButton.addEventListener("click", openLoginForm);
    closeRegisterFormBtn.addEventListener("click", closeRegisterForm);
    arrowLeft.addEventListener("click", passToLeft);
    arrowRight.addEventListener("click", passToRight);
    targetButton.addEventListener("click", catchTermRedirPage);
    buttonSearch2nd.addEventListener("click", catchTermRedirPage);
    createUserButton.addEventListener("click", signup);
}

function openSearchBox() {
    searchBox.style.visibility = "visible";
    buttonSearch2nd.style.visibility = "visible";
    lupa.style.maxWidth = "40px";
    lupa.style.maxHeight = "40px";
    lupa.style.marginTop = "-1em";
}

function closeSearchBox(event) {
    if (searchBox !== event.target && lupa !== event.target) {
        searchBox.style.visibility = "hidden";
        buttonSearch2nd.style.visibility = "hidden";
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

async function catchTermRedirPage() {
    termSearched = await (
        searchBoxMain.value === '' ? searchBox.value : searchBoxMain.value);
    localStorage.setItem('termSearched', termSearched);
    window.location = './moviesResult.html';
    console.log(searchBoxMain.value);
}

async function signup(event) {
    event.preventDefault();

    let user = new ManagerUsers();

    user.username = username.value;
    user.password = password.value;
    user.email = email.value;
    user.sex = (sexFemale.checked ? sexFemale.value : sexMale.value);

    user.createUser();
}

init();