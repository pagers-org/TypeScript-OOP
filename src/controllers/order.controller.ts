import { OrderService } from '../services/order.service';
import { OrderView } from "../views/order.view";
import { CoffeeDTO } from "@/@types";

export class OrderController {
  constructor(
    private orderService: OrderService,
    private orderView: OrderView
  ) {
    this.orderService.bindOrderListChanged(this.onOrderListChanged);
    this.orderView.bindHeaderEvent();
    this.orderView.bindMakeCoffeeEvent();
    this.orderView.bindModalEvent();
    this.orderView.bindOrderEvent(this.handleAddCoffee);

    this.onOrderListChanged(this.orderService.coffees);
  }
  onOrderListChanged(coffees: CoffeeDTO[]) {
    this.orderView.createOrderTable(coffees);
  }
  handleAddCoffee(coffee: CoffeeDTO) {
    console.log(`handleAddCoffee: ${JSON.stringify(coffee)}`);
    this.orderService.console();
  }
}
