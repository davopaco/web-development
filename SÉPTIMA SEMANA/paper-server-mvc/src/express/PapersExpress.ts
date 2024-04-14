import express, { Application } from "express";
import PapersView from "../view/PapersView.js";
import ErrorView from "../view/ErrorView.js";
import cors from "cors";

export default class PapersExpress {
  private readonly app: Application;

  constructor(
    private readonly papersView: PapersView,
    private readonly errorView: ErrorView
  ) {
    this.app = express();
    this.config();
    this.routes();
  }

  config = (): void => {
    this.app.use(express.json());
    this.app.use(cors());
  };

  routes = (): void => {
    this.app.use("/", this.papersView.router);
    this.app.use("*", this.errorView.router);
  };

  start = (): void => {
    const PORT = process.env["PORT"] ?? 6012;
    const HOST = process.env["HOST"] ?? "localhost";
    this.app.listen(PORT, () => {
      console.log(`Server is running on ${HOST}:${PORT}`);
    });
  };
}
