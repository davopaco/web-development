import RetrieveMoviesPort from "../../domain/port/driven/RetrieveMoviesPort";
import Movie from "../../domain/model/movie/Movie";
import StarwarsAPI from "../../util/StarwarsAPI";
import Character from "../../domain/model/character/Character";
import NullCharacter from "../../domain/model/character/NullCharacter";
import AbstractPerson from "../../domain/model/person/AbstractPerson";
import StarwarsMovie from "../../domain/model/starwars/Movie";
import NullProducer from "../../domain/model/producer/Nullproducer";
import Producer from "../../domain/model/producer/Producer";
import NullMovie from "../../domain/model/movie/NullMovie";
import NullDirector from "../../domain/model/director/NullDirector";
import Director from "../../domain/model/director/Director";

export default class RetrieveMovies implements RetrieveMoviesPort {
  constructor(private readonly starwarsAPI: StarwarsAPI) {}

  public findAll = async (): Promise<Movie[]> => {
    const starwarsMovies = await this.starwarsAPI.fetchAllMovies();
    const movies = starwarsMovies.map(async (starwarsMovie): Promise<Movie> => {
      if (starwarsMovie === null || starwarsMovie === undefined) {
        return new NullMovie();
      }

      const characters = await this.getCharacters(starwarsMovie);
      const producers = await this.getProducers(starwarsMovie);
      const director = await this.getDirector(starwarsMovie);

      return new Movie(
        starwarsMovie.title,
        starwarsMovie.episode_id,
        starwarsMovie.opening_crawl,
        new Date(starwarsMovie.release_date),
        producers,
        director,
        characters as Character[]
      );
    });

    return await Promise.all(movies);
  };

  private getCharacters = async (
    starwarsMovie: StarwarsMovie
  ): Promise<AbstractPerson[]> => {
    const starwarsCharacters =
      await this.starwarsAPI.charactersFromMovies(starwarsMovie);
    console.log(starwarsCharacters);
    return starwarsCharacters.map((starwarsCharacter): AbstractPerson => {
      const { name, lastname } = this.splitNames(starwarsCharacter.name);
      if (this.isEmpty(lastname) && this.isEmpty(name)) {
        return new NullCharacter();
      }
      return new Character(name, lastname, starwarsCharacter.gender);
    });
  };

  private getProducers = async (
    starwarsMovie: StarwarsMovie
  ): Promise<AbstractPerson[]> => {
    const starwarsProducers = starwarsMovie.producer.split(", ");
    return starwarsProducers.map((starwarsProducer) => {
      const { name, lastname } = this.splitNames(starwarsProducer);
      if (this.isEmpty(lastname) && this.isEmpty(name)) {
        return new NullProducer();
      }
      return new Producer(name, lastname);
    });
  };

  private getDirector = async (
    starwarsMovie: StarwarsMovie
  ): Promise<AbstractPerson> => {
    const starwarsDirector = starwarsMovie.director;
    const { name, lastname } = this.splitNames(starwarsDirector);
    if (this.isEmpty(lastname) && this.isEmpty(name)) {
      return new NullDirector();
    }
    return new Director(name, lastname);
  };

  private isEmpty = (value: string): boolean => {
    if (value === null || value === undefined || value === "") {
      return true;
    }
    return false;
  };

  private splitNames = (
    starwarsNames: string
  ): { name: string; lastname: string } => {
    const names = starwarsNames.split(" ");
    const name = names[0];
    const lastname = names[1];
    return { name, lastname };
  };
}
