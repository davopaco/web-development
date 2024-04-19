import {
  NumberPagesRenderInterface,
  ProductsInterface,
  ToSearchInterface,
  WordSearchedInterface,
} from "./types/ProductsInterface";
import data from "../database/data.json";

export default class ProductsModel {
  private books: WordSearchedInterface;

  constructor() {
    this.books = { booksPage: [], searchWord: "" };
    this.setData(data, "");
  }

  setData = async (
    books: ProductsInterface[],
    searchWord: string
  ): Promise<void> => {
    return await new Promise((resolve, reject) => {
      if (books) {
        this.books.booksPage = [];
        for (let i = 1; i <= this.getNumberPages(books); i++) {
          const initialLimit = i * 10 - 10;
          const finalLimit = i * 10;
          const booksArray: ProductsInterface[] = [];
          for (let j = initialLimit; j < finalLimit; j++) {
            if (books[j]) {
              booksArray.push(books[j]);
            }
          }
          this.books.booksPage.push({ numberPages: i, books: booksArray });
        }
        this.books.searchWord = searchWord;
        resolve();
      } else {
        reject(new Error("No data found"));
      }
    });
  };

  findPage = async (
    page: number,
    searchWord: string
  ): Promise<ProductsInterface[]> => {
    if (searchWord === "" && this.books.searchWord !== searchWord) {
      console.log("setting data");
      await this.setData(data, "");
    } else if (searchWord !== this.books.searchWord) {
      console.log("searching");
      await this.search(searchWord);
    }

    if (this.books.booksPage.length === 0) {
      return [];
    }

    if (page > this.books.booksPage.length || page < 1) {
      return [];
    }

    return this.books.booksPage[page - 1].books;
  };

  search = async (searchWord: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      //Se crea un array de strings para guardar los artículos que cumplan con el criterio de búsqueda.
      if (searchWord === "" || searchWord === undefined) {
        await this.setData(data, "");
        return resolve();
      }
      if (data) {
        let booksArray: ProductsInterface[] = [];
        //Se itera sobre cada artículo.
        data.forEach((book) => {
          //Booleano para saber si se encontró una coincidencia.
          let foundMatch = false;
          //Objeto con los atributos del artículo que se van a buscar.
          const toSearch: ToSearchInterface = {
            shortDescription: book.shortDescription,
            longDescription: book.longDescription,
          };

          //Se itera sobre los atributos del objeto toSearch para buscar coincidencias.
          Object.keys(toSearch).forEach((key) => {
            if (typeof toSearch[key] === "string") {
              if (
                (toSearch[key] as string)
                  .toUpperCase()
                  .indexOf(searchWord.toUpperCase()) > -1
              ) {
                foundMatch = true;
              }
            }
          });
          //Si se encontró una coincidencia, se agrega el artículo al array de artículos.
          if (foundMatch) {
            booksArray.push(book);
          }
        });
        await this.setData(booksArray, searchWord);
        resolve();
      } else {
        reject(new Error("No data found"));
      }

      //Se retorna el array de artículos filtrado.
    });
  };

  getNumberPages = (books: ProductsInterface[]): number => {
    return Math.ceil(books.length / 10);
  };

  getPages = (): number => {
    return this.books.booksPage.length;
  };

  getNumberPagesRendered = (pageNumber: number): NumberPagesRenderInterface => {
    const start = Math.ceil(pageNumber / 5) * 5 - 4;
    let end = Math.ceil(pageNumber / 5) * 5;
    if (end > this.getPages()) {
      end = this.getPages();
    }
    const numberPages = {
      start: start,
      end: end,
    };
    return numberPages;
  };
}
