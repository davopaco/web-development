import { Router } from "express";
import ProductsView from "../view/ProductsView";

export default class ProductssRouter {
  router: Router;

  constructor(private readonly productsView: ProductsView) {
    this.router = Router();
    this.routes();
  }

  routes = (): void => {
    this.router.get("/", this.productsView.index.bind(this.productsView));
    this.router.post("/save", this.productsView.save.bind(this.productsView));
    this.router.get(
      "/search",
      this.productsView.search.bind(this.productsView)
    );
  };
}
