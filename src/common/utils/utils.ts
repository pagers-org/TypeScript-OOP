import { CustomEventListener } from '@/@types';
import { EventName } from '@/events';

export function getRandomRange(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

export function createElement(html: string): HTMLElement {
  const template = document.createElement('template');
  template.insertAdjacentHTML('beforeend', html);
  return template.children.item(0) as HTMLElement;
}

export function createCustomElement(name: string, customElementConstructor: CustomElementConstructor): void {
  if (!customElements.get(name)) {
    customElements.define(name, customElementConstructor);
  }
}

export function dispatchCustomEvent(eventName: EventName, detail: any = {}): void {
  dispatchEvent(new CustomEvent(eventName, { detail }));
}

export function addCustomEventListener(eventName: EventName, callback: CustomEventListener): void {
  addEventListener(eventName, e => {
    callback(e as CustomEvent);
  });
}

export function isPromise(p: any) {
  return p !== null && typeof p === 'object' && typeof p.then === 'function' && typeof p.catch === 'function';
}
