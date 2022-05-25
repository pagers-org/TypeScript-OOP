import { $ } from '../utils/dom';

class CoffeeMakeModal {
  $modalLayout: HTMLDivElement;

  constructor() {
    this.$modalLayout = $<HTMLDivElement>('.modal-layout');
  }

  toggleModal() {
    this.$modalLayout.classList.toggle('hidden');
  }
}

export default CoffeeMakeModal;
