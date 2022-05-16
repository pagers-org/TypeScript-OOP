import { OrderService } from '../services/order.service';
import { OrderView } from "../views/order.view";

export class OrderController {
  constructor(private orderService: OrderService, private orderView: OrderView) {
    this.orderService.bindEvent();
  }
}
