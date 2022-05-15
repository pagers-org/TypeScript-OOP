import { createElement, dispatchCustomEvent } from '@/common';
import { EVENT } from '@/constant';
import { Cafe } from '@/store/Cafe';

export class Component extends HTMLElement {
  protected $container!: HTMLElement;
  protected cafe!: Cafe;

  constructor() {
    super();

    dispatchCustomEvent(EVENT.COMPONENT_INITIALIZE, { component: this });
  }

  connectedCallback() {
    this.render();

    this.init();

    this.bindEvents();
  }

  init() {
    //override
  }

  setCafe(cafe: Cafe) {
    this.cafe = cafe;
  }

  render() {
    this.$container = createElement(this.template());
    this.replaceWith(this.$container);
  }

  bindEvents() {
    //override
  }

  template(): string {
    return '';
  }
}
