import MovieInterface from "../model/types/MovieInterface";
import { MovieInterfaceID } from "../model/types/MovieByIDInterface";

export default class IndexView {
  private readonly sec: HTMLDivElement;
  private readonly body: HTMLBodyElement;

  constructor() {
    this.sec = document.querySelector("#sec") as HTMLDivElement;
    this.body = document.body as HTMLBodyElement;
  }

  public async deploy(moviesPromise: Promise<MovieInterface[]>): Promise<void> {
    return await moviesPromise
      .then((movies) => {
        movies.forEach((movie) => {
          this.sec.innerHTML += this.getArticle(movie);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public async deployTrailer(
    movieByIDPromise: Promise<MovieInterfaceID>
  ): Promise<void> {
    return await movieByIDPromise
      .then((movieByID) => {
        this.body.innerHTML += this.getArticleTrailer(movieByID);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public removeTrailer(): void {
    const overlay = document.getElementById("overlay");
    const movieTrailer = document.getElementById("movie-trailer");
    if (overlay) {
      overlay.remove();
    }

    if (movieTrailer) {
      movieTrailer.remove();
    }
  }

  getArticle = (movie: MovieInterface): string => {
    return `<div class="movie-cell">
        <a id="${movie.rank}")><img src="${movie.image}" alt="${
      movie.title
    }"></a>
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

  getArticleTrailer = (movieByID: MovieInterfaceID): string => {
    return `<div class="overlay" id="overlay"></div>
    <div class="movie-trailer" id="movie-trailer">
      <div class="video">
      <a>X&nbsp;Close</a>
        <iframe src="${movieByID.trailer_embed_link}?autoplay=1">
        </iframe>
      </div>
      <div class="movie-info">
        <div class="title">
          <img src="${movieByID.image}" alt="${movieByID.title}">
          <div class="classification">
            <h2>Movie Title</h2>
            <p>${movieByID.rank}&nbsp;|&nbsp;${
      movieByID.genre != null ? movieByID.genre[0] : " "
    }</p>
          </div>
        </div>
        <div class="movie-desc">
          <h1>Official Trailer</h1>
          <p>${movieByID.description}</p>
        </div>
      </div>
    </div>`;
  };
}
