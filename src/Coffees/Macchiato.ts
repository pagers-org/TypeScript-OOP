import Coffee, { ICoffe, CoffeeEnum } from './Coffee';

class Macchiato extends Coffee implements ICoffe {
  name = CoffeeEnum.macchiato;

  ingredients = {
    coffe: 3,
    milkFoam: 7,
  } as const;

  constructor() {
    super();
  }
}

export default Macchiato;
