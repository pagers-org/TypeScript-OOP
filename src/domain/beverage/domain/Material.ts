export class Material {
  public id: number;
  public name: string;
  public description: string;
  public price: number;

  constructor(id: number, name: string, description: string, price: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
