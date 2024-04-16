
import express, { Application } from 'express';
import ProductsConfig from '../config/ProductsConfig';
import ProductsRouter from '../router/ProductsRouter';
import ErrorRouter from '../router/ErrorRouter';
import path from 'path';
import morgan from 'morgan';

export default class ProductsExpress {

  private readonly app: Application;

  constructor(
    private readonly productsRouter: ProductsRouter, private readonly errorRouter: ErrorRouter
  ) {
    this.app = express();
    this.config();
    this.routes();
  }

  config = (): void => {
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../template'));
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('tiny'));
  };

  routes = (): void => {
    this.app.use('/', this.productsRouter.router);
    this.app.use('*', this.errorRouter.router);
  };

  start = (): void => {
    const PORT = ProductsConfig.PORT;
    const HOST = ProductsConfig.HOST;
    this.app.listen(PORT, () => {
      console.log(`Server is running on ${HOST}:${PORT}`);
    });
  };
}

