import { BeverageName } from '@/@types';

export type BeverageConstructor = {
  id: number;
  name: BeverageName;
};

export class Beverage {
  private readonly id: number;
  private readonly name: BeverageName;

  constructor(constructor: BeverageConstructor) {
    this.id = constructor.id;
    this.name = constructor.name;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): BeverageName {
    return this.name;
  }

  public clone() {
    return new Beverage({ id: this.id, name: this.name });
  }
}
