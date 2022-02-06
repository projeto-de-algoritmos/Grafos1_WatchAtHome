import RenderGraph from "./renderGraph";

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

async function addMovieToGraph(event) {
    event.preventDefault();

    //Adicionar implementação da adição do nó ao grafo
    //Criar lista com os filmes já adicionados ao grafo e armazenar isso como objeto
    //Verificar se, antes de adicionar, o filme já não está no grafo
    let {movie: [{title}]} = await movieInfo;


    const renderGraph = new RenderGraph();

    renderGraph.readGraph().then(async jsonGraph => {
        let username = JSON.parse(localStorage.getItem('user')).username;
        if (!Object.keys(jsonGraph).includes(title)) {
            jsonGraph[title] = [username];
            renderGraph.updateGraph(JSON.stringify(jsonGraph));
        } else if (Object.keys(jsonGraph).includes(title) && !jsonGraph[title].includes(username)) {
            jsonGraph[title].push(username);
            renderGraph.updateGraph(JSON.stringify(jsonGraph));
        }
    }).catch(onrejected => onrejected);

}

renderMovieInfo();