import { EVENT } from '@/constant';
import { Store } from '@/app/Store';

export class AppEventHandler {
  private store: Store;

  constructor(store: Store) {
    this.store = store;

    this.handle();
  }

  handle() {
    addEventListener(EVENT.ORDER_ADDED, e => {
      const { order } = (e as CustomEvent).detail;

      this.store.orders.add(order);
    });

    addEventListener(EVENT.ORDER_REMOVED, e => {
      const { order } = (e as CustomEvent).detail;

      this.store.orders.remove(order);
    });
  }
}
