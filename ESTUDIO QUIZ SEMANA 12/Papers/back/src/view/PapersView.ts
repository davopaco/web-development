import { Router } from "express";
import PapersController from "../controller/PapersController.js";

export default class PapersView {
  router: Router;

  constructor(private readonly papersController: PapersController) {
    this.router = Router();
    this.routes();
  }

  routes = (): void => {
    this.router.get(
      "/",
      this.papersController.index.bind(this.papersController)
    );
    this.router.get(
      "/ref/references",
      this.papersController.getReferences.bind(this.papersController)
    );
    this.router.get(
      "/ref/references/:id",
      this.papersController.getReferencesById.bind(this.papersController)
    );
  };
}
