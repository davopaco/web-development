import { MovieStarwars, TitleResultsResult } from "./types/MovieInterface";

export default class IndexModel {
  constructor() {
    console.log("IndexModel");
  }

  public async getMovies(): Promise<TitleResultsResult[]> {
    return await new Promise((resolve, reject) => {
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
      response
        .then(async (data) => {
          const movieStarwars: Promise<MovieStarwars> = await data.json();
          resolve((await movieStarwars).titleResults.results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
