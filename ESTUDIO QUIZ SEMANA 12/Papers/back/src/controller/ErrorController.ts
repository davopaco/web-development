import { Request, Response } from "express";

export default class ErrorController {
  constructor() {}

  notFound = (_req: Request, res: Response): void => {
    res.status(404).json({ error: "Not found" });
  };
}
