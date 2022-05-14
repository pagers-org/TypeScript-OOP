import Coffee, { ICoffe, CoffeeEnum } from './Coffee';

class CafeMocha extends Coffee implements ICoffe {
  name = CoffeeEnum.CafeMocha;

  ingredients = {
    coffee: 4,
    chocolate: 2,
    hotMilk: 2,
    whippedCream: 2,
  } as const;

  constructor() {
    super();
  }
}

export default CafeMocha;
