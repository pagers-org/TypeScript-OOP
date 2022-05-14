import Option from '@/Model/Option';

/*
  추후... 지원....
  '카페오레',
  '카푸치노',
  '코레토',
  '에스프레소',
  '룽고',
  '마끼아또',
  '리스트레또',
*/

export const DrinkMap = {
  아메리카노: 'americano',
  카페라떼: 'latte',
  카페모카: 'mocha',
} as const;

export const Drinks = Object.keys(DrinkMap).map(key => key as keyof typeof DrinkMap);

export type DrinkList = typeof Drinks[number];

// 마실 것만
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
