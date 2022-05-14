import Drink, { DrinkMap } from '@/Model/Drink';
import { OrderControllerObsever } from '@/Controller/OrderController';

// 주방을 담당
// 사용가능한 메뉴들은 메뉴 리스트에서 가져와서 그리도록
// orderController를 listen한다.
class Kitchen implements OrderControllerObsever {
  kitchenControllerElement = document.getElementById('coffee-list-kitchen')!;
  buttons: { [id: string]: HTMLButtonElement } = {};

  constructor() {
    const children = Array.from(this.kitchenControllerElement.children);
    this.findCoffeeCategoryButton(children);
  }

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

  addDrink = (drink: Drink) => {
    const drinkButtonId = this.getDrinkButtonId(drink);
    this.buttons[drinkButtonId].disabled = false;
  };

  removeDrink = (drink: Drink) => {
    const drinkButtonId = this.getDrinkButtonId(drink);
    this.buttons[drinkButtonId].disabled = true;
  };
}

export default new Kitchen();
