import MovieExpress from "./express/express";
import MovieModel from "./model/MovieModel";
import MoviesRouter from "./router/MovieRouter";
import MovieView from "./view/MovieView";
import ErrorRouter from "./router/ErrorRouter";
import ErrorView from "./view/ErrorView";

const server = new MovieExpress(
  new MoviesRouter(new MovieView(new MovieModel())),
  new ErrorRouter(new ErrorView())
);

server.start();
