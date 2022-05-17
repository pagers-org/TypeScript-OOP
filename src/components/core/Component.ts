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

    this.bindElements();

    this.bindListeners();

    this.bindEvents();

    setTimeout(() => {
      this.mounted();
    });
  }

  protected bindElements() {
    //override
  }

  public setCafe(cafe: Cafe) {
    this.cafe = cafe;
  }

  protected render() {
    this.$container = createElement(this.view());
    this.replaceWith(this.$container);
  }

  protected mounted() {
    //
  }

  protected bindListeners() {
    //override
  }

  protected bindEvents() {
    //override
  }

  protected view(): string {
    return '';
  }

  protected createComponent<T extends Component>(tagName: string): T {
    const component = document.createElement(tagName) as Component;
    component.setCafe(this.cafe);

    return <T>component;
  }

  public remove() {
    super.remove();

    this.$container.remove();
  }
}
