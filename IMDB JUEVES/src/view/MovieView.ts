import { Request, Response } from "express";
import MovieModel from "../model/MovieModel";

export default class MovieView {
  constructor(private readonly movieModel: MovieModel) {}

  index = async (_req: Request, res: Response): Promise<void> => {
    const movies = this.movieModel.findAll();
    movies.then((movies) => {
      console.log(movies);
      if (movies.length > 0) {
        res.render("IndexTemplate", { movies: movies });
      } else {
        res.render("ErrorTemplate", {
          message: "<h1> Movies were not found. What a pity </h1>",
        });
      }
    });
  };
}
