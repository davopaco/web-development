import ExpressRouter from "../../../../express/route/ExpressRouter";
import MovieController from "../controller/MovieController";
import { Router } from "express";

export default class MovieRouter implements ExpressRouter {
  path: string;
  version: string;
  router: Router;

  constructor(private readonly movieController: MovieController) {
    this.router = Router();
    this.path = "/movie";
    this.version = "/v1.0";
    this.path = `${this.version}${this.path}`;
    this.routes();
  }

  routes = (): void => {
    this.router.get(
      "/movies",
      this.movieController.getMovies.bind(this.movieController)
    );
  };
}
