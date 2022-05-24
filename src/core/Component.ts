export interface Template {
  parent: Element | Node;
  children?: (Template | Element | Node | DocumentFragment)[];
}

// 안에서 html을 직접 바꿔주는 것을 전제로 개발한다. (react같은 component는 너무 어렵다...)
// 외부의 데이터는 event를 통해 가져온다. (내 global redux를 발전시켜서 사용해보자.)
// render 최적화(clone해서 거기에 변화사항을 적용하고 마는 거 같은)는 나중에,,,
abstract class Component extends HTMLElement {
  constructor() {
    super();
  }

  private connectedCallback() {
    this.render();
    this.componentDidMonted();
  }
  private disconnectedCallback() {
    this.componentDidUpdated();
  }
  private attributeChangedCallback() {
    this.componentDidUnMounted();
  }

  protected componentDidMonted: () => void = () => {
    // override
  };
  protected componentDidUpdated: () => void = () => {
    // override
  };
  protected componentDidUnMounted: () => void = () => {
    // override
  };

  // 해당 컴포넌트의 렌더 과정은 모두 이곳에서
  // 각자의 렌더링이 어떻게 될지는 알아서
  // 사용자의 요청, 이걸 렌더해주세요!
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
  // 이 안을 스스로 채워서 렌더링을 끝낸다.
  protected render = () => {
    const newTemplate = this.template();
    const rootElement = this.composeComponents(newTemplate);

    this.replaceWith(rootElement);
  };
}

export default Component;
