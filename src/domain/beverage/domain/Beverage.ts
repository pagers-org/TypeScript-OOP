export type BeverageName =
  | '아메리카노'
  | '카페오레'
  | '카푸치노'
  | '코레또'
  | '에스프레소'
  | '카페 라떼'
  | '룽고'
  | '마끼야또'
  | '카페 모카'
  | '리스트레또';

export class Beverage {
  public id: number;
  public name: BeverageName;
  public price: number;

  constructor(id: number, name: BeverageName, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
