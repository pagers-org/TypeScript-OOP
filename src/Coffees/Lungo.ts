import Coffee, { ICoffe, CoffeeEnum } from './Coffee';

class Lungo extends Coffee implements ICoffe {
  name = CoffeeEnum.lungo;

  ingredients = {
    coffe: 5,
    water: 5,
  } as const;

  constructor() {
    super();
  }
}

export default Lungo;
