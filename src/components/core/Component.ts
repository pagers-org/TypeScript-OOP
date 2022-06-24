import { createElement, dispatchCustomEvent } from '@/common';
import { Cafe } from '@/cafe';
import { Events } from '@/event';

export class Component extends HTMLElement {
  protected $container!: HTMLElement;
  protected cafe!: Cafe;

  constructor() {
    super();

    dispatchCustomEvent(Events.COMPONENT_INITIALIZE, { component: this });
  }

  connectedCallback() {
    this.render().then(() => {
      this.bindElements();

      this.bindListeners();

      this.bindEvents();

      setTimeout(() => {
        this.mounted();
      });
    });
  }

  protected bindElements() {
    //override
  }

  public setCafe(cafe: Cafe) {
    this.cafe = cafe;
  }

  protected async render() {
    const view = await this.view();

    this.createContainer(view);
  }

  private createContainer(view: string) {
    this.$container = createElement(view);
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

  protected view(): string | Promise<string> {
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
