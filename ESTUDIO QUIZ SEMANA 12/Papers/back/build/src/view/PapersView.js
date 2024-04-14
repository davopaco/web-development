"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class PapersView {
    papersController;
    router;
    constructor(papersController) {
        this.papersController = papersController;
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes = () => {
        this.router.get("/", this.papersController.index.bind(this.papersController));
        this.router.get("/ref/references", this.papersController.getReferences.bind(this.papersController));
        this.router.get("/ref/references/:id", this.papersController.getReferencesById.bind(this.papersController));
    };
}
exports.default = PapersView;
