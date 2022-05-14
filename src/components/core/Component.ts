import { createElement } from '@/common';

export class Component extends HTMLElement {
  protected $container!: HTMLElement;

  connectedCallback() {
    this.initContainer();

    this.render();

    this.init();

    this.events();
  }

  initContainer() {
    this.$container = createElement(`<div class="${this.constructor.name}"></div>`);
    this.replaceWith(this.$container);
  }

  init() {
    //
  }

  render() {
    this.$container.appendChild(createElement(this.template()));
  }

  events() {
    //
  }

  template(): string {
    return '';
  }
}
