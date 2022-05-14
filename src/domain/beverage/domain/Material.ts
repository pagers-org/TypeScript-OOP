export type MaterialName = '물' | '커피' | '우유' | '데운 우유' | '밀크 폼' | '리퀴르' | '초콜릿' | '휘핑 크림';

export class Material {
  public id: number;
  public name: MaterialName;
  public description: string;
  public price: number;

  constructor(id: number, name: MaterialName, description: string, price: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
