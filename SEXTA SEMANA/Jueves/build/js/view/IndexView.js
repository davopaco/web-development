export default class IndexView {
    constructor() {
        this.getArticle = (movie) => {
            return `<div class="movie-cell">
        <img src="${movie.image}" alt="${movie.title}">
        <div class="text">
          <h3>1. ${movie.title}</h3>
          <p>${movie.year}&emsp;${movie.genre != null ? movie.genre[0] : " "}</p>
          <p>⭐️&emsp;${movie.rating}</p>
        </div>
        <div class="description">
          <p>${movie.description}</p>
        </div>
      </div>`;
        };
        this.sec = document.querySelector("#sec");
    }
    deploy(moviesPromise) {
        moviesPromise
            .then((movies) => {
            movies.forEach((movie) => {
                this.sec.innerHTML += this.getArticle(movie);
            });
        })
            .catch((err) => {
            console.error(err);
        });
    }
}
