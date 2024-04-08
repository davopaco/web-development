import express, { Application } from "express";
import MovieConfig from "../config/MovieConfig";
import MovieRouter from "../router/MovieRouter";
import path from "path";
import morgan from "morgan";
import ErrorRouter from "../router/ErrorRouter";

export default class MovieExpress {
  private readonly app: Application;

  constructor(
    private readonly movieRouter: MovieRouter,
    private readonly errorRouter: ErrorRouter
  ) {
    this.app = express();
    this.config();
    this.routes();
  }

  config = (): void => {
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "../template"));
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(morgan("tiny"));
  };

  routes = (): void => {
    this.app.use("/", this.movieRouter.router);
    this.app.use("*", this.errorRouter.router);
  };

  start = (): void => {
    const PORT = MovieConfig.PORT;
    const HOST = MovieConfig.HOST;
    this.app.listen(PORT, () => {
      console.log(`Server is running on ${HOST}:${PORT}`);
    });
  };
}
