import MovieExpress from "./express/express";
import MovieModel from "./model/MovieModel";
import MoviesRouter from "./router/MovieRouter";
import MovieView from "./view/MovieView";

const server = new MovieExpress(
  new MoviesRouter(new MovieView(new MovieModel()))
);

server.start();
