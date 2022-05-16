import { $ } from '../utils/dom';

class CoffeeMakeModal {
  $modalLayout: HTMLDivElement;

  constructor() {
    this.$modalLayout = $('.modal-layout') as HTMLDivElement;
  }

  toggleModal() {
    this.$modalLayout.classList.toggle('hidden');
  }
}

export default CoffeeMakeModal;
