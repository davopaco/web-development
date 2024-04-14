import PaperInterface from "./types/PaperInterface.js";
import references from "../database/references.json";

export default class PapersModel {
  constructor() {}

  getReferences = async (): Promise<PaperInterface[]> => {
    return references;
  };

  getReferencesById = async (
    id: string
  ): Promise<PaperInterface | undefined> => {
    return references.find((paper) => paper._id === id);
  };
}
