import { EVENT } from '@/constant';
import { AppEventHandler } from '@/app/AppEventHandler';
import { Store } from '@/app/Store';
import { on } from '@/common';

export class App {
  private store: Store;

  private eventHandler: AppEventHandler;

  constructor(store: Store, eventHandler: AppEventHandler) {
    this.store = store;
    this.eventHandler = eventHandler;

    on(EVENT.COMPONENT_INITIALIZE, e => {
      const { component } = (e as CustomEvent).detail;
      component.setStore(store);
    });
  }
}
