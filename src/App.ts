import { EVENT } from '@/constant';
import { addCustomEventListener } from '@/common';
import { Component } from '@/components';
import { Cafe } from '@/cafe';
import { OrderChangeType } from '@/@types';

export class App {
  private readonly cafe: Cafe;

  constructor(cafe: Cafe) {
    this.cafe = cafe;

    this.init();
  }

  private init() {
    addCustomEventListener(EVENT.COMPONENT_INITIALIZE, e => {
      const { component } = (e as CustomEvent).detail;
      (component as Component).setCafe(this.cafe);
    });

    addCustomEventListener(EVENT.ORDER_ADDED, e => {
      this.cafe.orders.add(e.detail.order);
    });

    addCustomEventListener(EVENT.ORDER_REMOVED, e => {
      this.cafe.orders.remove(e.detail.order);
    });

    addCustomEventListener(EVENT.CHANGE_OPTION, e => {
      const { order, groupName, value }: OrderChangeType = e.detail;
      order.setSelectedOptionValue(groupName, value);
    });
  }
}
