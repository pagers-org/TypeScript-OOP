import Drink, { DrinkMap } from '@/Model/Drink';
import { OrderControllerObsever } from '@/Controller/OrderController';

class Kitchen implements OrderControllerObsever {
  kitchenControllerElement = document.getElementById('coffee-list-kitchen')!;
  buttons: { [id: string]: HTMLButtonElement } = {};
  kitchenCoverElement = document.getElementById('kitchen-cover')!;
  isKichenOpen = false;

  constructor() {
    const children = Array.from(this.kitchenControllerElement.children);
    this.findCoffeeCategoryButton(children);
    this.event();
  }

  private event = () => {
    this.kitchenCoverElement.addEventListener('click', () => {
      alert('주문해주세요!');
    });
  };

  private findCoffeeCategoryButton(elements: Element[]) {
    elements.forEach(element => {
      if (element.classList.contains('coffee-category-button')) {
        this.buttons[element.id] = element as HTMLButtonElement;
      }

      if (element.childElementCount > 0) {
        this.findCoffeeCategoryButton(Array.from(element.children));
      }
    });
  }

  private getDrinkButtonId(drink: Drink) {
    return DrinkMap[drink.name];
  }

  private toggleKitchenCover() {
    if (this.isKichenOpen) {
      this.kitchenCoverElement.classList.add('hide');
    } else {
      this.kitchenCoverElement.classList.remove('hide');
    }
  }

  addDrink = (drink: Drink) => {
    const drinkButtonId = this.getDrinkButtonId(drink);
    this.buttons[drinkButtonId].disabled = false;

    if (!this.isKichenOpen) {
      this.isKichenOpen = true;
      this.toggleKitchenCover();
    }
  };

  removeDrink = (drink: Drink) => {
    const drinkButtonId = this.getDrinkButtonId(drink);
    this.buttons[drinkButtonId].disabled = true;
  };

  noticeDrinkEmpty = () => {
    this.isKichenOpen = false;
    this.toggleKitchenCover();
  };
}

export default new Kitchen();
