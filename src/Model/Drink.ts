import { drinkMap, DrinkMenuList } from '@/Model/constants/drinks';

class Drink {
  name: DrinkMenuList;
  menuName: typeof drinkMap[DrinkMenuList];

  constructor(name: DrinkMenuList) {
    this.name = name;
    this.menuName = drinkMap[name];
  }

  isSameDrink = (otherDrink: Drink) => {
    return this.name === otherDrink.name;
  };
}

export default Drink;
