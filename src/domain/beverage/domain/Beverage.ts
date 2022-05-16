import { BeverageName } from '@/@types';

export class Beverage {
  private readonly id: number;
  private readonly name: BeverageName;

  constructor(id: number, name: BeverageName) {
    this.id = id;
    this.name = name;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }
}
