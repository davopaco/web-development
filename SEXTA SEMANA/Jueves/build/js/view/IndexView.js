var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* import { MovieInterfaceID } from "../model/types/MovieByIDInterface"; */
export default class IndexView {
    /* private readonly body: HTMLBodyElement;
    private readonly button: HTMLLinkElement; */
    constructor() {
        /* public async deployTrailer(
          movieByIDPromise: Promise<MovieInterfaceID>
        ): Promise<void> {
          //Espera a que se resuelva la promesa de la película por ID.
          return await movieByIDPromise
            .then((movieByID) => {
              //Añade al elemento body, el artículo del trailer de la película.
              this.body.innerHTML += this.getArticleTrailer(movieByID);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      
        //Función para remover el trailer de la película.
        public removeTrailer(): void {
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
        } */
        //Función para obtener el pedazo de documento HTML que representa a cada película.
        this.getArticle = (movie) => {
            //Retorna el pedazo de documento HTML que representa a cada película.
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
        //Asigna a las variables de la clase los elementos del DOM.
        this.sec = document.querySelector("#sec");
        /* this.body = document.body as HTMLBodyElement;
        this.button = document.querySelector("#button-search") as HTMLLinkElement; */
    }
    /* public getButton(): HTMLLinkElement {
      return this.button;
    } */
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
}
