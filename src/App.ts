import { addCustomEventListener } from '@/common';
import { Cafe } from '@/cafe';
import { eventListener } from '@/main';
import { Events } from '@/event';

export class App {
  private readonly cafe: Cafe;

  constructor(cafe: Cafe) {
    this.cafe = cafe;

    this.bindListeners();
  }

  private bindListeners() {
    addCustomEventListener(Events.COMPONENT_INITIALIZE, e => {
      e.detail.component.setCafe(this.cafe);
    });

    eventListener
      .orderAdded(({ order }) => {
        this.cafe.addOrder(order);
      })
      .orderRemoved(({ order }) => {
        this.cafe.removeOrder(order);
      })
      .changedOption(({ order, groupName, value }) => {
        order.setSelectedOptionValue(groupName, value);
      })
      .afterServing(({ serving }) => {
        this.cafe.addServing(serving);
      });
  }
}
