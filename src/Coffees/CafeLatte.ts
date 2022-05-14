import Coffee, { ICoffe, CoffeeEnum } from './Coffee';

class CafeLatte extends Coffee implements ICoffe {
  name = CoffeeEnum.CafeLatte;

  ingredients = {
    coffee: 5,
    hotMilk: 4,
    milkFoam: 2,
  } as const;

  constructor() {
    super();
  }
}

export default CafeLatte;
