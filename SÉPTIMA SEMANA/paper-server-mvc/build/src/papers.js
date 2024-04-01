"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PapersController_1 = __importDefault(require("./controller/PapersController"));
const PapersExpress_1 = __importDefault(require("./express/PapersExpress"));
const PapersModel_1 = __importDefault(require("./model/PapersModel"));
const ErrorController_1 = __importDefault(require("./controller/ErrorController"));
const PapersView_1 = __importDefault(require("./view/PapersView"));
const ErrorView_1 = __importDefault(require("./view/ErrorView"));
const server = new PapersExpress_1.default(new PapersView_1.default(new PapersController_1.default(new PapersModel_1.default())), new ErrorView_1.default(new ErrorController_1.default()));
server.start();
