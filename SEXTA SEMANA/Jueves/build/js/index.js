import IndexController from "./controller/IndexController.js";
import IndexModel from "./model/IndexModel.js";
import IndexView from "./view/IndexView.js";
//Aquí se crea una instancia del controlador, pasándole la vista y el modelo.
const indexController = new IndexController(new IndexView(), new IndexModel());
//Aquí se inicia el controlador.
indexController.start();
