import { MaterialName } from '@/@types';

export class Material {
  public id: number;
  public name: MaterialName;
  public description: string;
  public price: number;

  constructor(id: number, name: MaterialName, description: string, price: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
