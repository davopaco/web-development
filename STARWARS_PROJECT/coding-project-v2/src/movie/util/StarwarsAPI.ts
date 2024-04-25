import Character from "../domain/model/starwars/Character";
import Movie from "../domain/model/starwars/Movie";

export default class StarwarsAPI {
  private uriFilms = "https://swapi.dev/api/films/";

  public fetchAllMovies = async (): Promise<Movie[]> => {
    let movies: Movie[] = [];
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

  public charactersFromMovies = async (movie: Movie): Promise<Character[]> => {
    let characters: Character[] = [];
    movie.characters.forEach(async (character: string) => {
      const response = await fetch(character);
      const data = await response.json();
      characters.push({
        name: data.name,
        gender: data.gender,
      });
    });
    return characters;
  };
}
