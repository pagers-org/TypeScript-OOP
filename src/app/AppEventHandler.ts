import { EVENT } from '@/constant';
import { Store } from '@/app/Store';
import { addCustomEventListener } from '@/common';

export class AppEventHandler {
  private store: Store;

  constructor(store: Store) {
    this.store = store;

    this.handle();
  }

  handle() {
    addCustomEventListener(EVENT.ORDER_ADDED, e => {
      this.store.orders.add(e.detail.order);
    });

    addCustomEventListener(EVENT.ORDER_REMOVED, e => {
      this.store.orders.remove(e.detail.order);
    });
  }
}
