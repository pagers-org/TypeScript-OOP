import { drinkMap, DrinkMenuList } from '@/Model/constants/drinks';

class Drink {
  name: DrinkMenuList;
  menuName: typeof drinkMap[DrinkMenuList];

  constructor(name: DrinkMenuList) {
    this.name = name;
    this.menuName = drinkMap[name];
  }
}

export default Drink;
