export type MenuItemConstructor = {
  beverageId: number;
};

export class MenuItem {
  private readonly beverageId: number;

  constructor(constructor: MenuItemConstructor) {
    this.beverageId = constructor.beverageId;
  }

  public getBeverageId() {
    return this.beverageId;
  }
}
