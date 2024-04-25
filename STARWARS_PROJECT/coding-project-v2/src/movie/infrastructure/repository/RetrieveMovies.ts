import RetrieveMoviesPort from "../../domain/port/driven/RetrieveMoviesPort";
import Movie from "../../domain/model/movie/Movie";

export default class RetrieveMovies implements RetrieveMoviesPort {
  public findAll: () => Movie[] = () => {
    return [];
  };
}
