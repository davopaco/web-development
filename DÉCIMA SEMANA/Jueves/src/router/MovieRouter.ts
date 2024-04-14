import { Router } from "express";
import MovieView from "../view/MovieView";

export default class MoviesRouter {
  //Declara una variable privada router de tipo Router
  router: Router;

  constructor(private readonly movieView: MovieView) {
    //Inicializa la variable router con Router y llama a la función routes
    this.router = Router();
    this.routes();
  }

  routes = (): void => {
    //Configura la ruta de la aplicación
    this.router.get("/", this.movieView.index.bind(this.movieView.index));
  };
}
