import { Request, Response } from "express";
import ProductsModel from "../model/ProductsModel";
import SaveModel from "../model/SaveModel";
import { SaveInterface } from "../model/types/RequestInterface";

export default class ProductsView {
  constructor(
    private readonly productsModel: ProductsModel,
    private readonly saveModel: SaveModel
  ) {}

  index = async (_req: Request, res: Response): Promise<void> => {
    const page = _req.query.page as string;
    if (page === undefined) {
      return res.redirect("/?page=1");
    }
    const pageNumber = Number(page);
    const books = this.productsModel.findPage(pageNumber, "");
    books.then((books) => {
      books.forEach((book) => {
        if (book.publishedDate !== undefined) {
          book.dateString = new Date(book.publishedDate?.$date).toDateString();
        }
      });

      if (books.length > 0) {
        res.render("ProductsTemplate", {
          books,
          numberPages: this.productsModel.getNumberPagesRendered(pageNumber),
        });
      } else {
        //Si no, renderiza el ErrorTemplate con un mensaje
        res.render("ErrorTemplate", {
          message: "Books were not found. What a pity",
        });
      }
    });
  };

  save = async (req: Request, res: Response) => {
    const query = req.query.id as string;
    const body = req.body as SaveInterface;
    if (body === undefined || query === undefined) {
      res
        .status(500)
        .json({ error: "There was an error pushing the questions." });
    }
    const books = this.saveModel.save(body, query);
    res.status(200).json(books);
  };

  search = async (req: Request, res: Response): Promise<void> => {
    const input = req.query.input as string;
    const page = req.query.page as string;
    const pageNumber = Number(page);
    if (input === "") {
      return res.redirect("/");
    }
    const books = this.productsModel.findPage(pageNumber, input);
    books
      .then((books) => {
        if (books.length > 0) {
          res.render("ProductsTemplate", {
            books: books,
            numberPages: this.productsModel.getNumberPagesRendered(pageNumber),
          });
        } else {
          res.render("ErrorTemplate", {
            message: "Books were not found",
          });
        }
      })
      .catch((_error) => {
        res.render("ErrorTemplate", {
          message: "There was a problem with getting movies for the search",
        });
      });
  };

  order = async (req: Request, res: Response): Promise<void> => {
    let page = req.query.page as string;
    const order = req.query.order as string;
    if (page === undefined) {
      return res.redirect(`/order?order=${order}&page=1`);
    }
    if (order === undefined) {
      return res.redirect("/");
    }
    const pageNumber = Number(page);
    await this.productsModel.order(order);
    const books = this.productsModel.findPage(pageNumber, -1);
    books
      .then((books) => {
        if (books.length > 0) {
          res.render("ProductsTemplate", {
            books: books,
            numberPages: this.productsModel.getNumberPagesRendered(pageNumber),
          });
        } else {
          res.render("ErrorTemplate", {
            message: "Books were not found",
          });
        }
      })
      .catch((_error) => {
        res.render("ErrorTemplate", {
          message: "There was a problem with getting movies for the search",
        });
      });
  };
}
