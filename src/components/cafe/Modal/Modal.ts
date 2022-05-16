import { EVENT } from '@/constant';
import { Component } from '@/components';
import { addCustomEventListener } from '@/common';
import { template } from './Modal.template';

const CLASS_NAME_HIDDEN = 'hidden';

export class Modal extends Component {
  private $closeButton!: HTMLElement;

  init() {
    this.$closeButton = this.$container.querySelector('#close-icon') as HTMLElement;
  }

  bindEvents() {
    addCustomEventListener(EVENT.ORDER_SUBMIT, () => {
      if (this.cafe.orders.isEmptyOrder()) {
        return alert('주문을 추가하세요');
      }

      this.show();
    });

    this.$closeButton.addEventListener('click', () => {
      this.hide();
    });
  }

  show(): void {
    this.$container.classList.remove(CLASS_NAME_HIDDEN);
  }

  hide(): void {
    this.$container.classList.add(CLASS_NAME_HIDDEN);
  }

  template() {
    return template;
  }
}
