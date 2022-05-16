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

    this.initElements();

    this.mounted();

    this.bindListener();

    this.bindEvents();
  }

  protected initElements() {
    //override
  }

  public setCafe(cafe: Cafe) {
    this.cafe = cafe;
  }

  protected render() {
    this.$container = createElement(this.template());
    this.replaceWith(this.$container);
  }

  protected bindListener() {
    //override
  }

  protected bindEvents() {
    //override
  }

  protected template(): string {
    return '';
  }

  protected mounted() {
    //
  }
}
