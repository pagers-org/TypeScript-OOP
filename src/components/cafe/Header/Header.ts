import { Component } from '@/components';
import { headerView } from './HeaderView';

export class Header extends Component {
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
    return headerView;
  }
}
