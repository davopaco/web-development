import { Router } from "express";
import ErrorController from "../controller/ErrorController.js";

export default class ErrorView {
  router: Router;

  constructor(private readonly errorController: ErrorController) {
    this.router = Router();
    this.routes();
  }

  routes = (): void => {
    this.router.get(
      "/",
      this.errorController.notFound.bind(this.errorController)
    );
  };
}
