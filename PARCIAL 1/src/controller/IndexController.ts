import IndexModel from "../model/IndexModel.js";
import IndexView from "../view/IndexView.js";

export default class IndexController {
  //Aquí se especifica los atributos de la clase que son la vista y el modelo.
  constructor(
    private readonly view: IndexView,
    private readonly model: IndexModel
  ) {}

  //Función para iniciar el controlador desde index.ts
  public async start(): Promise<void> {
    //Despliega la vista usando los métodos del modelo.
    await this.view.deploy(
      this.model.getPapers(),
      this.model.getPaperNumber(),
      this.model.searchingFunctionalities(),
      this.model.getBtn(),
      this.model.getInput(),
      this.model.getFilter(),
      this.model.getRadio()
    );

    //Se asigna el valor de la página actual a 1.
    localStorage.setItem("currentPage", "1");
  }
}
