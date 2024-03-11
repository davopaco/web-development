import MovieInterface from "../model/types/MovieInterface";

// Se define la clase de la vista.
export default class IndexView {
  // Se define el método para desplegar los datos que recibe una promesa de la interfaz.
  public deploy(data: Promise<MovieInterface>): void {
    data.then((data) => {
      console.log(data);
    });
  }
}
