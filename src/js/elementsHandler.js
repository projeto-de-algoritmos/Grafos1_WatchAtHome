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

let loginForm = document.getElementsByClassName('modal-form')[1];
let closeloginFormBtn = document.getElementById('close-login-form');

let arrowLeft = document.querySelector('div.popular-movies').firstElementChild;
let arrowRight = document.querySelector('div.popular-movies').lastElementChild;
let movies = document.getElementsByClassName('movies-list')[0];

let submitUserButton = document.getElementById('submit-user');

let userLoginEmail = document.getElementById('user-login-email');
let userLoginPass = document.getElementById('user-login-password');
let signinUserButton = document.getElementById('signin-user');

let signUpLoginBtns = document.querySelector('div.signup-login-buttons');
let accountInfo = document.querySelector('div.account-info');
let userPhoto = document.getElementById('user-photo');
let userProfileOptions = document.querySelector('div.user-profile');

let logoutButton = document.getElementById('user-btn-logout');
let myAccountButton = document.getElementById('user-btn-profile');
let profileInfo = document.querySelector('div.myaccount-info');
let profileModal = document.querySelector('div.myaccount-modal')
let closeProfileBtn = document.getElementById('close-account-info');

let editForm = document.getElementsByClassName('editaccount-modal')[0];
let editEmailField = document.getElementById('new-email');
let editUsernameField = document.getElementById('new-username');
let editPasswordField = document.getElementById('new-password');
let closeEditFormBtn = document.getElementById('close-edit-form');
let openEditForm = document.getElementById('user-btn-edit');
let submitEditedUserBtn = document.getElementById('submit-edited-user');
let deleteAccountBtn = document.getElementById('user-btn-delete');

let deleteModal = document.querySelector('div.confirmation-modal');
let confirmButton = document.getElementById('btn-confirm');
let cancelButton = document.getElementById('btn-cancel');
let closeDeleteModalBtn = document.getElementById('close-delete-form');

let btnEditEmail = document.getElementById('btn-edit-email');
let btnEditPassword = document.getElementById('btn-edit-password');
let btnEditUsername = document.getElementById('btn-edit-username');
let editEmailModal = document.getElementById('edit-email-modal');
let editPasswordModal = document.getElementById('edit-password-modal');
let editUsernameModal = document.getElementById('edit-username-modal');
let btnCloseEditEmail = document.getElementById('close-edit-email');
let btnCloseEditPassword = document.getElementById('close-edit-password');
let btnCloseEditUsername = document.getElementById('close-edit-username');
let submitEditedEmail = document.getElementById('submit-email-user');
let submitEditedUsername = document.getElementById('submit-username-user');
let submitEditedPassword = document.getElementById('submit-password-user');

let marginLeftStatic = 0;

function init() {
    let mainFooter = document.getElementById('main-footer');
    let footerInfo = document.createElement('span');

    let today = new Date();
    let year = today.getFullYear();
    let userFullInfo = JSON.parse(localStorage.getItem('user'));
    let isLogged = JSON.parse(localStorage.getItem('isLogged'));
    
    footerInfo.textContent = `© Copyright todos os direitos reservados - ${year}`;

    mainFooter.appendChild(footerInfo);

    if (isLogged) {
        accountInfo.firstElementChild.append(`Hello ${userFullInfo.username}`);
        signUpLoginBtns.style.display = 'none';
        accountInfo.style.display = 'flex';
    }
    
    lupa.addEventListener("click", openSearchBox);
    document.addEventListener("click", closeSearchBox);
    arrowLeft.addEventListener("click", passToLeft);
    userPhoto.addEventListener("click", manageProfileOptions);
    arrowRight.addEventListener("click", passToRight);
    loginButton.addEventListener("click", openLoginForm);
    logoutButton.addEventListener("click", logout);
    signupButton.addEventListener("click", openRegisterForm);
    targetButton.addEventListener("click", catchTermRedirPage);
    cancelButton.addEventListener("click", closeDeleteModal);
    btnEditEmail.addEventListener("click", openEditEmail);
    openEditForm.addEventListener("click", openEditUser);
    confirmButton.addEventListener("click", handleDeleteUser);
    buttonSearch2nd.addEventListener("click", catchTermRedirPage);
    myAccountButton.addEventListener("click", openProfileInfo);
    closeProfileBtn.addEventListener("click", closeProfileInfo);
    btnEditPassword.addEventListener("click", openEditPassword);
    btnEditUsername.addEventListener("click", openEditUsername);
    signinUserButton.addEventListener("click", signin);
    submitUserButton.addEventListener("click", signup);
    closeEditFormBtn.addEventListener("click", closeEditUser);
    deleteAccountBtn.addEventListener("click", openDeleteModal);
    closeloginFormBtn.addEventListener("click", closeLoginForm);
    btnCloseEditEmail.addEventListener("click", closeEditEmail);
    submitEditedEmail.addEventListener("click", handleEditemail);
    closeDeleteModalBtn.addEventListener("click", closeDeleteModal);
    closeRegisterFormBtn.addEventListener("click", closeRegisterForm);
    btnCloseEditPassword.addEventListener("click", closeEditPassword);
    btnCloseEditUsername.addEventListener("click", closeEditUsername);
    submitEditedPassword.addEventListener("click", handleEditPassword);
    submitEditedUsername.addEventListener("click", handleEditUsername);
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
    loginForm.style.display = "block";
}

