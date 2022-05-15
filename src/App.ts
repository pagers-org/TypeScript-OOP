import { EVENT } from '@/constant';
import { addCustomEventListener } from '@/common';
import { Component } from '@/components';
import { Cafe } from '@/store/Cafe';

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
  }
}
