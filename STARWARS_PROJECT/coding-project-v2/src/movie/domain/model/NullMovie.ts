import AbstractMovie from "./AbstractMovie";
import NullDirector from "./NullDirector";

export default class NullMovie extends AbstractMovie {
  constructor() {
    super(
      "Not found title in database",
      0,
      "Not found opening in database",
      new Date(),
      [],
      new NullDirector()
    );
  }

  public isNull(): boolean {
    return true;
  }
}
