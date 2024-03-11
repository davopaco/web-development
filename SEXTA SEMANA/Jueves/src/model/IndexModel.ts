import { MovieInterface } from "./types/MovieInterface";
import { MovieInterfaceID } from "./types/MovieByIDInterface";

// Define la clase del modelo.
export default class IndexModel {
  private readonly movieCell: HTMLDivElement[];
  private input: HTMLInputElement;
  private filter: string;

  constructor() {
    this.input = document.querySelector("#input-text") as HTMLInputElement;
    this.filter = this.input.value.toUpperCase();
    this.movieCell = document.querySelectorAll(
      ".movie-cell"
    ) as unknown as HTMLDivElement[];
    console.log("IndexModel");
  }

  public searchBar() {
    this.movieCell.forEach((movieCell) => {
      const h3 = movieCell.getElementsByTagName("h3");
      for (const element of h3) {
        const txtValue = element.textContent ?? element.innerText;
        if (txtValue.toUpperCase().indexOf(this.filter) > -1) {
          if (element.parentElement) {
            movieCell.style.display = "";
          }
        } else {
          movieCell.style.display = "none";
        }
      }
    });
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
            "254c36ce51mshdf25c95ac4c24abp1a78cfjsn10e84fd5b687", //add a 7
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
              "254c36ce51mshdf25c95ac4c24abp1a78cfjsn10e84fd5b687", //add 7
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
}
