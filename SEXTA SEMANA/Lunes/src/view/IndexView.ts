import { TitleResultsResult } from "../model/types/MovieInterface";

export default class IndexView {
  private readonly sec: HTMLDivElement;

  constructor() {
    this.sec = document.querySelector("#card-sec") as HTMLDivElement;
  }

  public deploy(moviesPromise: Promise<TitleResultsResult[]>): void {
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

  getArticle = (movie: TitleResultsResult): string => {
    return `<div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${movie.titlePosterImageModel.url}" alt="${movie.titleNameText}">
      <div class="card-body">
        <p class="card-text">${movie.titleNameText}</p>
      </div>
    </div>`;
  };
}
