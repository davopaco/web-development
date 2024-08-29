import express, { Application } from "express";
import morgan from "morgan";
import Config from "./config/config";
import ExpressRouter from "./route/ExpressRouter";

export default class Express {
  private readonly app: Application;
  private readonly env: Config;

  constructor(private readonly expressRouter: ExpressRouter[]) {
    this.app = express();
    this.config();
    this.routes();
    this.env = new Config();
  }

  public getApp = (): Application => {
    return this.app;
  };

  config = (): void => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("tiny"));
  };

  routes = (): void => {
    this.expressRouter.forEach((router) => {
      this.app.use(router.path, router.router);
    });
  };

  start = (): void => {
    const { HOST, PORT } = this.env;
    this.app.listen(PORT, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  };
}
