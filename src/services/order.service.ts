import { CoffeeDTO } from "@/@types";

export class OrderService {
  public coffees: CoffeeDTO[] = [];
  private onOrderListChanged!: Function;

  bindOrderListChanged(callback: Function) {
    this.onOrderListChanged = callback;
  }
  private _commit(coffees: CoffeeDTO[]) {
    this.onOrderListChanged(coffees);
  }
  addCoffee(coffee: CoffeeDTO) {
    this.coffees = [...this.coffees, { ...coffee }];
    this.onOrderListChanged(coffee);
  }
  deleteCoffee(id: number) {
    this.coffees = [...this.coffees].filter(coffee => coffee.id !== id);
    console.log(this.coffees);
  }
}