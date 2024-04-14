import PapersModel from "../model/PapersModel.js";
import { Request, Response } from "express";

export default class PapersController {
  constructor(private readonly papersModel: PapersModel) {}

  index = (_req: Request, res: Response): void => {
    res.render("index.html");
  };

  getReferences = (_req: Request, res: Response): void => {
    const references = this.papersModel.getReferences();
    references
      .then((papers) => {
        res.status(200).json(papers);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };

  getReferencesById = (req: Request, res: Response): void => {
    const { id } = req.params;
    if (id === undefined) {
      res.status(400).json({ error: "Id is required" });
      return;
    }
    const references = this.papersModel.getReferencesById(id);
    references
      .then((papers) => {
        res.status(200).json(papers);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };
}
