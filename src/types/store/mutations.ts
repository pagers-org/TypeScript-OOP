import Order from "./domain/Order";

export default {
  makeOrder(state) {
    const order = new Order();
    state.orders.push(order);
    console.log(state.orders);
  },
};
