export function qs(selector: string, scope = document) {
  if (!selector) throw 'no selector';

  return scope.querySelector(selector);
}

export function qsAll(selector: string, scope = document) {
  if (!selector) throw 'no selector';

  return Array.from(scope.querySelectorAll(selector));
}

export function on(target: HTMLElement, eventName: string, handler: (event: Event) => void) {
  target.addEventListener(eventName, handler);
}

export function emit<T>(eventName: string, detail?: T) {
  const event = new CustomEvent(eventName, { detail });
  dispatchEvent(event);
}
