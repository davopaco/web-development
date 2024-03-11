var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Define la clase del modelo.
export default class IndexModel {
    constructor() {
        this.input = document.querySelector("#input-text");
        this.filter = this.input.value.toUpperCase();
        this.movieCell = document.querySelectorAll(".movie-cell");
        console.log("IndexModel");
    }
    searchBar() {
        this.movieCell.forEach((movieCell) => {
            var _a;
            const h3 = movieCell.getElementsByTagName("h3");
            for (const element of h3) {
                const txtValue = (_a = element.textContent) !== null && _a !== void 0 ? _a : element.innerText;
                if (txtValue.toUpperCase().indexOf(this.filter) > -1) {
                    if (element.parentElement) {
                        movieCell.style.display = "";
                    }
                }
                else {
                    movieCell.style.display = "none";
                }
            }
        });
    }
    //Función para obtener las películas.
    getMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            //Retorna una promesa que resuelve un fetch a la API de las películas.
            return yield new Promise((resolve, reject) => {
                //Hace un fetch a la API de las películas.
                const response = fetch("https://imdb-top-100-movies.p.rapidapi.com/", {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "254c36ce51mshdf25c95ac4c24abp1a78cfjsn10e84fd5b687", //add a 7
                        "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
                    },
                });
                //Si la promesa se resuelve, resuelve la promesa de la función que es la interfaz de películas.
                response
                    .then((data) => {
                    resolve(data.json());
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
    //Función para obtener el trailer de la película.
    getTrailer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Retorna una promesa que resuelve un fetch a la API del trailer de la película.
            return yield new Promise((resolve, reject) => {
                const response = fetch(`https://imdb-top-100-movies.p.rapidapi.com/top${id}`, {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "254c36ce51mshdf25c95ac4c24abp1a78cfjsn10e84fd5b687", //add 7
                        "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
                    },
                });
                //Si la promesa se resuelve, resuelve la promesa de la función que es la interfaz de película por ID.
                response
                    .then((data) => {
                    resolve(data.json());
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
}
