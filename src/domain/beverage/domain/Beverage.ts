import { BeverageName } from '@/@types';

export class Beverage {
  private readonly id: number;
  private readonly name: BeverageName;

  constructor(id: number, name: BeverageName) {
    this.id = id;
    this.name = name;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): BeverageName {
    return this.name;
  }
}
