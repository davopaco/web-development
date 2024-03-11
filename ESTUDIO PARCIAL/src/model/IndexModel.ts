// Se importa la interfaz de la clase de Datos.
import MovieInterface from "./types/MovieInterface.js";

// Se define la clase del modelo.
export default class IndexModel {
  // Se define el método para obtener los datos que devuelve una promesa de la interfaz.
  public async getData(): Promise<MovieInterface> {
    // Se retorna una promesa que resuelve un fetch a los datos.
    return await new Promise((resolve, reject) => {
      // Se hace un fetch a los datos.
      const response = fetch("../data.json");
      // Si la promesa se resuelve, resuelve la promesa de la función que es la interfaz de datos.
      response
        .then((data) => {
          resolve(data.json());
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
