import { Articles, Papers } from "./types/ArticleInterface.js";

// Define la clase del modelo.
export default class IndexModel {
  private readonly input: HTMLInputElement;
  private readonly btn: HTMLInputElement;
  constructor() {
    this.input = document.querySelector("#search-bar") as HTMLInputElement;
    this.btn = document.querySelector("#search-btn") as HTMLInputElement;
  }
  //Función para obtener las películas.
  public async getPapers(): Promise<Papers[]> {
    //Retorna una promesa que resuelve un fetch a la API de las películas.
    return await new Promise((resolve, reject) => {
      //Hace un fetch a la API de las películas.
      const response = fetch("../data.json");
      //Si la promesa se resuelve, resuelve la promesa de la función que es la interfaz de películas.
      response
        .then((data) => {
          console.log(data);
          data.json().then((data: Articles) => {
            resolve(data.papers);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getInput() {
    return this.input;
  }

  public getBtn() {
    return this.btn;
  }
}
