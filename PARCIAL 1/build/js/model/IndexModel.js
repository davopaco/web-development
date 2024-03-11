var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Define la clase del modelo.
export default class IndexModel {
    constructor() {
        this.input = document.querySelector("#search-bar");
        this.btn = document.querySelector("#search-btn");
    }
    //Función para obtener las películas.
    getPapers() {
        return __awaiter(this, void 0, void 0, function* () {
            //Retorna una promesa que resuelve un fetch a la API de las películas.
            return yield new Promise((resolve, reject) => {
                //Hace un fetch a la API de las películas.
                const response = fetch("../data.json");
                //Si la promesa se resuelve, resuelve la promesa de la función que es la interfaz de películas.
                response
                    .then((data) => {
                    console.log(data);
                    data.json().then((data) => {
                        resolve(data.papers);
                    });
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
    getInput() {
        return this.input;
    }
    getBtn() {
        return this.btn;
    }
}
