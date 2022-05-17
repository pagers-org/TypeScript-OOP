import { BaseComponent } from '@/components';
import { HeaderView } from './HeaderView';
import { Component } from '@/common';

@Component('cafe-header')
export class Header extends BaseComponent {
  protected bindEvents() {
    this.$container.addEventListener('click', (event: MouseEvent) => {
      const $target = event.target as HTMLInputElement;
      if ($target.id === 'order-management') {
        console.log('주문 관리');
      } else {
        console.log('재료 관리');
      }
    });
  }

  protected view() {
    return HeaderView();
  }
}
