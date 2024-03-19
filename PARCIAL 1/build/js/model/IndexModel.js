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
    getFilter() {
        return this.filter;
    }
    searchingFunctionalities() {
        return {
            searchBar(parameter, input, articles) {
                const parser = new DOMParser();
                let articlesArray = [];
                articles.forEach((article) => {
                    var _a;
                    const articleHTML = parser.parseFromString(article, "text/html");
                    const foundElements = articleHTML.getElementsByClassName(parameter);
                    let foundMatch = false;
                    for (const element of foundElements) {
                        const txtValue = (_a = element.innerText) !== null && _a !== void 0 ? _a : element.textContent;
                        if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                            foundMatch = true;
                            break;
                        }
                    }
                    if (foundMatch) {
                        articlesArray.push(article);
                    }
                });
                return articlesArray;
            },
            filterByKeyword(articles, parameter, filter, radio) {
                const parser = new DOMParser();
                const articlesArray = [];
                const keywords = [];
                radio.forEach((radio) => {
                    var _a, _b;
                    if (radio.checked) {
                        keywords.push((_a = radio.nextElementSibling.innerText) !== null && _a !== void 0 ? _a : (_b = radio.nextElementSibling) === null || _b === void 0 ? void 0 : _b.textContent);
                    }
                });
                filter.value.split(", ").forEach((keyword) => {
                    if (keyword !== "")
                        keywords.push(keyword);
                });
                if (keywords.length === 0)
                    return articles;
                articles.forEach((article) => {
                    const articleHTML = parser.parseFromString(article, "text/html");
                    const foundElements = articleHTML.getElementsByClassName(parameter);
                    let matchQuantity = 0;
                    keywords.forEach((label) => {
                        var _a;
                        for (const element of foundElements) {
                            const txtValue = (_a = element.innerText) !== null && _a !== void 0 ? _a : element.textContent;
                            if (txtValue.toUpperCase().indexOf(label.toUpperCase()) > -1) {
                                matchQuantity++;
                                break;
                            }
                        }
                    });
                    if (matchQuantity === keywords.length) {
                        articlesArray.push(article);
                    }
                });
                return articlesArray;
            },
        };
    }
}
