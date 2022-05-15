import { createElement, dispatchCustomEvent } from '@/common';
import { EVENT } from '@/constant';
import { Store } from '@/app/Store';

export class Component extends HTMLElement {
  protected $container!: HTMLElement;
  protected store!: Store;

  constructor() {
    super();

    dispatchCustomEvent(EVENT.COMPONENT_INITIALIZE, { component: this });
  }

  setStore(store: Store) {
    this.store = store;
  }

  connectedCallback() {
    this.render();

    this.init();

    this.bindEvents();
  }

  init() {
    //override
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
