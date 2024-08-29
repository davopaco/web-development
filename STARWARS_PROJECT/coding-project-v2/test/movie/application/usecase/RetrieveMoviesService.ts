import Movie from "../../../../src/movie/domain/model/movie/Movie";
import RetrieveMoviesServicePort from "../../../../src/movie/domain/port/driver/RetrieveMovies/RetrieveMoviesServicePort";
import RetrieveMoviesUseCasePort from "../../../../src/movie/domain/port/driver/RetrieveMovies/RetrieveMoviesUseCasePort";

export default class RetrieveMoviesUseCase
  implements RetrieveMoviesUseCasePort
{
  constructor(private retrieveMoviesService: RetrieveMoviesServicePort) {}

  public static readonly getClassName = (): string => {
    return "RetrieveMoviesUseCase";
  };

  public getMovies = async (): Promise<Movie[]> => {
    return this.retrieveMoviesService.getMovies();
  };
}
