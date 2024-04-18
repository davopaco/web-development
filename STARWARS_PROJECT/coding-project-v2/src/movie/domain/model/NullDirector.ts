import AbstractPerson from "./AbstractPerson";

export default class NullDirector extends AbstractPerson {
  constructor() {
    super("Not found name in database", "Not found lastname in database");
  }

  public isNull(): boolean {
    return true;
  }
}
