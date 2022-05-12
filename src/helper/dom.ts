export const $ = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector(selector) as T;
  return element;
};

export const $all = <T extends HTMLElement>(selector: string): NodeListOf<T> => {
  const elements = document.querySelectorAll(selector) as NodeListOf<T>;
  return elements;
};
