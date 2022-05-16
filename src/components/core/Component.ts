import { createElement, dispatchCustomEvent } from '@/common';
import { EVENT } from '@/constant';
import { Cafe } from '@/cafe';

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

    this.bindListener();

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

  bindListener() {
    //override
  }

  bindEvents() {
    //override
  }

  template(): string {
    return '';
  }
}