function closeLoginForm() {
    loginForm.style.display = "none";
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
    console.log(searchBoxMain.value);
    window.location = './moviesResult.html';
}

function signup(event) {
    event.preventDefault();

    let user = new ManagerUsers();
    
    user.createUser();

}

async function signin(event) {
    event.preventDefault();

    let user = new ManagerUsers();

    user.email = userLoginEmail.value;
    user.password = userLoginPass.value;

    user.signin().then(onfulfilled => {
        closeLoginForm();
        signUpLoginBtns.style.display = 'none';
        accountInfo.style.display = 'flex';
        setTimeout(() => {location.reload()}, 1000);
    }).catch(onrejected => {});

}

function logout() {
    localStorage.setItem('isLogged', 'false');
    location.reload();
}

function manageProfileOptions() {
    if (userProfileOptions.style.display == 'block') {
        userProfileOptions.style.display = 'none';
    } else {
        userProfileOptions.style.display = 'block';
    }
}

async function openProfileInfo() {
    let user = await JSON.parse(localStorage.getItem('user'));

    console.log(user);

    let username = document.createElement('h4');
    let email = document.createElement('span');

    username.textContent = `Nome de usuário: ${user.username}`;
    email.textContent = `Email: ${user.email}`;
    profileInfo.appendChild(username);
    profileInfo.appendChild(email);

    profileModal.style.display = 'block';
}

function closeProfileInfo() {
    profileInfo.removeChild(profileInfo.lastElementChild);
    profileInfo.removeChild(profileInfo.lastElementChild);
    profileModal.style.display = 'none';
}

function openEditUser() {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    
    document.getElementById('user-email-edit').value = currentUser.email;
    document.getElementById('username-edit').value = currentUser.username;
    
    editForm.style.display = 'block';
}

function closeEditUser() {
    editForm.style.display = 'none';
}

async function handleEditPassword(event) {
    event.preventDefault();

    let user = new ManagerUsers();
    let currentUser = JSON.parse(localStorage.getItem('user'));
    
    let data = {
        password: editPasswordField.value,
    };

    let confirmPassword = document.getElementById('confirmation-new-password').value;
    let oldPassword = document.getElementById('old-password').value;

    let users = user.readUsers().then(onfulfilled => onfulfilled)
        .catch(reject => console.log(reject));

    try {
        for (let item of await users)
            if (data['password'] === item['password'])
                throw {
                    name: 'Senha existente',
                    message: 'escolha outra combinação'
                }
        if (confirmPassword !== data.password)
            throw {
                name: 'Senhas distintas',
                message: 'as senhas não correspondem'
            }
        if (oldPassword !== currentUser.password)
            throw {
                name: 'Senha incorreta',
                message: 'a sua antiga senha está incorreta'
            }

        user.password = data.password;
        user.updateUser(data);

    } catch(errorObj) {
        console.log(toastr.warning(`${errorObj.name}! ${errorObj.message}`));
    }
    
}

async function handleEditUsername(event) {
    event.preventDefault();
    let user = new ManagerUsers();

    let data = {
        username: editUsernameField.value,
    };

    let users = user.readUsers().then(async onfulfilled => {

        return onfulfilled;
    }).catch(reject => console.log(reject));

    try {
        for (let item of await users)
            if (data['username'] === item['username'])
                throw {
                    name: 'Nome de usuário existente',
                    message: 'escolha outro nome de usuário'
                }

        user.username = data.username;
        user.updateUser(data);

    } catch(errorObj) {
        console.log(toastr.warning(`${errorObj.name}! ${errorObj.message}`));
    }
    
}

async function handleEditemail(event) {
    event.preventDefault();
    let user = new ManagerUsers();
    
    let data = {
        email: editEmailField.value,
    };

    let users = user.readUsers().then(async onfulfilled => {

        return onfulfilled;
    }).catch(reject => console.log(reject));

    try {
        for (let item of await users)
            if (data['email'] === item['email'])
                throw {
                    name: 'Esse email já está em uso',
                    message: 'escolha outro email'
                }

        user.email = data.email;
        user.updateUser(data);
    
    } catch(errorObj) {
        console.log(toastr.warning(`${errorObj.name}! ${errorObj.message}`));
    }
    
}

function openDeleteModal() {
    deleteModal.style.display = 'block';
}

function closeDeleteModal(event) {
    event.preventDefault();
    
    deleteModal.style.display = 'none';
}

function handleDeleteUser(event) {
    event.preventDefault();

    let user = new ManagerUsers();

    user.deleteUser();
    
}

function openEditEmail() {
    editEmailModal.style.display = 'block';
}

function openEditPassword() {
    editPasswordModal.style.display = 'block';
}

function openEditUsername() {
    editUsernameModal.style.display = 'block';
}

function closeEditEmail() {
    editEmailModal.style.display = 'none';
}

function closeEditPassword() {
    editPasswordModal.style.display = 'none';
}

function closeEditUsername() {
    editUsernameModal.style.display = 'none';
}

init();