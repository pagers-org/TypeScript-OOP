import { CoffeeDTO } from "@/@types";

export class Coffee {
  coffees: CoffeeDTO[];
  constructor(coffee: CoffeeDTO[]) {
    this.coffees = coffee;
  }
}
