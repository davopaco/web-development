"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PapersController {
    papersModel;
    constructor(papersModel) {
        this.papersModel = papersModel;
    }
    index = (_req, res) => {
        res.render("index.html");
    };
    getReferences = (_req, res) => {
        const references = this.papersModel.getReferences();
        references
            .then((papers) => {
            res.status(200).json(papers);
        })
            .catch((error) => {
            res.status(500).json({ error: error.message });
        });
    };
    getReferencesById = (req, res) => {
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
exports.default = PapersController;
