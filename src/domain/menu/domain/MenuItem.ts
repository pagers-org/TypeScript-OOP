import { getBeverageById } from '@/domain';
import { createElement } from '@/common';

export class MenuItem {
  public beverageId: number;

  constructor(beverageId: number) {
    this.beverageId = beverageId;
  }

  toElement(): HTMLElement {
    const beverage = getBeverageById(this.beverageId);
    const $button = createElement(`<button class='coffee-category-button' id='ristretto'>${beverage.name}</button>`);
    $button.dataset['beverageId'] = `${beverage.id}`;

    return $button;
  }
}
