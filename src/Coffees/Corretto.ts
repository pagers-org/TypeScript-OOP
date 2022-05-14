import Coffee, { ICoffe, CoffeeEnum } from './Coffee';

class Corretto extends Coffee implements ICoffe {
  name = CoffeeEnum.corretto;

  ingredients = {
    water: 5.5,
    liqueur: 2,
  } as const;

  constructor() {
    super();
  }
}

export default Corretto;
