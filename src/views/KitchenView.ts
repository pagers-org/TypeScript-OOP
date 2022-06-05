import { KITCHEN_TEMPLATE } from '../templates';
import { $ } from '../utils/dom';

export const KitchenView = {
  $kitchen: $<HTMLDivElement>(`#right-section`),

  open() {
    this.$kitchen.innerHTML = KITCHEN_TEMPLATE.open();
  },

  close() {
    this.$kitchen.innerHTML = KITCHEN_TEMPLATE.close();
  },
};
