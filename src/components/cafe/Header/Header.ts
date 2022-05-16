import { Component } from '@/components';
import { template } from './Header.template';

export class Header extends Component {
  bindEvents() {
    this.$container.addEventListener('click', (event: MouseEvent) => {
      const $target = event.target as HTMLInputElement;
      if (!$target.matches('[type="radio"]')) return;
      event.preventDefault();
      alert('아직 준비되지 않았네요🥺');
    });
  }

  template() {
    return template;
  }
}
