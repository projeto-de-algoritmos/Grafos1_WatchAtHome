let movieInfo = {};

async function renderMovieInfo() {
    let movie = await JSON.parse(localStorage.getItem('movieInfo'));

    let newUrl = `https://www.youtube.com/embed/${await movie.trailer_url}`;
    movie = {...movie, trailer_url: newUrl};

    movieInfo = {
        movie: [movie]
    }

    const source = document.getElementById('source').innerHTML;
    const template = Handlebars.compile(source);

    const compiledHTML = template(movieInfo);
    const target = document.getElementsByClassName('movie-info')[0];
    target.innerHTML = compiledHTML;
    favoriteBtnHandler();
}

function favoriteBtnHandler() {
    let favBtn = document.querySelector('div#favorite-btn');
    let isLogged = JSON.parse(localStorage.getItem('isLogged'));

    if (!isLogged)
    favBtn.classList.add('disable-container');

    favBtn.addEventListener('click', addMovieToGraph);
}

function addMovieToGraph(event) {
    event.preventDefault();

    //Adicionar implementação da adição do nó ao grafo
    //Criar lista com os filmes já adicionados ao grafo e armazenar isso como objeto
    //Verificar se, antes de adicionar, o filme já não está no grafo
    let {movie: [{title}]} = movieInfo;
    
}

renderMovieInfo();