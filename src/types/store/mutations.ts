import Order from "./domain/Order";

export default {
  makeOrder(state) {
    const no = state.orders.length;
    const order = new Order(no);
    state.orders.push(order);
  },

  removeOrder(state, OrderNumber: number) {
    state.orders = state.orders.filter((order) => order.no !== OrderNumber);
  },
};
