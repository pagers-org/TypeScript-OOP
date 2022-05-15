import { createElement } from '@/common';
import { EVENT } from '@/constant';
import { Store } from '@/app/Store';

export class Component extends HTMLElement {
  protected $container!: HTMLElement;
  protected store!: Store;

  constructor() {
    super();

    dispatchEvent(new CustomEvent(EVENT.COMPONENT_INITIALIZE, { detail: { component: this } }));
  }

  setStore(store: Store) {
    this.store = store;
  }

  connectedCallback() {
    this.render();

    this.init();

    this.events();
  }

  init() {
    //override
  }

  render() {
    this.$container = createElement(this.template());
    this.replaceWith(this.$container);
  }

  events() {
    //override
  }

  template(): string {
    return '';
  }
}
