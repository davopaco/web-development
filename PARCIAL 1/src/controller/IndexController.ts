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
  public async start(): Promise<void> {
    //Despliega la vista usando el modelo obtenido
    await this.view.deploy(this.model.getPapers(), this.model.getPaperNumber());
    this.view.buttonClicked(this.model.getBtn(), this.model.getInput());
    this.view.anchorClicked(
      this.model.getPapers(),
      this.model.getPaperNumber()
    );
    localStorage.setItem("currentPage", "1");
  }
}
