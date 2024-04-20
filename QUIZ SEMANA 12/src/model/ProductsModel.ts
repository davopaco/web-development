import {
  NumberPagesRenderInterface,
  ProductsInterface,
  ToSearchInterface,
  WordSearchedInterface,
} from "./types/ProductsInterface";
import data from "../database/data.json";
import OrderModel from "./OrderModel";

export default class ProductsModel {
  private books: WordSearchedInterface;
  private booksArray: ProductsInterface[];

  constructor(private readonly orderModel: OrderModel) {
    this.books = { booksPage: [], searchWord: "" };
    this.booksArray = [];
    this.setData(data, "");
  }

  setData = async (
    books: ProductsInterface[],
    searchWord: string
  ): Promise<void> => {
    return await new Promise((resolve, reject) => {
      this.booksArray = [];
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
        this.booksArray = books;
        this.books.searchWord = searchWord;
        resolve();
      } else {
        reject(new Error("No data found"));
      }
    });
  };

  findPage = async (
    page: number,
    searchWord: string | number
  ): Promise<ProductsInterface[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (typeof searchWord === "string") {
          if (searchWord === "" && this.books.searchWord !== searchWord) {
            await this.setData(data, "");
          } else if (searchWord !== this.books.searchWord) {
            await this.search(searchWord);
          }
        }

        if (this.books.booksPage.length === 0) {
          resolve([]);
        }

        if (page > this.books.booksPage.length || page < 1) {
          resolve([]);
        }
        resolve(this.books.booksPage[page - 1].books);
      } catch (error) {
        reject(error);
      }
    });
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

  order = async (order: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        let ordered;
        switch (order) {
          case "category":
            ordered = await this.orderModel.orderByCategory(this.booksArray);
            await this.setData(ordered, this.books.searchWord);
            break;
          case "name":
            ordered = await this.orderModel.orderByName(this.booksArray);
            await this.setData(ordered, this.books.searchWord);
            break;
          case "author":
            ordered = await this.orderModel.orderByAuthor(this.booksArray);
            await this.setData(ordered, this.books.searchWord);
            break;
          default:
            await this.setData(data, "");
            break;
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
