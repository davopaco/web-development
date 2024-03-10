var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class IndexView {
    constructor() {
        this.getArticle = (movie) => {
            return `<div class="movie-cell">
        <a id="${movie.rank}")><img src="${movie.image}" alt="${movie.title}"></a>
        <div class="text">
          <h3>${movie.rank}. ${movie.title}</h3>
          <p>${movie.year}&emsp;${movie.genre != null ? movie.genre[0] : " "}</p>
          <p>⭐️&emsp;${movie.rating}</p>
        </div>
        <div class="description">
          <p>${movie.description}</p>
        </div>
      </div>`;
        };
        this.getArticleTrailer = (movieByID) => {
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
            <p>${movieByID.rank}&nbsp;|&nbsp;${movieByID.genre != null ? movieByID.genre[0] : " "}</p>
          </div>
        </div>
        <div class="movie-desc">
          <h1>Official Trailer</h1>
          <p>${movieByID.description}</p>
        </div>
      </div>
    </div>`;
        };
        this.sec = document.querySelector("#sec");
        this.body = document.body;
    }
    deploy(moviesPromise) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield moviesPromise
                .then((movies) => {
                movies.forEach((movie) => {
                    this.sec.innerHTML += this.getArticle(movie);
                });
            })
                .catch((err) => {
                console.error(err);
            });
        });
    }
    deployTrailer(movieByIDPromise) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield movieByIDPromise
                .then((movieByID) => {
                this.body.innerHTML += this.getArticleTrailer(movieByID);
            })
                .catch((err) => {
                console.error(err);
            });
        });
    }
    removeTrailer() {
        const overlay = document.getElementById("overlay");
        const movieTrailer = document.getElementById("movie-trailer");
        if (overlay) {
            overlay.remove();
        }
        if (movieTrailer) {
            movieTrailer.remove();
        }
    }
}
