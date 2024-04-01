"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ErrorView {
    errorController;
    router;
    constructor(errorController) {
        this.errorController = errorController;
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes = () => {
        this.router.get("/", this.errorController.notFound.bind(this.errorController));
    };
}
exports.default = ErrorView;
