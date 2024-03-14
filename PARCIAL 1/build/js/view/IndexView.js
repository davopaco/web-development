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
        this.articles = [];
        this.pag = [];
        this.pushArticlesPage = (papers) => __awaiter(this, void 0, void 0, function* () {
            return yield papers
                .then((papers) => {
                papers.forEach((paper) => {
                    this.articles.push(this.getArticle(paper));
                });
            })
                .catch((err) => {
                console.error(err);
            });
        });
        //Función para obtener el pedazo de documento HTML que representa a cada película.
        this.getArticle = (paper) => {
            var _a, _b;
            //Retorna el pedazo de documento HTML que representa a cada película.
            return `<a
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
          <div class="card-footer-1"><span class="card-footer-full">${paper._pt
                .split("@")[1]
                .toLocaleLowerCase()}</span></div>
          <div class="card-footer-2"><span class="card-footer-span searchh"><span><svg
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
                </svg></span>&nbsp;${paper._year}</span></div>
        </div>
      </div>
    </div>
  </a>`;
        };
        this.getKeywords = (paper) => {
            const keywords = paper._keywords.split(",");
            let liString = "<ul>";
            keywords.forEach((keyword) => {
                liString += `<li>${keyword}</li>`;
            });
            liString += "</ul>";
            return liString;
        };
        this.getPage = (page) => {
            return `<div class="pag pagination">
      <a>
        <span>${page}</span>
      </a>
    </div>`;
        };
        //Asigna a las variables de la clase los elementos del DOM.
        this.sec = document.querySelector("#sec");
        this.pag0 = document.querySelector(".pag-0");
    }
    //Función para desplegar las películas en el index.
    deploy(papers, numberPapers) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deployPag(yield papers, numberPapers);
            this.pag = Array.from(document.querySelectorAll(".pagination"));
            this.anchorClicked(this.pag);
            yield this.pushArticlesPage(papers);
            this.deployArticlePag(1);
        });
    }
    deployArticlePag(actualPag) {
        let firstNumber = actualPag * 10 - 10;
        let lastNumber = actualPag * 10;
        for (let i = firstNumber; i < lastNumber; i++) {
            this.sec.innerHTML += this.articles[i];
        }
    }
    deployPag(papers, numberPapers) {
        let pag = Math.ceil(papers.length / numberPapers);
        if (pag > 5)
            pag = 5;
        for (let i = 0; i < pag; i++) {
            const pageNode = document
                .createRange()
                .createContextualFragment(this.getPage(i + 1));
            this.pag0.insertBefore(pageNode, this.pag0.children[i + 1]);
        }
        return Promise.resolve();
    }
    searchBar(parameter, input) {
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            var _a;
            const h3 = card.getElementsByClassName(parameter);
            let foundMatch = false;
            for (const element of h3) {
                const txtValue = (_a = element.innerText) !== null && _a !== void 0 ? _a : element.textContent;
                if (txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                    foundMatch = true;
                    break;
                }
            }
            if (foundMatch) {
                card.style.display = "";
            }
            else {
                card.style.display = "none";
            }
        });
    }
    buttonClicked(btn, input) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            this.searchBar("searchh", input);
        });
    }
    anchorClicked(pag) {
        pag.forEach((pag) => {
            if (pag) {
                pag.addEventListener("click", (e) => {
                    var _a, _b, _c;
                    e.preventDefault();
                    console.log(pag);
                    const pageText = (_c = (_b = (_a = pag.firstElementChild) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.textContent) !== null && _c !== void 0 ? _c : "";
                    const pageNumber = parseInt(pageText);
                    console.log(pageNumber);
                    this.deployArticlePag(pageNumber);
                });
            }
        });
    }
}