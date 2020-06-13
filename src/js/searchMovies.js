import { apiKey, modifyImgUrl } from './renderMovies.js';
import * as elementHandler from './elementsHandler.js';

let resultRequest = {};

async function makeSearch() {
    let movieName = localStorage.getItem('termSearched');
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&page=1&include_adult=false&query=${movieName}`;
        
    try {
        const response = await fetch(searchUrl);
        if (response.ok) {
            const responseJson = await response.json();
            resultRequest = responseJson;

            modifyImgUrl(resultRequest.results);
        }
    } catch (error) {
        console.log(error.message);
    }
}

makeSearch();