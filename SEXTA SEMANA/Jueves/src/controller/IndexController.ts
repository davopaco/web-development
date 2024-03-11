import IndexModel from "../model/IndexModel.js";
import IndexView from "../view/IndexView.js";

export default class IndexController {
  //Aquí se especifica los atributos de la clase que son la vista y el modelo.
  constructor(
    private readonly view: IndexView,
    private readonly model: IndexModel
  ) {
    console.log("IndexController");
  }

  //Función para iniciar el controlador desde index.ts
  public start(): void {
    //Despliega la vista usando el modelo obtenido
    this.view.deploy(this.model.getMovies()); /* .then(() => {
      //Despliega el trailer una vez las películas se han renderizado en el HTML.
      this.showTrailer();
      this.searchBar();
    }); */
  }

  /* async showTrailer(): Promise<void> {
    //Selecciona todos los elementos de la clase movie-cell y que sean el elemento a.
    const trailers = document.querySelectorAll(".movie-cell a");
    //Recorre la lista de nodos.
    trailers.forEach((trailer) => {
      //Por cada nodo, le agrega un eventlistener que permita escuchar cuando hace click.
      trailer.addEventListener(
        "click",
        (e) => {
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
        },
        { passive: true }
      );
    });
  }

  searchBar(): void {
    this.view.getButton().addEventListener("click", () => {
      this.model.searchBar();
    });
  }

  async removeTrailer(): Promise<void> {
    //Trae todos los elementos de la clase movie-trailer que contengan la clase video, que contengan el elemento a.
    const button = document.querySelectorAll(".movie-trailer .video a");
    //Recorre la lista de nodos.
    button.forEach((btn) => {
      console.log("removeTrailer");
      //Les añade un event listener de click al botón de cerrar.
      btn.addEventListener(
        "click",
        () => {
          //Hace uso de la clase remover trailer de la vista, para quitar el pop up.
          this.view.removeTrailer();
          //Una vez quitado el popup, se vuelve a agregar los event listeners a las imágenes.
          this.showTrailer();
        },
        { passive: true }
      );
    });
  } */
}
