import Movie from "../../../../src/movie/domain/model/movie/Movie";
import StarwarsCharacter from "../../../../src/movie/domain/model/starwars/Character";
import StarwarsMovie from "../../../../src/movie/domain/model/starwars/Movie";
import RetrieveMovies from "../../../../src/movie/infrastructure/repository/RetrieveMovies";
import StarwarsAPI from "../../../../src/movie/util/StarwarsAPI";
import { mock, Mock } from "ts-jest-mocker";
import Producer from "../../../../src/movie/domain/model/producer/Producer";
import Director from "../../../../src/movie/domain/model/director/Director";
import Character from "../../../../src/movie/domain/model/character/Character";
import NullDirector from "../../../../src/movie/domain/model/director/NullDirector";

describe("RetrieveMovies", () => {
  let mockStarwarsAPI: Mock<StarwarsAPI>;
  let retrieveMovies: RetrieveMovies;

  let starwarsMovies: StarwarsMovie[];
  let charactersMovie: StarwarsCharacter[];

  let movie: Movie;

  beforeEach(() => {
    mockStarwarsAPI = mock<StarwarsAPI>();
    retrieveMovies = new RetrieveMovies(mockStarwarsAPI);

    charactersMovie = [
      { name: "Luke Skywalker", gender: "male" },
      { name: "Leia Organa", gender: "female" },
    ];

    starwarsMovies = [
      {
        title: "A New Hope",
        episode_id: 4,
        opening_crawl: "It is a period of civil war...",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "1977-05-25",
        characters: ["Luke Skywalker", "Leia Organa"],
      },
    ];

    movie = new Movie(
      "A New Hope",
      4,
      "It is a period of civil war...",
      new Date("1977-05-25"),
      [new Producer("Gary", "Kurtz"), new Producer("Rick", "McCallum")],
      new Director("George", "Lucas"),
      [
        new Character("Luke", "Skywalker", "male"),
        new Character("Leia", "Organa", "female"),
      ]
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("findAll", () => {
    it("Should return a promise of all movies", async () => {
      mockStarwarsAPI.fetchAllMovies.mockResolvedValue(starwarsMovies);
      mockStarwarsAPI.charactersFromMovies.mockResolvedValue(charactersMovie);

      const data = await retrieveMovies.findAll();
      expect(data).toEqual([movie]);
    });

    it("Should Null Director", async () => {
      starwarsMovies[0].director = "";
      mockStarwarsAPI.fetchAllMovies.mockResolvedValue(starwarsMovies);
      mockStarwarsAPI.charactersFromMovies.mockResolvedValue(charactersMovie);

      movie = new Movie(
        "A New Hope",
        4,
        "It is a period of civil war...",
        new Date("1977-05-25"),
        [new Producer("Gary", "Kurtz"), new Producer("Rick", "McCallum")],
        new NullDirector(),
        [
          new Character("Luke", "Skywalker", "male"),
          new Character("Leia", "Organa", "female"),
        ]
      );

      const data = await retrieveMovies.findAll();
      expect(data).toEqual([movie]);
    });

    it("Should return a promise of all movies with empty characters", async () => {
      starwarsMovies[0].characters = [];
      mockStarwarsAPI.fetchAllMovies.mockResolvedValue(starwarsMovies);
      mockStarwarsAPI.charactersFromMovies.mockResolvedValue([]);

      movie = new Movie(
        "A New Hope",
        4,
        "It is a period of civil war...",
        new Date("1977-05-25"),
        [new Producer("Gary", "Kurtz"), new Producer("Rick", "McCallum")],
        new Director("George", "Lucas"),
        []
      );

      const data = await retrieveMovies.findAll();
      expect(data).toEqual([movie]);
    });
  });
});
