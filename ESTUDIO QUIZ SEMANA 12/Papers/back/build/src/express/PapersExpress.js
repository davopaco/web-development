"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
class PapersExpress {
    papersView;
    errorView;
    app;
    constructor(papersView, errorView) {
        this.papersView = papersView;
        this.errorView = errorView;
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config = () => {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../../../../front/build")));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    };
    routes = () => {
        this.app.use("/", this.papersView.router);
        this.app.use("*", this.errorView.router);
    };
    start = () => {
        const PORT = process.env["PORT"] ?? 1802;
        const HOST = process.env["HOST"] ?? "localhost";
        this.app.listen(PORT, () => {
            console.log(`Server is running on ${HOST}:${PORT}`);
        });
    };
}
exports.default = PapersExpress;
