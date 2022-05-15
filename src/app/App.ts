import { EVENT } from '@/constant';
import { AppEventHandler } from '@/app/AppEventHandler';
import { Store } from '@/app/Store';
import { addCustomEventListener } from '@/common';
import { Component } from '@/components';

export class App {
  private readonly store: Store;

  private eventHandler: AppEventHandler;

  constructor(store: Store, eventHandler: AppEventHandler) {
    this.store = store;
    this.eventHandler = eventHandler;

    this.init();
  }

  private init() {
    addCustomEventListener(EVENT.COMPONENT_INITIALIZE, e => {
      const { component } = (e as CustomEvent).detail;
      (component as Component).setStore(this.store);
    });
  }
}
