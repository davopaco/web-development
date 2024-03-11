import { MovieStarwars, TitleResultsResult } from "./types/MovieInterface";

export default class IndexModel {
  constructor() {
    console.log("IndexModel");
  }

  // Método que retorna una promesa con un array de objetos de tipo TitleResultsResult
  public async getMovies(): Promise<TitleResultsResult[]> {
    return await new Promise((resolve, reject) => {
      // Petición a la API de IMDB
      const response = fetch(
        "https://imdb146.p.rapidapi.com/v1/find/?query=starwars",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "b788cc0a90mshb82dc764acf1b06p12481djsn2e181b7b63f2",
            "X-RapidAPI-Host": "imdb146.p.rapidapi.com",
          },
        }
      );
      // Resolución de la promesa
      response
        .then((data) => {
          // Se crea un objeto de tipo MovieStarwars con la respuesta de la API
          data.json().then((movieStarwars: MovieStarwars) => {
            // Se retorna el array de objetos de tipo TitleResultsResult
            resolve(movieStarwars.titleResults.results);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
