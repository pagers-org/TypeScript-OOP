import { CoffeeDTO } from "@/@types";


export class OrderService {
  public coffees: CoffeeDTO[] = [];
  private onOrderListChanged!: Function;

  constructor() {}
  bindOrderListChanged(callback: Function) {
    console.log("bindOrderListChanged");
    this.onOrderListChanged = callback;
  }
  _commit(coffees: CoffeeDTO) {
    this.onOrderListChanged(coffees);
  }
  addCoffee(coffee: CoffeeDTO) {
    console.log(`addCoffee: ${JSON.stringify(coffee)}`);
    this.coffees = [...this.coffees, { ...coffee }];
    console.log(`수정된 커피 값 ${JSON.stringify(this.coffees)}`);
    this._commit(coffee);
  }
  console(){
    console.log('test');
  }
}