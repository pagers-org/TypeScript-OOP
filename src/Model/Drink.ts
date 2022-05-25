import { drinkMap, DrinkMenuList } from '@/Model/constants/drinks';

class Drink<T extends DrinkMenuList, P extends typeof drinkMap[T]> {
  id: number;
  name: T;
  menuName: P;

  constructor(id: number, name: T, menuName: P) {
    this.id = id;
    this.name = name;
    this.menuName = menuName;
  }
}

export default Drink;
