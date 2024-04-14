import { MovieInterface, ToSearchInterface } from "./types/MovieInterface.js";
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
        reject(new Error("No data found"));
      }
    });
  };

  search = async (input: string): Promise<MovieInterface[]> => {
    return await new Promise((resolve, reject) => {
      //Se crea un array de strings para guardar los artículos que cumplan con el criterio de búsqueda.
      if (data) {
        let moviesArray: MovieInterface[] = [];

        //Se itera sobre cada artículo.
        data.forEach((movie) => {
          //Booleano para saber si se encontró una coincidencia.
          let foundMatch = false;
          //Objeto con los atributos del artículo que se van a buscar.
          const toSearch: ToSearchInterface = {
            title: movie.title,
            description: movie.description,
            genre: movie.genre,
            year: movie.year.toString(),
          };

          //Se itera sobre los atributos del objeto toSearch para buscar coincidencias.
          Object.keys(toSearch).forEach((key) => {
            if (key === "genre") {
              toSearch[key].forEach((genre) => {
                if (genre.toUpperCase().indexOf(input.toUpperCase()) > -1) {
                  foundMatch = true;
                }
              });
            } else if (
              (toSearch[key] as string)
                .toUpperCase()
                .indexOf(input.toUpperCase()) > -1
            ) {
              foundMatch = true;
            }
          });

          //Si se encontró una coincidencia, se agrega el artículo al array de artículos.
          if (foundMatch) {
            moviesArray.push(movie);
          }
        });
        resolve(moviesArray);
      } else {
        reject(new Error("No data found"));
      }

      //Se retorna el array de artículos filtrado.
    });
  };
}
