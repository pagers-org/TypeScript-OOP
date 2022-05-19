export const getDomElement = (element: string) => {
  return document.querySelector(element);
};

export const getDomElements = (element: string) => {
  return document.querySelectorAll(element);
};

export const getDomElementId = (target: HTMLElement | null) => {
  if (target) return target.id;
};

export const getElementLength = (element: string) => {
  const $itemList = getDomElements(element);
  return $itemList.length;
};

export const setInnerHTML = (target: Element | null, content: string) => {
  if (target) {
    target.innerHTML = content;
  }
};

export const toggleAttribute = (item: Element, attribute: string) => {
  if (item.getAttribute(attribute)) {
    item.removeAttribute(attribute);
  } else {
    item.setAttribute(attribute, 'true');
  }
};
