import Option from '~/src/Model/OptionGroup';

export const DrinkMap = {
  americano: '아메리카노',
  latte: '카페라떼',
  mocha: '카페모카',
  aulait: '카페오레',
  capuccino: '카푸치노',
  corretto: '코레토',
  espresso: '에스프레소',
  lungo: '룽고',
  macciatto: '마끼아또',
  ristretto: '리스트레또',
} as const;

export const Drinks = Object.keys(DrinkMap).map(key => key as keyof typeof DrinkMap);

export type DrinkList = typeof Drinks[number];

class Drink {
  name: DrinkList;
  options: Option[];

  constructor({ name, options }: Drink) {
    this.name = name;
    this.options = options;
  }

  getName = () => {
    return this.name;
  };

  getOptions = () => {
    return this.options;
  };
}

export default Drink;
