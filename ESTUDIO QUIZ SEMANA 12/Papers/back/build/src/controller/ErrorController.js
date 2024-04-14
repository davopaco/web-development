"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorController {
    constructor() { }
    notFound = (_req, res) => {
        res.status(404).json({ error: "Not found" });
    };
}
exports.default = ErrorController;
