var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class IndexView {
    constructor() {
        this.pushArticlesPage = (papers) => __awaiter(this, void 0, void 0, function* () {
            return yield papers
                .then((papers) => {
                papers.forEach((paper) => {
                    this.articles.push(this.getArticle(paper));
                });
                this.setArticles(this.articles);
            })
                .catch((err) => {
                console.error(err);
            });
        });
        //Función para obtener el pedazo de documento HTML que representa a cada artículo.
        this.getArticle = (paper) => {
            var _a, _b;
            //Retorna el pedazo de documento HTML que representa a cada artículo.
            return `<div class="full-card"> <a
    href="${paper._url}">
    <div class="card">
      <div class="card-logo">
        <img src="./img/${paper._pt.split("@")[1]}.png" alt="${paper._pt.split("@")[1]}">
      </div>
      <div class="card-content">
        <h3 class = "searchh">${paper._title}</h3>
        <h5 class = "searchh"><strong>${paper._author}</strong></h5>
        <h5>${(_a = paper._journal) !== null && _a !== void 0 ? _a : "No journal"}</h5>
        <p class = "searchh">
          ${paper._abstract}
        </p>
        <h4>Keywords</h4>
        ${this.getKeywords(paper)}
        <div class="card-footer">
          <div class="card-footer-1"><span class="card-footer-full">${paper._pt.split("@")[1].charAt(0).toLocaleUpperCase() +
                paper._pt.split("@")[1].slice(1).toLocaleLowerCase()}</span></div>
          <div class="card-footer-2"><span class="card-footer-span"><span><svg
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-building-fill" viewBox="0 0 16 16">
                  <path
                    d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                </svg></span>&nbsp;${(_b = paper._publisher) !== null && _b !== void 0 ? _b : "No publisher"}&nbsp;&nbsp;&nbsp;<span><svg
                  xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                  class="bi bi-clock" viewBox="0 0 16 16">
                  <path
                    d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg></span>&nbsp;<span class="searchh">${paper._year}</span></span></div>
        </div>
      </div>
    </div>
  </a>
  </div>`;
        };
        this.getKeywords = (paper) => {
            const keywords = paper._keywords.split(",");
            let liString = "<ul>";
            keywords.forEach((keyword) => {
                liString += `<li class="keyword">${keyword}</li>`;
            });
            liString += "</ul>";
            return liString;
        };
        this.getPage = (page) => {
            return `<div class="pag anchor-pag numbers">
      <a>
        <span>${page}</span>
      </a>
    </div>`;
        };
        this.getPageDirection = (direction) => {
            let directionText = "";
            if (direction === "left") {
                directionText = `<div class="pag anchor-pag" id="left">
              <a href=""><span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                  </svg></span></a>
            </div>`;
            }
            else if (direction === "right") {
                directionText = `<div class="pag anchor-pag" id="right">
              <a href=""><span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                  </svg></span></a>
            </div>`;
            }
            return directionText;
        };
        this.filterByKeyword = (articles, parameter, filter, functionalities) => {
            const radio = document.getElementsByName("radio");
            let articlesArray = functionalities.filterByKeyword(articles, parameter, filter, radio);
            return articlesArray;
        };
        this.setArticles = (articles) => {
            this.articlesDynamic = articles;
        };
        //Asigna a las variables de la clase los elementos del DOM.
        this.sec = document.querySelector("#sec");
        this.articles = [];
        this.articlesDynamic = [];
        this.numberPages = 0;
    }
    deploy(papers, numberPapers, functionalities, btn, input, filter, currentPage = 1, articles = this.articles) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pushArticlesPage(papers);
            yield this.deployPag(articles, numberPapers);
            this.deployArticlePag(currentPage, articles);
            this.clickers(functionalities, numberPapers, btn, input, filter);
        });
    }
    clickers(functionalities, numberPapers, btn, input, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.buttonClicked(btn, input, filter, functionalities);
            this.anchorClicked(numberPapers);
        });
    }
    //Método para desplegar los artículos en la página.
    deployArticlePag(actualPag, articles) {
        //Se especifican el primero y el último artículo a desplegar.
        let firstNumber = actualPag * 10 - 10;
        let lastNumber = Math.min(actualPag * 10, articles.length);
        //Se despliegan los artículos en el innerHTML del Div padre.
        this.sec.innerHTML += articles.slice(firstNumber, lastNumber).join("");
    }
    destroyArticlePag() {
        const fullCard = document.querySelectorAll(".full-card");
        const pag0 = document.querySelector(".pag-0");
        fullCard.forEach((card) => {
            card.remove();
        });
        pag0.innerHTML = "";
        return Promise.resolve();
    }
    deployPag(articles, numberPapers, reset = false) {
        var _a;
        let pag = Math.ceil(articles.length / numberPapers);
        const pag0 = document.querySelector(".pag-0");
        this.numberPages = pag;
        pag0.innerHTML = "";
        if (reset) {
            localStorage.setItem("currentPage", "1");
        }
        const currentPage = parseInt((_a = localStorage.getItem("currentPage")) !== null && _a !== void 0 ? _a : "1");
        let firstNumber = 1;
        let lastNumber = 5;
        if ((currentPage - 1) % 5 === 0) {
            firstNumber = currentPage;
            lastNumber = currentPage + 4;
        }
        else {
            firstNumber = Math.floor((currentPage - 1) / 5) * 5 + 1;
            lastNumber = firstNumber + 4;
        }
        if (lastNumber > pag)
            lastNumber = pag;
        if (currentPage !== 1) {
            pag0.innerHTML += this.getPageDirection("left");
        }
        for (let i = firstNumber; i <= lastNumber; i++) {
            pag0.innerHTML += this.getPage(i);
        }
        if (currentPage !== pag) {
            pag0.innerHTML += this.getPageDirection("right");
        }
        return Promise.resolve();
    }
    buttonClicked(btn, input, filter, functionalities) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            this.searchBar("searchh", input, filter, "keyword", functionalities);
        });
    }
    anchorClicked(numberPapers) {
        const pag = document.querySelectorAll(".anchor-pag");
        pag.forEach((pag) => {
            if (pag) {
                pag.addEventListener("click", (e) => {
                    var _a, _b, _c, _d, _e;
                    e.preventDefault();
                    const pageText = (_c = (_b = (_a = pag.firstElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.textContent) !== null && _c !== void 0 ? _c : "";
                    let pageNumber = parseInt(pageText);
                    if (pageNumber === parseInt((_d = localStorage.getItem("currentPage")) !== null && _d !== void 0 ? _d : ""))
                        return;
                    if (isNaN(pageNumber)) {
                        const direction = pag.getAttribute("id");
                        const currentPage = parseInt((_e = localStorage.getItem("currentPage")) !== null && _e !== void 0 ? _e : "1");
                        if (direction === "left" && currentPage === 1)
                            return;
                        if (direction === "left") {
                            pageNumber = currentPage - 1;
                        }
                        else {
                            pageNumber = currentPage + 1;
                        }
                        if (pageNumber > this.numberPages)
                            return;
                    }
                    localStorage.setItem("currentPage", pageNumber.toString());
                    this.destroyArticlePag().then(() => __awaiter(this, void 0, void 0, function* () {
                        var _f;
                        yield this.deployPag(this.articlesDynamic, numberPapers);
                        this.deployArticlePag(parseInt((_f = localStorage.getItem("currentPage")) !== null && _f !== void 0 ? _f : ""), this.articlesDynamic);
                        this.anchorClicked(numberPapers);
                    }));
                });
            }
        });
    }
    searchBar(parameter, input, filter, parameter2, functionalities, numberPapers = 10) {
        let articlesArray = functionalities.searchBar(parameter, input, this.articles);
        articlesArray = this.filterByKeyword(articlesArray, parameter2, filter, functionalities);
        this.setArticles(articlesArray);
        this.numberPages = Math.ceil(articlesArray.length / numberPapers);
        this.destroyArticlePag().then(() => __awaiter(this, void 0, void 0, function* () {
            yield this.deployPag(articlesArray, numberPapers, true);
            this.deployArticlePag(1, articlesArray);
            this.anchorClicked(10);
        }));
    }
}
