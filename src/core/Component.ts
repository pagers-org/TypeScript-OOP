export interface Template {
  parent: Element | Node;
  children?: (Template | Element | Node | DocumentFragment)[];
}

abstract class Component extends HTMLElement {
  constructor() {
    super();
  }

  private connectedCallback() {
    this.render();
    this.componentDidMounted();
  }
  private disconnectedCallback() {
    this.componentDidUpdated();
  }
  private attributeChangedCallback() {
    this.componentDidUnMounted();
  }

  protected componentDidMounted: () => void = () => {
    // override
  };
  protected componentDidUpdated: () => void = () => {
    // override
  };
  protected componentDidUnMounted: () => void = () => {
    // override
  };

  protected addEventListenerToWindow = (eventName: string, callback: (e: Event) => void) => {
    window.addEventListener(eventName, callback.bind(this));
  };

  // 각 컴포넌트의 렌더링이 어떻게 될지는 알아서
  // 사용자 자유! 이 안에 렌더할 것을 넣어주세요!
  protected abstract template: () => Template;

  private composeComponents = (newTemplates: Template): Element | Node => {
    const parent = newTemplates.parent;
    const children = newTemplates.children;

    if (children && children.length > 0) {
      children.forEach(el => {
        const child: Element | Node = el instanceof Element || el instanceof Node ? el : this.composeComponents(el);
        return parent.appendChild(child);
      });
    }

    return parent;
  };

  // Component의 최종 결과물은 항상 이 함수를 통해야 한다.
  protected render = () => {
    const newTemplate = this.template();
    const rootElement = this.composeComponents(newTemplate);

    this.replaceChildren(rootElement);
  };
}

export default Component;
