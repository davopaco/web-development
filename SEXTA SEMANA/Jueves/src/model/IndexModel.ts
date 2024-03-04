import MovieInterface from "./types/MovieInterface";

export default class IndexModel {
  constructor() {
    console.log("IndexModel");
  }

  public async getMovies(): Promise<MovieInterface[]> {
    return await new Promise((resolve, reject) => {
      const response = fetch("https://imdb-top-100-movies.p.rapidapi.com/", {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "b788cc0a90mshb82dc764acf1b06p12481djsn2e181b7b63f2",
          "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
        },
      });
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
