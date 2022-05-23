import { CoffeeDTO } from '@/@types';

export class OrderModel {
  private coffees: CoffeeDTO[] = [];

  setOrderCoffees(coffees: CoffeeDTO[]) {
    this.coffees = coffees;
  }
  getOrderCoffees(){
    return this.coffees;
  }
}
