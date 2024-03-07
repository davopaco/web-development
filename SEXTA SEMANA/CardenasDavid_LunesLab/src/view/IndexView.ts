import MovieInterface from "../model/types/MovieInterface";

export default class IndexView {
  private readonly sec: HTMLDivElement;

  constructor() {
    this.sec = document.querySelector("#sec") as HTMLDivElement;
  }

  public deploy(moviesPromise: Promise<MovieInterface[]>): void {
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

  getArticle = (movie: MovieInterface): string => {
    return `<div class="movie-cell">
        <img src="${movie.image}" alt="${movie.title}">
        <div class="text">
          <h3>${movie.rank}. ${movie.title}</h3>
          <p>${movie.year}&emsp;${
      movie.genre != null ? movie.genre[0] : " "
    }</p>
          <p>⭐️&emsp;${movie.rating}</p>
        </div>
        <div class="description">
          <p>${movie.description}</p>
        </div>
      </div>`;
  };
}
