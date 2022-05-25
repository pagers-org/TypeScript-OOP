import Drink from '@/Model/Drink';
import type Order from '@/Model/Order';
import { ORDER_STORE } from '@/Stores/constants';

class Kitchen {
  kitchenControllerElement = document.getElementById('coffee-list-kitchen')!;
  buttons: { [id: string]: HTMLButtonElement } = {};
  kitchenCoverElement = document.getElementById('kitchen-cover')!;
  isKichenOpen = false;

  constructor() {
    const children = Array.from(this.kitchenControllerElement.children);
    this.mapCoffeeCategoryButton(children);
    this.bindeEvent();
  }

  private bindeEvent = () => {
    this.kitchenCoverElement.addEventListener('click', () => {
      alert('주문해주세요!');
    });
    window.addEventListener(ORDER_STORE.event, e => {
      const { type, store, payload } = e.detail;
      if (type === ORDER_STORE.types.ADD) {
        const addedOrder = payload as Order;
        return this.addDrink(addedOrder.drink);
      }
      if (type === ORDER_STORE.types.DELETE) {
        const storedOrders = store.orders as Order[];
        const deletedOrder = payload as Order;
        const isSameCoffeeExist = storedOrders.find(order => order.drink.name === deletedOrder.drink.name);
        if (!isSameCoffeeExist) {
          this.removeDrink(deletedOrder.drink);

          if (storedOrders.length === 0) {
            this.closeKitchen();
          }
        }
      }
    });
  };

  private mapCoffeeCategoryButton(elements: Element[]) {
    elements.forEach(element => {
      if (element.classList.contains('coffee-category-button')) {
        this.buttons[element.id] = element as HTMLButtonElement;
      }

      if (element.childElementCount > 0) {
        this.mapCoffeeCategoryButton(Array.from(element.children));
      }
    });
  }

  private veilKitchenCover = () => {
    this.kitchenCoverElement.classList.remove('hide');
  };

  private unVeilKitchenCover = () => {
    this.kitchenCoverElement.classList.add('hide');
  };

  private closeKitchen() {
    this.isKichenOpen = false;
    this.veilKitchenCover();
  }

  private openKitchen() {
    this.isKichenOpen = true;
    this.unVeilKitchenCover();
  }

  private addDrink = (drink: Drink) => {
    const drinkname = drink.name;
    this.buttons[drinkname].disabled = false;

    if (!this.isKichenOpen) {
      this.openKitchen();
    }
  };

  private removeDrink = (drink: Drink) => {
    const drinkName = drink.name;
    this.buttons[drinkName].disabled = true;
  };
}

export default new Kitchen();
