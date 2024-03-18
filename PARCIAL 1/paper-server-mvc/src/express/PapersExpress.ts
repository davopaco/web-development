import express, { Application } from "express";

export default class PapersExpress {
  private readonly app: Application;

  constructor() {
    this.app = express();
  }

  start = (): void => {
    const PORT = process.env["PORT"] ?? 6012;
    const HOST = process.env["HOST"] ?? "localhost";
    this.app.listen(PORT, () => {
      console.log(`Server is running on ${HOST}:${PORT}`);
    });
  };
}
