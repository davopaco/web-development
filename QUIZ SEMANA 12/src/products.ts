
import ProductsExpress from './express/express';
import ProductsModel from './model/ProductsModel';
import ProductsRouter from './router/ProductsRouter';
import ProductsView from './view/ProductsView';
import ErrorRouter from './router/ErrorRouter';
import ErrorView from './view/ErrorView';

const server = new ProductsExpress(
  new ProductsRouter(new ProductsView(new ProductsModel())),
  new ErrorRouter(new ErrorView())
);

server.start();

