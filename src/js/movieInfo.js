async function renderMovieInfo() {
    let movie = await JSON.parse(localStorage.getItem('movieInfo'));

    let newUrl = `https://www.youtube.com/embed/${await movie.trailer_url}`;
    movie = {...movie, trailer_url: newUrl};

    let movieInfo = {
        movie: [movie]
    }

    const source = document.getElementById('source').innerHTML;
    const template = Handlebars.compile(source);

    const compiledHTML = template(movieInfo);
    const target = document.getElementsByClassName('movie-info')[0];
    target.innerHTML = compiledHTML;
}

renderMovieInfo();