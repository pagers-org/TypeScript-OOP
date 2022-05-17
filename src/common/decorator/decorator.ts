import { createCustomElement } from '@/common';

export function Component(tagName: string) {
  return function (target: CustomElementConstructor) {
    setTimeout(() => {
      createCustomElement(tagName, target);
    });
  };
}
