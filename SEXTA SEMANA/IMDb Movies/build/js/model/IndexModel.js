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
        this.btn = document.querySelector("#button-search");
        this.movieCell = document.querySelectorAll(".movie-cell");
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
                        "X-RapidAPI-Key": "fe6c493a88msh79537ea0cbb4496p19f87djsn627273478c2d", //add a 7
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
                        "X-RapidAPI-Key": "fe6c493a88msh79537ea0cbb4496p19f87djsn627273478c2d", //add 7
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
    getButton() {
        return this.btn;
    }
    getInput() {
        return this.input;
    }
    getMovieCell() {
        return this.movieCell;
    }
}
