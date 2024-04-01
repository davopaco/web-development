import PapersController from "./controller/PapersController";
import PapersExpress from "./express/PapersExpress";
import PapersModel from "./model/PapersModel";
import ErrorController from "./controller/ErrorController";
import PapersView from "./view/PapersView";
import ErrorView from "./view/ErrorView";

const server = new PapersExpress(
  new PapersView(new PapersController(new PapersModel())),
  new ErrorView(new ErrorController())
);

server.start();
