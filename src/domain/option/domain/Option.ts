export class Option {
  public id: number;
  public optionGroupId: number;
  public name: string;
  public price: number;
  public selected = false;

  constructor(id: number, optionGroupId: number, name: string, price: number) {
    this.id = id;
    this.optionGroupId = optionGroupId;
    this.name = name;
    this.price = price;
  }
}
