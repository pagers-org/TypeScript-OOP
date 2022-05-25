import createStore from '@/core/Store';
import type Order from '@/Model/Order';
import { ORDER_STORE } from '@/Stores/constants';

interface OrdersStore {
  orders: Order[];
}

const initStore: OrdersStore = {
  orders: [],
};

const { ADD, DELETE, UPDATE } = ORDER_STORE.types;

export const { dispatch, getStore } = createStore<OrdersStore>(ORDER_STORE.event, (store = initStore, action) => {
  switch (action.type) {
    case ADD: {
      store.orders.push(action.payload as Order);
      return store;
    }
    case UPDATE: {
      const newOrders = store.orders.map(order => {
        if (order.id === action.payload.id as string) {
          return action.payload as Order;
        }
        return order;
      });

      store.orders = newOrders;
      return store;
    }
    case DELETE: {
      const targetIndex = store.orders.findIndex(order => order.id === action.payload.id as string);
      if (targetIndex !== -1) {
        store.orders.splice(targetIndex, 1);
      }
      return store;
    }
    default: {
      return store;
    }
  }
});
