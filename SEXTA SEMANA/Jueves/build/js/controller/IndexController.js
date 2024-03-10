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
    constructor(view, model) {
        this.view = view;
        this.model = model;
        console.log("IndexController");
    }
    start() {
        this.view.deploy(this.model.getMovies()).then(() => {
            this.showTrailer();
        });
    }
    showTrailer() {
        return __awaiter(this, void 0, void 0, function* () {
            const trailers = document.querySelectorAll(".movie-cell a");
            trailers.forEach((trailer) => {
                trailer.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log(trailer.id);
                    this.view
                        .deployTrailer(this.model.getTrailer(parseInt(trailer.id)))
                        .then(() => {
                        this.removeTrailer();
                    });
                });
            });
        });
    }
    removeTrailer() {
        return __awaiter(this, void 0, void 0, function* () {
            const button = document.querySelectorAll(".movie-trailer .video a");
            button.forEach((btn) => {
                console.log("removeTrailer");
                btn.addEventListener("click", () => {
                    this.view.removeTrailer();
                });
            });
        });
    }
}
