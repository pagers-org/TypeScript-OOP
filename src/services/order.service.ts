import { CoffeeDTO } from "@/@types";
import { OrderModel } from "../models/order.model";

export class OrderService {
  private orderModel = new OrderModel();
  
  addCoffee(coffee: CoffeeDTO) {
    const orderedList = this.orderModel.getOrderCoffees();
    orderedList.push(coffee);
    this.orderModel.setOrderCoffees(orderedList);
  }
  deleteCoffee(id: number) {
    let orderedList = this.orderModel.getOrderCoffees();
    orderedList = orderedList.filter((coffee) => coffee.id !== id);
    this.orderModel.setOrderCoffees(orderedList);
  }
}
