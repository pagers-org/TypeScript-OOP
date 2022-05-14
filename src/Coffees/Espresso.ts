import Coffee, { ICoffe, CoffeeEnum } from './Coffee';

class Espresso extends Coffee implements ICoffe {
  name = CoffeeEnum.espresso;

  ingredients = {
    coffe: 4,
  } as const;

  constructor() {
    super();
  }
}

export default Espresso;
