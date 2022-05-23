import { OrderService } from '../services/order.service';
import { OrderView } from '../views/order.view';
import { CoffeeDTO } from '@/@types';

export class OrderController {
  constructor(private orderService: OrderService, private orderView: OrderView) {
    this.orderView.bindHeaderEvent();
    this.orderView.bindMakeCoffeeEvent();
    this.orderView.bindModalEvent();
    this.orderView.bindOrderEvent(this.handleAddCoffee);
    this.orderView.bindOrderMenuEvent(this.handleDeleteCoffee);
  }
  handleAddCoffee = (coffee: CoffeeDTO) => {
    this.orderService.addCoffee(coffee);
  };
  handleDeleteCoffee = (id: number) => {
    this.orderService.deleteCoffee(id);
  };
}
