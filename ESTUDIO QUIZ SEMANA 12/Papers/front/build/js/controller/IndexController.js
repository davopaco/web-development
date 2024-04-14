var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class IndexController {
    //Aquí se especifica los atributos de la clase que son la vista y el modelo.
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }
    //Función para iniciar el controlador desde index.ts
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            //Se obtienen los papers de la dirección especificada.
            yield this.model.getPapers();
            //Despliega la vista usando los métodos del modelo.
            yield this.view.deploy(this.model.getArticles(), this.model.getPaperNumber(), this.model.searchingFunctionalities(), this.model.getTopKeywords(5));
            //Se asigna el valor de la página actual a 1.
            localStorage.setItem("currentPage", "1");
        });
    }
}
