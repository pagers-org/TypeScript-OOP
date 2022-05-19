import { CoffeeDTO } from '@/@types';

export class OrderService {
  public coffees: CoffeeDTO[] = [];
  private onOrderListChanged!: (coffees: CoffeeDTO) => void;

  bindOrderListChanged(callback: (coffees: CoffeeDTO) => void) {
    this.onOrderListChanged = callback;
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
