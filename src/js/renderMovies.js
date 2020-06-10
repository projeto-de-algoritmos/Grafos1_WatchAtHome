const apiKey = 'ef18473cad0b168218935d1d9dfe7c17';
const moviesList = {
    list: [],
};
let page = 1;
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${page}`;

const renderMovie = () => {
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
        xhr.open('GET', url);
        xhr.send();
    })
}

renderMovie().then(onfulfilled => {
    onfulfilled.results.map(movie => {
        let newUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        let overMovie = { ...movie, poster_path: newUrl }
        moviesList.list.push(overMovie);
        registerMovies();
    })
})
.catch(onrejected => alert(onrejected));
console.log(moviesList.list);

const registerMovies = () => {
    const source = document.getElementById('source').innerHTML;
    const template = Handlebars.compile(source);

    const compiledHTML = template(moviesList);
    const target = document.getElementById('list');
    target.innerHTML = compiledHTML;
}