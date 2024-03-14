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
        //Función para obtener el pedazo de documento HTML que representa a cada película.
        this.getArticle = (movie) => {
            //Retorna el pedazo de documento HTML que representa a cada película.
            return `<div class="movie-cell">
        <a id="${movie.rank}")><img src="${movie.image}" alt="${movie.title}"></a>
        <div class="text">
          <h3 class="searchh">${movie.rank}. ${movie.title}</h3>
          <p>${movie.year}&emsp;${movie.genre != null ? movie.genre[0] : " "}</p>
          <p>⭐️&emsp;${movie.rating}</p>
        </div>
        <div class="description">
          <p class="searchh">${movie.description}</p>
        </div>
      </div>`;
        };
        //Función para obtener el pedazo de documento HTML que representa el trailer de la película.
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
        //Asigna a las variables de la clase los elementos del DOM.
        this.sec = document.querySelector("#sec");
        this.body = document.body;
    }
    //Función para desplegar las películas en el index.
    deploy(moviesPromise) {
        return __awaiter(this, void 0, void 0, function* () {
            //Espera a que se resuelva la promesa de las películas.
            return yield moviesPromise
                .then((movies) => {
                //Recorre el array de películas y despliega cada una de ellas.
                movies.forEach((movie) => {
                    //Añade al elemento sec, el artículo de cada película.
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
            //Espera a que se resuelva la promesa de la película por ID.
            return yield movieByIDPromise
                .then((movieByID) => {
                //Añade al elemento body, el artículo del trailer de la película.
                this.body.innerHTML += this.getArticleTrailer(movieByID);
            })
                .catch((err) => {
                console.error(err);
            });
        });
    }
    //Función para remover el trailer de la película.
    removeTrailer() {
        //Selecciona el overlay y el movie-trailer del HTML.
        const overlay = document.getElementById("overlay");
        const movieTrailer = document.getElementById("movie-trailer");
        //Si existe el overlay, lo remueve.
        if (overlay) {
            overlay.remove();
        }
        //Si existe el movie-trailer, lo remueve.
        if (movieTrailer) {
            movieTrailer.remove();
        }
    }
    searchBar(parameter, input) {
        const cards = document.querySelectorAll(".movie-cell");
        cards.forEach((card) => {
            var _a;
            const h3 = card.getElementsByClassName(parameter);
            let foundMatch = false;
            for (const element of h3) {
                const txtValue = (_a = element.innerText) !== null && _a !== void 0 ? _a : element.textContent;
                if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                    foundMatch = true;
                    break;
                }
            }
            if (foundMatch) {
                card.style.display = "";
            }
            else {
                card.style.display = "none";
            }
        });
    }
    buttonClicked(btn, input) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            this.searchBar("searchh", input);
        });
    }
}
