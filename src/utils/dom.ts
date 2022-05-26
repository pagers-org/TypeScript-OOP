export function $<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector(selector) as T;
  if (element === null) throw new Error('element is null');
  return element;
}

export function $all<T extends HTMLElement>(selector: string): NodeListOf<T> {
  const elements = document.querySelectorAll(selector) as NodeListOf<T>;
  if (elements === null) throw new Error('elements are null');
  return elements;
}
