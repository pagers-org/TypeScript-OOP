import { createElement } from '@/common';

export class Component extends HTMLElement {
  protected $container!: HTMLElement;

  connectedCallback() {
    this.render();

    this.init();

    this.events();
  }

  init() {
    //
  }

  render() {
    this.$container = createElement(this.template());
    this.replaceWith(this.$container);
  }

  events() {
    //
  }

  template(): string {
    return '';
  }
}
