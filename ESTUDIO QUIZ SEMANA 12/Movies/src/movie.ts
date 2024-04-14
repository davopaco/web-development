import MovieExpress from "./express/express";
import MovieModel from "./model/MovieModel";
import MoviesRouter from "./router/MovieRouter";
import MovieView from "./view/MovieView";
import ErrorRouter from "./router/ErrorRouter";
import ErrorView from "./view/ErrorView";

//Crea una instancia de MovieExpress con MoviesRouter y ErrorRouter
const server = new MovieExpress(
  new MoviesRouter(new MovieView(new MovieModel())),
  new ErrorRouter(new ErrorView())
);

//Inicia el servidor
server.start();
