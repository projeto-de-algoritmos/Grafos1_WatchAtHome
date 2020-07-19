import { apiKey, modifyImgUrl, registerMovies } from './renderMovies.js';
import * as elementHandler from './elementsHandler.js';

let gallery = document.querySelector('div.movies-gallery');
let resultsList = document.querySelector('div.movies-list');

async function makeSearch() {
    let movieName = localStorage.getItem('termSearched');
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&page=1&include_adult=false&query=${movieName}`;

    let moviesList;
        
    try {
        const response = await fetch(searchUrl);
        if (response.ok) {
            const responseJson = await response.json();

            if (responseJson.results.length === 0) {
                console.log('ok');
                gallery.style.display = 'flex';
                resultsList.innerHTML = 
                    '<p id="feedback">Desculpe, não encontramos resultados para a sua busca!</p>';
            } else {
                let moviesList = modifyImgUrl(responseJson.results);
                registerMovies(moviesList, 'list-results');
            }
        }
    } catch (error) {
        console.log(error.message);
        //I should fix the problem of not found results here
    }
}


makeSearch();