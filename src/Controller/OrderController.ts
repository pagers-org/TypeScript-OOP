import Drink from '@/Model/Drink';
import DrinkFactory from '~/src/Model/OrderFactory';
import Kitchen from '@/View/Kitchen/Kitchen';

export interface OrderControllerObsever {
  addDrink: (drink: Drink) => void;
  removeDrink: (drink: Drink) => void;
  noticeDrinkEmpty: () => void;
}

class OrderController {
  drinkList: Drink[] = [];
  drinkFactory = DrinkFactory;
  observers: OrderControllerObsever[] = [Kitchen];

  addDrink = () => {
    const newDrink = this.drinkFactory.createDrink();
    this.drinkList.push(newDrink);
    this.observers.forEach(observer => observer.addDrink(newDrink));

    return newDrink;
  };

  deleteDrink = (index: number) => {
    if (this.drinkList.length > 0) {
      const targetDrink = this.drinkList[index];

      if (targetDrink) {
        if (!this.drinkList.find(drink => drink.name === targetDrink.name)) {
          this.observers.forEach(observer => observer.removeDrink(targetDrink));
        }

        this.drinkList.splice(index, 1);
      }

      if (this.drinkList.length <= 0) {
        this.observers.forEach(observer => observer.noticeDrinkEmpty());
      }
    }
  };
}

export default new OrderController();
