import MovieInterface from "./types/MovieInterface";
import { MovieInterfaceID } from "./types/MovieByIDInterface";

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
            "254c36ce51mshdf25c95ac4c24abp1a78cfjsn10e84fd5b687", //add a 7
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

  public async getTrailer(id: number): Promise<MovieInterfaceID> {
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
