"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const references_json_1 = __importDefault(require("../database/references.json"));
class PapersModel {
    constructor() { }
    getReferences = async () => {
        return references_json_1.default;
    };
    getReferencesById = async (id) => {
        return references_json_1.default.find((paper) => paper._id === id);
    };
}
exports.default = PapersModel;
