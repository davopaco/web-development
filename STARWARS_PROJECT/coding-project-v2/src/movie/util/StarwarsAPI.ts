import StarwarsCharacter from "../domain/model/starwars/Character";
import StarwarsMovie from "../domain/model/starwars/Movie";

export default class StarwarsAPI {
  private uriFilms = "https://swapi.dev/api/films/";

  public fetchAllMovies = async (): Promise<StarwarsMovie[]> => {
    let movies: StarwarsMovie[] = [];
    const response = await fetch(this.uriFilms);
    const data = await response.json();
    movies = data.results.map((movie: any) => {
      return {
        title: movie.title,
        episode_id: movie.episode_id,
        opening_crawl: movie.opening_crawl,
        director: movie.director,
        producer: movie.producer,
        release_date: movie.release_date,
        characters: movie.characters,
      };
    });
    return movies;
  };

  public async charactersFromMovies(
    movie: StarwarsMovie
  ): Promise<StarwarsCharacter[]> {
    const characters = movie.characters.map(
      async (character: string): Promise<StarwarsCharacter> => {
        const response = await fetch(character);
        const data = await response.json();
        return {
          name: data.name,
          gender: data.gender,
        };
      }
    );
    return await Promise.all(characters);
  }
}
