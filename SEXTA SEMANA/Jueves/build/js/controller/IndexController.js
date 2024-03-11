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
        this.view.deploy(this.model.getMovies()); /* .then(() => {
          //Despliega el trailer una vez las películas se han renderizado en el HTML.
          this.showTrailer();
          this.searchBar();
        }); */
    }
}
