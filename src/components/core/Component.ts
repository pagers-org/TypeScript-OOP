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

  // noinspection JSUnusedGlobalSymbols
  connectedCallback() {
    this.render();

    this.bindElements();

    this.mounted();

    this.bindListeners();

    this.bindEvents();
  }

  protected bindElements() {
    //override
  }

  public setCafe(cafe: Cafe) {
    this.cafe = cafe;
  }

  protected render() {
    this.$container = createElement(this.template());
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

  protected template(): string {
    return '';
  }
}
