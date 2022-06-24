export const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const findById = <T extends { id: number }>(arr: T[], id: number) => arr.find(v => v.id === id);

export const entries = <K extends string, V>(obj: Record<K, V>): [K, V][] => Object.entries(obj) as [K, V][];

export const keys = <K extends string, V>(obj: Record<K, V>): K[] => Object.keys(obj) as K[];

export const selectTarget = (selector: string): HTMLElement => {
  const $target = document.querySelector(selector);
  if (!($target instanceof HTMLElement)) {
    throw new Error(`${selector} target not found`);
  }
  return $target;
};

export const selectClosestFromTarget = (target: HTMLElement, selector: string): HTMLElement => {
  const closestEl = target.closest(selector);
  if (!(closestEl instanceof HTMLElement)) throw new Error(`can not find ${selector}`);
  return closestEl;
};

export const addClassList = ({ selector, className }: { selector: string; className: string }) => {
  selectTarget(selector).classList.add(className);
};

export const removeClassList = ({ selector, className }: { selector: string; className: string }) => {
  selectTarget(selector).classList.remove(className);
};

export const setInnerText = (params: { selector: string; innerText: string }) => {
  const { selector, innerText } = params;
  selectTarget(selector).innerText = innerText;
};

export const pickChunk = <T extends unknown[]>(arr: T, sliceSize: number, currSlice: number): T => {
  if (sliceSize < currSlice) {
    console.warn('sliceSize can not be greater than currSlice');
    return arr;
  }

  return arr.slice(
    Math.floor(arr.length / sliceSize) * currSlice,
    Math.floor(arr.length / sliceSize) * (currSlice + 1),
  ) as T;
};

export const generator = (() => {
  let id = 0;

  const getUniqueId = () => {
    return (id += 1);
  };

  return {
    getUniqueId,
  };
})();
