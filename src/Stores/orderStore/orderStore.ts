import createStore, { Dispatch } from '@/core/Store';
import type Order from '@/Model/Order';
import { ORDER_STORE } from '@/Stores/orderStore/constants';

interface OrdersStore {
  orders: Order[];
}

const initStore: OrdersStore = {
  orders: [],
};

interface OrderTableAction extends Dispatch {
  type: string;
  payload: {
    componentId: string;
    order: Order;
  };
}

const { ADD, DELETE, UPDATE } = ORDER_STORE.types;

export const { dispatch, getStore } = createStore<OrdersStore, OrderTableAction>(
  ORDER_STORE.event,
  (store = initStore, action) => {
    switch (action.type) {
      case ADD: {
        store.orders.push(action.payload.order);
        return store;
      }
      case UPDATE: {
        const newOrders = store.orders.map(order => {
          if (order.isSameOrder(action.payload.order)) {
            return action.payload.order;
          }
          return order;
        });

        store.orders = newOrders;
        return store;
      }
      case DELETE: {
        const newOrders = store.orders.filter(order => !order.isSameOrder(action.payload.order));
        store.orders = newOrders;

        return store;
      }
      default: {
        return store;
      }
    }
  },
);
