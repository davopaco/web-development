import { Router } from "express";
import ErrorView from "../view/ErrorView";

export default class ErrorRouter {
  //Declara una variable privada router de tipo Router
  router: Router;

  //Constructor que recibe un parámetro: errorView
  constructor(private readonly errorView: ErrorView) {
    //Inicializa la variable router con Router y llama a la función routes
    this.router = Router();
    this.routes();
  }

  routes = (): void => {
    //Configura la ruta de la aplicación
    this.router.get("/", this.errorView.index.bind(this.errorView.index));
  };
}
