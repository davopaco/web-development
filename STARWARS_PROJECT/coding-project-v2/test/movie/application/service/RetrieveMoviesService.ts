import Movie from "../../../../src/movie/domain/model/movie/Movie";
import RetrieveMoviesPort from "../../../../src/movie/domain/port/driven/RetrieveMoviesPort";
import RetrieveMoviesServicePort from "../../../../src/movie/domain/port/driver/RetrieveMovies/RetrieveMoviesServicePort";

export default class RetrieveMoviesService
  implements RetrieveMoviesServicePort
{
  constructor(private retrieveMovies: RetrieveMoviesPort) {}

  public static readonly getClassName = (): string => {
    return "RetrieveMoviesService";
  };

  public getMovies = async (): Promise<Movie[]> => {
    return this.retrieveMovies.findAll();
  };
}
