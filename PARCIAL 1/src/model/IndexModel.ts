import { Articles, Papers } from "./types/ArticleInterface.js";
import searchingFunctionalitiesInterface from "./types/FunctionsInterface.js";

// Define la clase del modelo.
export default class IndexModel {
  private readonly input: HTMLInputElement;
  private readonly btn: HTMLInputElement;
  private readonly paperNumber: number = 10;
  private readonly filter: HTMLInputElement;

  constructor() {
    this.input = document.querySelector("#search-bar") as HTMLInputElement;
    this.btn = document.querySelector("#search-btn") as HTMLInputElement;
    this.filter = document.querySelector("#inloc") as HTMLInputElement;
  }

  async getPapers(): Promise<Papers[]> {
    return await new Promise((resolve, reject) => {
      const response = fetch("http://localhost:1802/ref/references/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response
        .then((data) => {
          data.json().then((data: Articles) => {
            resolve(data.papers);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getInput() {
    return this.input;
  }

  public getBtn() {
    return this.btn;
  }

  public getPaperNumber() {
    return this.paperNumber;
  }

  public getFilter() {
    return this.filter;
  }

  public searchingFunctionalities(): searchingFunctionalitiesInterface {
    return {
      searchBar(
        parameter: string,
        input: HTMLInputElement,
        articles: string[]
      ) {
        const parser = new DOMParser();
        let articlesArray: string[] = [];
        articles.forEach((article) => {
          const articleHTML = parser.parseFromString(article, "text/html");
          const foundElements = articleHTML.getElementsByClassName(parameter);
          let foundMatch = false;
          for (const element of foundElements) {
            const txtValue =
              (element as HTMLElement).innerText ?? element.textContent;
            if (
              txtValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1
            ) {
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

      filterByKeyword(
        articles: string[],
        parameter: string,
        filter: HTMLInputElement,
        radio: NodeListOf<HTMLInputElement>
      ) {
        const parser = new DOMParser();
        const articlesArray: string[] = [];
        const keywords: string[] = [];

        radio.forEach((radio) => {
          if (radio.checked) {
            keywords.push(
              (radio.nextElementSibling as HTMLElement).innerText ??
                radio.nextElementSibling?.textContent
            );
          }
        });

        filter.value.split(", ").forEach((keyword) => {
          if (keyword !== "") keywords.push(keyword);
        });

        if (keywords.length === 0) return articles;

        articles.forEach((article) => {
          const articleHTML = parser.parseFromString(article, "text/html");
          const foundElements = articleHTML.getElementsByClassName(parameter);
          let matchQuantity = 0;
          keywords.forEach((label) => {
            for (const element of foundElements) {
              const txtValue =
                (element as HTMLElement).innerText ?? element.textContent;
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
