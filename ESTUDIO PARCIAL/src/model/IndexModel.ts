import MovieInterface from "./types/MovieInterface.js";

export default class IndexModel {
  public async getData(): Promise<MovieInterface> {
    return await new Promise((resolve, reject) => {
      const response = fetch("../data.json");
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
