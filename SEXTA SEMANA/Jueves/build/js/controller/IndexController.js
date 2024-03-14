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
        console.log("IndexController");
    }
    //Función para iniciar el controlador desde index.ts
    start() {
        //Despliega la vista usando el modelo obtenido
        this.view.deploy(this.model.getMovies()).then(() => {
            //Despliega el trailer una vez las películas se han renderizado en el HTML.
            this.showTrailer();
        });
        this.view.buttonClicked(this.model.getButton(), this.model.getInput());
    }
    showTrailer() {
        return __awaiter(this, void 0, void 0, function* () {
            //Selecciona todos los elementos de la clase movie-cell y que sean el elemento a.
            const trailers = document.querySelectorAll(".movie-cell a");
            //Recorre la lista de nodos.
            trailers.forEach((trailer) => {
                //Por cada nodo, le agrega un eventlistener que permita escuchar cuando hace click.
                trailer.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log(trailer.id);
                    //Aquí despliega el trailer en el HTML usando el getTrailer del modelo, en la vista, usando el id correspondiente por ranking.
                    this.view
                        .deployTrailer(this.model.getTrailer(parseInt(trailer.id)))
                        .then(() => {
                        //Cuando se resuelve, llama a la función remover trailer.
                        this.removeTrailer();
                    })
                        //Un error en caso de que no se resuelva la promesa.
                        .catch((err) => {
                        console.error(err);
                    });
                }, { passive: true });
            });
        });
    }
    removeTrailer() {
        return __awaiter(this, void 0, void 0, function* () {
            //Trae todos los elementos de la clase movie-trailer que contengan la clase video, que contengan el elemento a.
            const button = document.querySelectorAll(".movie-trailer .video a");
            //Recorre la lista de nodos.
            button.forEach((btn) => {
                console.log("removeTrailer");
                //Les añade un event listener de click al botón de cerrar.
                btn.addEventListener("click", () => {
                    //Hace uso de la clase remover trailer de la vista, para quitar el pop up.
                    this.view.removeTrailer();
                    //Una vez quitado el popup, se vuelve a agregar los event listeners a las imágenes.
                    this.showTrailer();
                }, { passive: true });
            });
        });
    }
}
