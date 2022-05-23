import { CoffeeDTO } from '@/@types';

export class OrderService {
  public coffees: CoffeeDTO[] = [];
  addCoffee(coffee: CoffeeDTO) {
    this.coffees = [...this.coffees, { ...coffee }];
  }
  deleteCoffee(id: number) {
    this.coffees = [...this.coffees].filter(coffee => coffee.id !== id);
  }
}
