import { EVENT } from '@/constant';
import { addCustomEventListener } from '@/common';
import { Component } from '@/components';
import { Cafe } from '@/cafe';
import { OrderChangeType } from '@/@types';
import { Serving } from '@/domain';

export class App {
  private readonly cafe: Cafe;

  constructor(cafe: Cafe) {
    this.cafe = cafe;

    this.bindListeners();
  }

  private bindListeners() {
    addCustomEventListener(EVENT.COMPONENT_INITIALIZE, e => {
      const { component } = (e as CustomEvent).detail;
      (component as Component).setCafe(this.cafe);
    });

    addCustomEventListener(EVENT.ORDER_ADDED, e => {
      this.cafe.addOrderGroup(e.detail.order);
    });

    addCustomEventListener(EVENT.ORDER_REMOVED, e => {
      this.cafe.removeOrderGroup(e.detail.order);
    });

    addCustomEventListener(EVENT.CHANGE_OPTION, e => {
      const { order, groupName, value }: OrderChangeType = e.detail;
      order.setSelectedOptionValue(groupName, value);
    });

    addCustomEventListener(EVENT.SERVED, e => {
      const serving = e.detail.serving as Serving;
      this.cafe.addServing(serving);
    });

    addCustomEventListener(EVENT.MODAL_OPEN, e => {
      this.cafe.setOpenModal(e.detail.opened);
    });
  }
}
