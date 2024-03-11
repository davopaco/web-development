"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const references_json_1 = __importDefault(require("./database/references.json"));
class Papers {
    #app;
    constructor() {
        this.#app = (0, express_1.default)();
        this.#app.use(express_1.default.json());
        this.#app.use(express_1.default.urlencoded({ extended: true }));
        this.#app.use((0, morgan_1.default)('tiny'));
        this.#app.use((0, helmet_1.default)());
        this.#app.use('/ref/references', (_, res) => {
            res.status(200).json({ papers: this.getReferences() });
        });
        this.#app.use('/ref/reference/:id', (req, res) => {
            const { id } = req.params;
            let successful = false;
            this.getReferences().filter((ref) => {
                if (ref._id === id) {
                    successful = true;
                    res.status(200).json({ paper: ref });
                }
            });
            if (successful === false) {
                res.status(404).json({ message: 'Not Found' });
            }
        });
        this.#app.use('*', (_, res) => {
            res.status(404).json({ message: 'Not Found' });
        });
    }
    getReferences = () => {
        return references_json_1.default.map((ref) => {
            return { ...ref };
        });
    };
    start = () => {
        this.#app.listen(1802, () => {
            console.info(`SERVER: started.`);
        });
    };
}
const papers = new Papers();
papers.start();
