import { Template } from '@/view/Template';
import { NOT_READY } from '../constant';
import { $ } from '../helper/dom';

export default class Header extends Template {
  constructor() {
    super();
    const rootNode = $<HTMLHeadElement>('header');
    rootNode.insertAdjacentHTML('afterbegin', this.template());
    this.bindEvent();
  }
  bindEvent() {
    const nav = $<HTMLElement>('nav');
    nav.addEventListener('click', (e: MouseEvent) => {
      const $target = e.target as HTMLInputElement;
      if (!$target.matches('[type="radio"]')) return;
      e.preventDefault();
      alert(NOT_READY);
    });
  }
  public template(): string {
    return `
    <nav>
        <input type="radio" name="tab" id="order-management" checked />
        <input type="radio" name="tab" id="material-management" />
        <label class="order-management" for="order-management"><i class="fa-solid fa-mug-hot"></i>&nbsp;주문 관리</label>
        <label class="material-management" for="material-management"><i class="fas fa-blender"></i>&nbsp;재료 관리</label>
        <span class="tab"></span>
      </nav>
        `;
  }
}
