import { MovieInterface } from "./types/MovieInterface.js";
import data from "../data.json";

export default class MovieModel {
  //Función asincrónica que retorna un arreglo de películas.
  findAll = async (): Promise<MovieInterface[]> => {
    return await new Promise((resolve, reject) => {
      //Hace un fetch a la API de las películas.
      /* const response = fetch("https://imdb-top-100-movies.p.rapidapi.com/", {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fe6c493a88msh79537ea0cbb4496p19f87djsn627273478c2d",
          "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
        },
      });
      //Si la promesa se resuelve, resuelve la promesa de la función que es la interfaz de películas.
      response
        .then((data) => {
          resolve(data.json());
        })
        .catch((err) => {
          console.warn(err);
          reject(err);
        }); */
      // JSON testing
      if (data) {
        resolve(data);
      } else {
        reject("No data found");
      }
    });
  };
}
