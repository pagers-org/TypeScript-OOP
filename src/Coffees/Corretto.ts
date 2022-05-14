import Coffee, { CoffeeEnum } from './Coffee';

class Corretto extends Coffee {
  name = CoffeeEnum.corretto;

  ingredients = {
    water: 5.5,
    liqueur: 2,
  } as const;

  //
}

export default Corretto;
