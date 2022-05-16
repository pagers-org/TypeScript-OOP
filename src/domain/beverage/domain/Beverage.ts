import { BeverageName } from '@/@types';

export class Beverage {
  public id: number;
  public name: BeverageName;
  public price: number;

  constructor(id: number, name: BeverageName, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
