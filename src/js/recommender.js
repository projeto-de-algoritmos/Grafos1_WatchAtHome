const apiKey = 'ef18473cad0b168218935d1d9dfe7c17';

let targetButton = document.querySelector('button#button-search-main');
let buttonSearch2nd = document.getElementById('button-search');
let searchBox = document.querySelector('input#search-box');
let searchBoxMain = document.getElementById('search-box-main');
let termSearched;

let arrowLeftResults = document.querySelector('div.buttons-results').firstElementChild;
let arrowRightResults = document.querySelector('div.buttons-results').lastElementChild;
let moviesResults = document.getElementsByClassName('results')[0];
let marginLeftResults = 0;

let lupa = document.querySelector('img#lupa-icon');

let gallery = document.querySelector('div.movies-gallery');
let resultsList = document.querySelector('div.movies-list');

let movieTrailerUrl = `https://api.themoviedb.org/3/movie/`;

function init() {
    lupa.addEventListener("click", openSearchBox);
    document.addEventListener("click", closeSearchBox);
    targetButton.addEventListener("click", recommendSimilar);
    buttonSearch2nd.addEventListener("click", recommendSimilar);
    arrowLeftResults.addEventListener("click", passToLeft);
    arrowRightResults.addEventListener("click", passToRight);

    gallery.style.display = 'none';
    searchBoxMain.placeholder = 'Digite o nome de um filme/série e recomendaremos semelhantes';
    searchBox.placeholder = 'Digite o nome de um filme/série e recomendaremos semelhantes';
}

function passToLeft() {
    if (marginLeftResults < 0) {
        marginLeftResults += 170;
        moviesResults.style.marginLeft = marginLeftResults + "px";
    }
}

function passToRight() {
    if (marginLeftResults > -2210) {
        marginLeftResults -= 170;
        moviesResults.style.marginLeft = marginLeftResults + "px";
    }
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

async function recommendSimilar() {
    
    termSearched = await (
        searchBoxMain.value === '' ? searchBox.value : searchBoxMain.value);
        localStorage.setItem('termSearched', termSearched);
        console.log(searchBoxMain.value);
        
    let movieId = await getMovieId();
    
    let url = `https://api.themoviedb.org/3/movie/${await movieId}/recommendations?api_key=${apiKey}&language=pt-BR&page=1`;

    try {
        const response = await fetch(url, { method: 'GET' });

        if (response.ok) {
            let responseJson = await response.json();
            console.log(responseJson);
            
            if (responseJson.results.length === 0) {
                console.log('ok');
                gallery.style.display = 'flex';
                resultsList.innerHTML = 
                    '<p id="feedback">Desculpe, não encontramos resultados para a sua busca!</p>';
            } else {
                let moviesList = modifyImgUrl(responseJson.results);
                registerMovies(moviesList);
            }

        }
    } catch (error) {
        console.log(toastr.error(error.message));
    }
}

async function getMovieId() {
    let movieName = localStorage.getItem('termSearched');
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&include_adult=false&query=${movieName}&page=`;

    let movieId;
        
    try {
        const response = await fetch(`${searchUrl}1`);
        if (response.ok) {
            const responseJson = await response.json();
            movieId = responseJson.results[0].id;
            return movieId;
        }
    } catch (error) {
        console.log(toastr.error(error.message));
        //I should fix the problem of not found results here
    }
}

const registerMovies = (moviesResults, idTarget='first-page') => {
    const source = document.getElementById('source').innerHTML;
    const template = Handlebars.compile(source);

    const compiledHTML = template(moviesResults);
    const target = document.getElementById(idTarget);
    target.innerHTML = compiledHTML;

    gallery.style.display = 'flex';
}

const modifyImgUrl = (moviesResults) => {
    const moviesList = {
        list: [],
    };

    //moviesResults should be an array of objects
    moviesResults.map(movie => {
        let newUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        let modifiedMovie = { ...movie, poster_path: newUrl }
        moviesList.list.push(modifiedMovie);
    })
    return moviesList;
}

const requestMovieInfo = (movieInfo) => {
    movieTrailerUrl += `${movieInfo.id}/videos?api_key=${apiKey}&language=en-US`;
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(movieTrailerUrl, {method: 'GET'});
            if (response.ok) {
                let trailers = await response.json();
                movieInfo.trailer_url = await trailers.results[0].key;
                resolve(movieInfo);
            }
        } catch (error) {
            reject(error);
        }
    })

}

function getMovieInfo(movieInfo) {

    requestMovieInfo(movieInfo).then(onfulfilled => {
        localStorage.setItem('movieInfo', JSON.stringify(onfulfilled));
        window.location = './movieInfo.html';
    }).catch(onrejected => console.log(onrejected));
}

Handlebars.registerHelper('json', function (context) {
    return JSON.stringify(context);
});

init();

window.getMovieInfo = getMovieInfo;