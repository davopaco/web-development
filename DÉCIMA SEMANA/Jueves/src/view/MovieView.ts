import { Request, Response } from "express";
import MovieModel from "../model/MovieModel";

export default class MovieView {
  //Declara una variable privada movieModel de tipo MovieModel
  constructor(private readonly movieModel: MovieModel) {}

  //Declara una función index que recibe dos parámetros: _req y res
  index = async (_req: Request, res: Response): Promise<void> => {
    //Declara una variable movies que almacena el resultado de la función findAll de movieModel
    const movies = this.movieModel.findAll();
    //Llama a la función then de movies que recibe un callback con un parámetro movies
    movies.then((movies) => {
      //Si el tamaño de movies es mayor a 0, renderiza el IndexTemplate con las películas
      if (movies.length > 0) {
        res.render("IndexTemplate", { movies });
      } else {
        //Si no, renderiza el ErrorTemplate con un mensaje
        res.render("ErrorTemplate", {
          message: "Movies were not found. What a pity",
        });
      }
    });
  };
}
