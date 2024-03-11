import { TitleResultsResult } from "../model/types/MovieInterface";

export default class IndexView {
  private readonly sec: HTMLDivElement;

  constructor() {
    this.sec = document.querySelector("#card-sec") as HTMLDivElement;
  }

  // Método que recibe una promesa con un array de objetos de tipo TitleResultsResult
  public deploy(moviesPromise: Promise<TitleResultsResult[]>): void {
    // Se resuelve la promesa
    moviesPromise
      .then((movies) => {
        // Se recorre el array de objetos de tipo TitleResultsResult
        movies.forEach((movie) => {
          // Se añade al DOM el artículo con la información de cada película
          this.sec.innerHTML += this.getArticle(movie);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Método que retorna un string con la información de una película
  getArticle = (movie: TitleResultsResult): string => {
    return `<div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${movie.titlePosterImageModel.url}" alt="${movie.titleNameText}">
      <div class="card-body">
        <p class="card-text">${movie.titleNameText}</p>
      </div>
    </div>`;
  };
}
