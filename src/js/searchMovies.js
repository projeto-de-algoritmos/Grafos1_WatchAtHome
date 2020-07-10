import { apiKey, modifyImgUrl, registerMovies } from './renderMovies.js';
import * as elementHandler from './elementsHandler.js';

let resultRequest = {};

async function makeSearch() {
    let movieName = localStorage.getItem('termSearched');
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&page=1&include_adult=false&query=${movieName}`;

    let moviesList;
        
    try {
        const response = await fetch(searchUrl);
        if (response.ok) {
            const responseJson = await response.json();
            resultRequest = responseJson;

            moviesList = modifyImgUrl(resultRequest.results);
            registerMovies(moviesList, 'list-results');
        }
    } catch (error) {
        console.log(error.message);
        //I should fix the problem of not found results here
    }
}


makeSearch();