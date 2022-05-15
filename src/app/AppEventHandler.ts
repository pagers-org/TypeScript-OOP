import { EVENT } from '@/constant';
import { Store } from '@/app/Store';
import { on } from '@/common';

export class AppEventHandler {
  private store: Store;

  constructor(store: Store) {
    this.store = store;

    this.handle();
  }

  handle() {
    on(EVENT.ORDER_ADDED, e => {
      const { order } = (e as CustomEvent).detail;

      this.store.orders.add(order);
    });

    on(EVENT.ORDER_REMOVED, e => {
      const { order } = (e as CustomEvent).detail;

      this.store.orders.remove(order);
    });
  }
}
