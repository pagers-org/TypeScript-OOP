import Coffee, { ICoffe, CoffeeEnum } from './Coffee';

class Lungo extends Coffee implements ICoffe {
  name = CoffeeEnum.Lungo;

  ingredients = {
    coffe: 5,
    water: 5,
  } as const;

  constructor() {
    super();
  }
}

export default Lungo;
