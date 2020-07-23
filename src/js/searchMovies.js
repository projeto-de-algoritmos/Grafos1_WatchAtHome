import { apiKey, modifyImgUrl, registerMovies } from './renderMovies.js';
import * as elementHandler from './elementsHandler.js';

let gallery = document.querySelector('div.movies-gallery');
let resultsList = document.querySelector('div.movies-list');

let searchBoxMain = document.getElementById('search-box-main');
let searchBox = document.querySelector('input#search-box');

let arrowButtons = document.querySelector('div.buttons-results');

async function makeSearch(page = 1) {

    if (page.target)
        page = 1;

    let movieName = localStorage.getItem('termSearched');
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&page=${page}&include_adult=false&query=${movieName}`;

    try {
        const response = await fetch(searchUrl);
        if (response.ok) {
            const responseJson = await response.json();

            if (responseJson.results.length === 0) {
                gallery.style.display = 'flex';
                arrowButtons.style.display = 'none';

                resultsList.innerHTML = 
                    '<p id="feedback">Desculpe, não encontramos resultados para a sua busca!</p>';
                    searchBox.value = '';
                    searchBoxMain.value = '';
            } else {
                let total_pages = responseJson.total_pages;

                let moviesList = modifyImgUrl(responseJson.results);
                moviesList.list.total_pages = total_pages;
                registerMovies(moviesList, 'list-results');
                searchBox.value = '';
                searchBoxMain.value = '';

                let containerButtons = document.getElementById('number-pages');
                containerButtons.innerHTML = '';

                for (let i = 1; i <= moviesList.list.total_pages; i++) {
                    let element = document.createElement('li');
                    
                    if (i === page)
                        element.innerHTML += 
                            `<button onclick="changePage(${i})" disabled>${i}</button>`;
                    else
                        element.innerHTML += 
                            `<button onclick="changePage(${i})">${i}</button>`;

                    containerButtons.appendChild(element);
                }
            }
        }
    } catch (error) {
        console.log(error.message);
        //I should fix the problem of not found results here
    }
}

function changePage(page = 1) {
    makeSearch(page);
}

window.changePage = changePage;


makeSearch();