import express, { Application } from "express";
import MovieConfig from "../config/MovieConfig";
import MovieRouter from "../router/MovieRouter";
import path from "path";
import morgan from "morgan";
import ErrorRouter from "../router/ErrorRouter";

//Exporta una clase default de MovieExpress
export default class MovieExpress {
  //Declara una variable privada app de tipo Application
  private readonly app: Application;

  //Constructor que recibe dos parámetros: movieRouter y errorRouter
  constructor(
    private readonly movieRouter: MovieRouter,
    private readonly errorRouter: ErrorRouter
  ) {
    //Inicializa la variable app con express, configura la vista y las rutas
    this.app = express();
    this.config();
    this.routes();
  }

  config = (): void => {
    //Configura el engine de las vistas
    this.app.set("view engine", "ejs");

    //Configura la ruta de las vistas y los archivos estáticos
    this.app.set("views", path.join(__dirname, "../template"));
    this.app.use(express.static(path.join(__dirname, "../public")));

    //Configura el logger
    this.app.use(morgan("tiny"));
  };

  routes = (): void => {
    //Configura las rutas de la aplicación
    this.app.use("/", this.movieRouter.router);
    this.app.use("*", this.errorRouter.router);
  };

  start = (): void => {
    //Configura el puerto y el host del servidor
    const PORT = MovieConfig.PORT;
    const HOST = MovieConfig.HOST;
    this.app.listen(PORT, () => {
      console.log(`Server is running on ${HOST}:${PORT}`);
    });
  };
}
