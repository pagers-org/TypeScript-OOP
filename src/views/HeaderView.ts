import { qs } from '../utils/helpers';
import View from './View';

export default class HeaderView extends View {
  private template;

  constructor(element = qs('#header') as HTMLHeadElement, template = new Template()) {
    super(element);
    this.template = template;
  }

  show() {
    super.show();
    this.element.innerHTML = this.template.getHeader();

    return this;
  }
}

class Template {
  getHeader() {
    return `
        <h1>☕ OOP 카페 ☕</h1>
        <nav id="nav">
          <input type="radio" name="tab" id="order-management" checked />
          <input type="radio" name="tab" id="material-management" />
          <label class="order-management" for="order-management"
            ><i class="fa-solid fa-mug-hot"></i>&nbsp;주문 관리</label
          >
          <label class="material-management" for="material-management"
            ><i class="fas fa-blender"></i>&nbsp;재료 관리</label
          >
          <span class="tab"></span>
        </nav>
        `;
  }
}
