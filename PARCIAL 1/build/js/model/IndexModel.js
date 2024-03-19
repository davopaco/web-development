var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Define la clase del modelo.
export default class IndexModel {
    constructor() {
        this.paperNumber = 10;
        this.input = document.querySelector("#search-bar");
        this.btn = document.querySelector("#search-btn");
        this.pag0 = document.querySelector(".pag-0");
        this.filter = document.querySelector("#inloc");
    }
    getPapers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                const response = fetch("http://localhost:1802/ref/references/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                response
                    .then((data) => {
                    data.json().then((data) => {
                        resolve(data.papers);
                    });
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
    getInput() {
        return this.input;
    }
    getBtn() {
        return this.btn;
    }
    getPaperNumber() {
        return this.paperNumber;
    }
    getPag0() {
        return this.pag0;
    }
    getFilter() {
        return this.filter;
    }
    setLocalStorage() {
        localStorage.setItem("currentPage", "1");
    }
}
