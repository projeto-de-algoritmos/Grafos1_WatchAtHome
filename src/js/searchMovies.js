import { apiKey } from './renderMovies.js';

let searchBoxMain = document.getElementById('search-box-main');
let targetButton = document.querySelector('button#button-search-main');

let resultRequest = {};

async function makeSearch(event) {
    event.preventDefault();

    let termSearched = searchBoxMain.value;
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&page=1&include_adult=false&query=${termSearched}`;
    
    window.location = './moviesResult.html';
    
    try {
        const response = await fetch(searchUrl);
        if (response.ok) {
            const responseJson = await response.json();
            resultRequest = responseJson;
            console.log(responseJson);
        }
    } catch (error) {
        console.log(error.message);
    }
    
}

targetButton.addEventListener("click", makeSearch);