export const getDomElement = (element: string) => {
  return document.querySelector(element);
};

export const getDomElements = (element: string) => {
  return document.querySelectorAll(element);
};

export const getDomElementId = (target: HTMLElement | null) => {
  if (target) return target.id;
  else throw new Error();
};

export const getElementLength = (element: string) => {
  const $itemList = getDomElements(element);
  return $itemList.length;
};

export const setInnerHTML = (target: HTMLElement | null, content: string) => {
  if (target) {
    target.innerHTML = content;
  } else throw new Error();
};

export const toggleBooleanAttribute = (item: Element, attribute: string) => {
  if (item.getAttribute(attribute)) {
    item.removeAttribute(attribute);
  } else {
    item.setAttribute(attribute, 'true');
  }
};
