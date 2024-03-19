import { Papers } from "../model/types/ArticleInterface.js";
import searchingFunctionalitiesInterface from "../model/types/FunctionsInterface.js";

export default class IndexView {
  //Establece las variables de la clase por Div.
  private readonly sec: HTMLDivElement;
  private readonly articles: string[];
  private articlesDynamic: string[];
  private numberPages: number;
  private pag0: HTMLDivElement;

  constructor() {
    //Asigna a las variables de la clase los elementos del DOM.
    this.sec = document.querySelector("#sec") as HTMLDivElement;
    this.pag0 = document.querySelector(".pag-0") as HTMLDivElement;
    this.articles = [];
    this.articlesDynamic = [];
    this.numberPages = 0;
  }

  public async deploy(
    papers: Promise<Papers[]>,
    numberPapers: number,
    currentPage: number = 1,
    articles: string[] = this.articles
  ): Promise<void> {
    await this.pushArticlesPage(papers);
    await this.deployPag(articles, numberPapers);
    this.deployArticlePag(currentPage, articles);
  }

  //Método para desplegar los artículos en la página.
  public deployArticlePag(actualPag: number, articles: string[]): void {
    //Se especifican el primero y el último artículo a desplegar.
    let firstNumber = actualPag * 10 - 10;
    let lastNumber = Math.min(actualPag * 10, articles.length);

    //Se despliegan los artículos en el innerHTML del Div padre.
    this.sec.innerHTML += articles.slice(firstNumber, lastNumber).join("");
  }

  public destroyArticlePag(): Promise<void> {
    const fullCard = document.querySelectorAll(".full-card");
    fullCard.forEach((card) => {
      card.remove();
    });
    this.pag0.innerHTML = "";
    return Promise.resolve();
  }

