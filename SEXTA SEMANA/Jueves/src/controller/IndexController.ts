import IndexModel from "../model/IndexModel.js";
import IndexView from "../view/IndexView.js";

export default class IndexController {
  constructor(
    private readonly view: IndexView,
    private readonly model: IndexModel
  ) {
    console.log("IndexController");
  }

  public start(): void {
    this.view.deploy(this.model.getMovies()).then(() => {
      this.showTrailer();
    });
  }

  async showTrailer(): Promise<void> {
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
  }

  async removeTrailer(): Promise<void> {
    const button = document.querySelectorAll(".movie-trailer .video a");
    button.forEach((btn) => {
      console.log("removeTrailer");
      btn.addEventListener("click", () => {
        this.view.removeTrailer();
      });
    });
  }
}
