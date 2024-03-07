export default class IndexView {
    constructor() {
        this.getArticle = (movie) => {
            return `<div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${movie.titlePosterImageModel.url}" alt="${movie.titleNameText}">
      <div class="card-body">
        <p class="card-text">${movie.titleNameText}</p>
      </div>
    </div>`;
        };
        this.sec = document.querySelector("#card-sec");
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
