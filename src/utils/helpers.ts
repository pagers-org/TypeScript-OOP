import { COFFEE, CUP, EXTRA, ICE, ICEORHOT, SIZE, SYRUP, WHIPPEDCREAM, SHOT } from './constants';
import { getRandomInt } from './getRandom';

export function qs(selector: string, scope = document) {
  if (!selector) throw 'no selector';

  return scope.querySelector(selector);
}

export function qsAll(selector: string, scope = document) {
  if (!selector) throw 'no selector';
  if (!scope.querySelectorAll(selector)) throw 'selector is undefined';
  return Array.from(scope.querySelectorAll(selector));
}

export function on(target: HTMLElement, eventName: string, handler: (event: Event) => void) {
  target.addEventListener(eventName, handler);
}

export function emit<T>(eventName: string, detail?: T) {
  const event = new CustomEvent(eventName, { detail });
  dispatchEvent(event);
}

export function genRandomOne() {
  return {
    menu: COFFEE[getRandomInt(COFFEE)],
    size: SIZE[getRandomInt(SIZE)],
    shot: SHOT[getRandomInt(SHOT)],
    syrup: SYRUP[getRandomInt(SYRUP)],
    iceOrHot: ICEORHOT[getRandomInt(ICEORHOT)],
    ice: ICE[getRandomInt(ICE)],
    whippedCream: WHIPPEDCREAM[getRandomInt(WHIPPEDCREAM)],
    extra: EXTRA[getRandomInt(EXTRA)],
    cup: CUP[getRandomInt(CUP)],
  };
}
