import Movie from "../../../domain/model/Movie";
import RetrieveMoviesUseCasePort from "../../../domain/port/driver/RetrieveMovies/RetrieveMoviesUseCasePort";

export default class RetrieveMoviesUseCase
  implements RetrieveMoviesUseCasePort
{
  name: string;

  constructor() {
    this.name = "RetrieveMoviesUseCase";
  }

  public getMovies = async (): Promise<Movie[]> => {
    return [];
  };
}
