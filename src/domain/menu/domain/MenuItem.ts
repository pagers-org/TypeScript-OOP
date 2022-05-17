export class MenuItem {
  private readonly beverageId: number;

  constructor(beverageId: number) {
    this.beverageId = beverageId;
  }

  public getBeverageId() {
    return this.beverageId;
  }
}
