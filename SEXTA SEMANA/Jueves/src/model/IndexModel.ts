import MovieInterface from "./MovieInterface";

export default class IndexModel {
  constructor() {
    console.log("IndexModel");
  }

  public getMovies(): Promise<MovieInterface[]> {}
}
