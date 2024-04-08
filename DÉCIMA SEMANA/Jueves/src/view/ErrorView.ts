import { Request, Response } from "express";

export default class ErrorView {
  index = async (_req: Request, res: Response): Promise<void> => {
    res.render("ErrorTemplate", {
      message: "Endpoint not found, bestie",
    });
  };
}
