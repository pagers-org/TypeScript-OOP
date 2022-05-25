import createStore from '@/core/Store';
import type Order from '@/Model/Order';
import { ORDERS } from '@/Stores/constants';

interface OrdersStore {
  orders: Order[];
}

const initStore: OrdersStore = {
  orders: [],
};

export const { dispatch, getStore } = createStore<OrdersStore>(ORDERS, (store = initStore, action) => {
  switch (action.type) {
    case 'add': {
      store.orders.push(action.payload as Order);
      return store;
    }
    case 'update': {
      const newOrders = store.orders.map(order => {
        if (order.id === action.payload.id as string) {
          return action.payload as Order;
        }
        return order;
      });

      store.orders = newOrders;
      return store;
    }
    case 'delete': {
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
