export const createDom = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const $element = div.firstElementChild;
  if (!$element) {
    throw new Error('element should not be null');
  }
  return $element;
};

export const castEventTargetToElement = (target: EventTarget | null) => {
  if (!target) {
    throw new Error('target should not be null');
  }
  if (!(target instanceof Element)) {
    throw new Error('target should be an Element');
  }
  return target as Element;
};
