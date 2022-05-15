import { createElement } from '@/common';
import { Store } from '@/App';
import { EVENT } from '@/constant';

export class Component extends HTMLElement {
  protected $container!: HTMLElement;
  protected store!: Store;

  setStore(store: Store) {
    this.store = store;
  }

  constructor() {
    super();

    dispatchEvent(new CustomEvent(EVENT.COMPONENT_INITIALIZE, { detail: { component: this } }));
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
