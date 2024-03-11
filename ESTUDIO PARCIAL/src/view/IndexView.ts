import MovieInterface from "../model/types/MovieInterface";

export default class IndexView {
  public deploy(data: Promise<MovieInterface>): void {
    data.then((data) => {
      console.log(data);
    });
  }
}
