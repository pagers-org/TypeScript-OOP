import { CustomEventListener } from '@/@types';
import { EventName } from '@/event';

export function getRandomRange(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

export function createElement<T extends HTMLElement>(html: string): T {
  const template = document.createElement('template');
  template.insertAdjacentHTML('beforeend', html);
  return template.children.item(0) as T;
}

export function createCustomElement(name: string, customElementConstructor: CustomElementConstructor): void {
  if (!customElements.get(name)) {
    customElements.define(name, customElementConstructor);
  }
}

export function dispatchCustomEvent<T>(eventName: EventName, detail: T = {} as T): void {
  dispatchEvent(new CustomEvent(eventName, { detail }));
}

export function addCustomEventListener(eventName: EventName, callback: CustomEventListener): void {
  addEventListener(eventName, e => {
    callback(e as CustomEvent);
  });
}
