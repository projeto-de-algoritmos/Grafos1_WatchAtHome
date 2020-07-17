const apiKey = 'ef18473cad0b168218935d1d9dfe7c17';

const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=`;
const seriesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR&page=`;
let movieTrailerUrl = `https://api.themoviedb.org/3/movie/`;

const renderRecommend = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.responseType = 'json';
        //Since your browser support native promises we can skip all
        //onreadystatechange tomfoolery(patetices) and use onload instead
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject('Something went wrong!');
            }
        }
        xhr.open('GET', `${url}${1}`);
        xhr.send();
    })
}

const renderPopular = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status === 200) 
                resolve(xhr.response);
            else
                reject('Something went wrong!');
        }
        xhr.open('GET', `${url}${2}`);
        xhr.send();
    })
}

const renderSeries = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status === 200)
                resolve(xhr.response);
            else
                reject('Something went wrong!');
        }
        xhr.open('GET', `${seriesUrl}${1}`);
        xhr.send();
    })
}

renderRecommend().then(onfulfilled => {
    let moviesList;
    moviesList = modifyImgUrl(onfulfilled.results);
    registerMovies(moviesList, 'list');
}).catch(onrejected => console.log(toastr.error(onrejected)));

renderPopular().then(onfulfilled => {
    let moviesList;
    moviesList = modifyImgUrl(onfulfilled.results);
    registerMovies(moviesList, 'list-popular');
}).catch(onrejected => console.log(toastr.error(onrejected)));

renderSeries().then(onfulfilled => {
    let moviesList;
    moviesList = modifyImgUrl(onfulfilled.results);
    registerMovies(moviesList, 'list-series');
}).catch(onrejected => console.log(onrejected));

const registerMovies = (moviesResults, idTarget='list') => {
    const source = document.getElementById('source').innerHTML;
    const template = Handlebars.compile(source);

    const compiledHTML = template(moviesResults);
    const target = document.getElementById(idTarget);
    target.innerHTML = compiledHTML;
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

export { apiKey, modifyImgUrl, registerMovies, requestMovieInfo };