  pushArticlesPage = async (papers: Promise<Papers[]>) => {
    return await papers
      .then((papers) => {
        papers.forEach((paper) => {
          this.articles.push(this.getArticle(paper));
        });
        this.setArticles(this.articles);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  deployPag(
    articles: string[],
    numberPapers: number,
    reset = false
  ): Promise<void> {
    let pag = Math.ceil(articles.length / numberPapers);
    const pag0 = document.querySelector(".pag-0") as HTMLDivElement;

    this.numberPages = pag;
    pag0.innerHTML = "";

    if (reset) {
      localStorage.setItem("currentPage", "1");
    }

    const currentPage = parseInt(localStorage.getItem("currentPage") ?? "1");
    let firstNumber = 1;
    let lastNumber = 5;

    if ((currentPage - 1) % 5 === 0) {
      firstNumber = currentPage;
      lastNumber = currentPage + 4;
    } else {
      firstNumber = Math.floor((currentPage - 1) / 5) * 5 + 1;
      lastNumber = firstNumber + 4;
    }
    if (lastNumber > pag) lastNumber = pag;

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

  //Función para obtener el pedazo de documento HTML que representa a cada artículo.
  getArticle = (paper: Papers): string => {
    //Retorna el pedazo de documento HTML que representa a cada artículo.
    return `<div class="full-card"> <a
    href="${paper._url}">
    <div class="card">
      <div class="card-logo">
        <img src="./img/${paper._pt.split("@")[1]}.png" alt="${
      paper._pt.split("@")[1]
    }">
      </div>
      <div class="card-content">
        <h3 class = "searchh">${paper._title}</h3>
        <h5 class = "searchh"><strong>${paper._author}</strong></h5>
        <h5>${paper._journal ?? "No journal"}</h5>
        <p class = "searchh">
          ${paper._abstract}
        </p>
        <h4>Keywords</h4>
        ${this.getKeywords(paper)}
        <div class="card-footer">
          <div class="card-footer-1"><span class="card-footer-full">${
            paper._pt.split("@")[1].charAt(0).toLocaleUpperCase() +
            paper._pt.split("@")[1].slice(1).toLocaleLowerCase()
          }</span></div>
          <div class="card-footer-2"><span class="card-footer-span searchh"><span><svg
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-building-fill" viewBox="0 0 16 16">
                  <path
                    d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                </svg></span>&nbsp;${
                  paper._publisher ?? "No publisher"
                }&nbsp;&nbsp;&nbsp;<span><svg
                  xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor"
                  class="bi bi-clock" viewBox="0 0 16 16">
                  <path
                    d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg></span>&nbsp;${paper._year}</span></div>
        </div>
      </div>
    </div>
  </a>
  </div>`;
  };

  getKeywords = (paper: Papers): string => {
    const keywords = paper._keywords.split(",");
    let liString: string = "<ul>";
    keywords.forEach((keyword) => {
      liString += `<li class="keyword">${keyword}</li>`;
    });
    liString += "</ul>";
    return liString;
  };

  getPage = (page: number): string => {
    return `<div class="pag anchor-pag numbers">
      <a>
        <span>${page}</span>
      </a>
    </div>`;
  };

  getPageDirection = (direction: string): string => {
    let directionText = "";
    if (direction === "left") {
      directionText = `<div class="pag anchor-pag" id="left">
              <a href=""><span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                  </svg></span></a>
            </div>`;
    } else if (direction === "right") {
      directionText = `<div class="pag anchor-pag" id="right">
              <a href=""><span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                  </svg></span></a>
            </div>`;
    }
    return directionText;
  };

  public buttonClicked(
    btn: HTMLInputElement,
    input: HTMLInputElement,
    filter: HTMLInputElement,
    functionalities: searchingFunctionalitiesInterface
  ) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.searchBar("searchh", input, filter, "keyword", functionalities);
    });
  }

  anchorClicked(numberPapers: number) {
    const pag = document.querySelectorAll(".anchor-pag");
    pag.forEach((pag) => {
      if (pag) {
        pag.addEventListener("click", (e) => {
          e.preventDefault();
          const pageText =
            pag.firstElementChild?.firstElementChild?.textContent ?? "";
          let pageNumber = parseInt(pageText);
          if (
            pageNumber === parseInt(localStorage.getItem("currentPage") ?? "")
          )
            return;
          if (isNaN(pageNumber)) {
            const direction = pag.getAttribute("id");
            const currentPage = parseInt(
              localStorage.getItem("currentPage") ?? "1"
            );
            if (direction === "left" && currentPage === 1) return;
            if (direction === "left") {
              pageNumber = currentPage - 1;
            } else {
              pageNumber = currentPage + 1;
            }
            if (pageNumber > this.numberPages) return;
          }
          localStorage.setItem("currentPage", pageNumber.toString());
          this.destroyArticlePag().then(async () => {
            await this.deployPag(this.articlesDynamic, numberPapers);
            this.deployArticlePag(
              parseInt(localStorage.getItem("currentPage") ?? ""),
              this.articlesDynamic
            );
            this.anchorClicked(numberPapers);
          });
        });
      }
    });
  }

  searchBar(
    parameter: string,
    input: HTMLInputElement,
    filter: HTMLInputElement,
    parameter2: string,
    functionalities: searchingFunctionalitiesInterface,
    numberPapers: number = 10
  ) {
    let articlesArray = functionalities.searchBar(
      parameter,
      input,
      this.articles
    );
    articlesArray = this.filterByKeyword(
      articlesArray,
      parameter2,
      filter,
      functionalities
    );
    this.setArticles(articlesArray);
    this.numberPages = Math.ceil(articlesArray.length / numberPapers);

    this.destroyArticlePag().then(async () => {
      await this.deployPag(articlesArray, numberPapers, true);
      this.deployArticlePag(1, articlesArray);
      this.anchorClicked(10);
    });
  }

  filterByKeyword = (
    articles: string[],
    parameter: string,
    filter: HTMLInputElement,
    functionalities: searchingFunctionalitiesInterface
  ) => {
    const radio = document.getElementsByName(
      "radio"
    ) as NodeListOf<HTMLInputElement>;

    let articlesArray = functionalities.filterByKeyword(
      articles,
      parameter,
      filter,
      radio
    );

    return articlesArray;
  };

  setArticles = (articles: string[]) => {
    this.articlesDynamic = articles;
  };
}
