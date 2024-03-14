import { MovieInterface } from "./types/MovieInterface";
import { MovieInterfaceID } from "./types/MovieByIDInterface";

// Define la clase del modelo.
export default class IndexModel {
  private readonly movieCell: HTMLDivElement[];
  private input: HTMLInputElement;
  private btn: HTMLAnchorElement;

  constructor() {
    this.input = document.querySelector("#input-text") as HTMLInputElement;
    this.btn = document.querySelector("#button-search") as HTMLAnchorElement;
    this.movieCell = document.querySelectorAll(
      ".movie-cell"
    ) as unknown as HTMLDivElement[];
  }

  //Función para obtener las películas.
  public async getMovies(): Promise<MovieInterface[]> {
    //Retorna una promesa que resuelve un fetch a la API de las películas.
    return await new Promise((resolve, reject) => {
      //Hace un fetch a la API de las películas.
      const response = fetch("https://imdb-top-100-movies.p.rapidapi.com/", {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fe6c493a88msh79537ea0cbb4496p19f87djsn627273478c2d", //add a 7
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
  }

  //Función para obtener el trailer de la película.
  public async getTrailer(id: number): Promise<MovieInterfaceID> {
    //Retorna una promesa que resuelve un fetch a la API del trailer de la película.
    return await new Promise((resolve, reject) => {
      const response = fetch(
        `https://imdb-top-100-movies.p.rapidapi.com/top${id}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "fe6c493a88msh79537ea0cbb4496p19f87djsn627273478c2d", //add 7
            "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
          },
        }
      );
      //Si la promesa se resuelve, resuelve la promesa de la función que es la interfaz de película por ID.
      response
        .then((data) => {
          resolve(data.json());
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getButton() {
    return this.btn;
  }

  public getInput() {
    return this.input;
  }

  public getMovieCell() {
    return this.movieCell;
  }
}
