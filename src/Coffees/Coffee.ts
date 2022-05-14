class Coffee {
  static optionsList: Record<keyof ICoffeeOption, Array<ICoffeeOption[keyof ICoffeeOption]>> = {
    size: ['Tall', 'Grande', 'Venti'],
    shot: ['1', '2', '3'],
    syrup: ['바닐라', '헤이즐넛', '카라멜', '-'],
    hotOrIce: ['ICE', 'HOT'],
    iceType: ['기본얼음', '각얼음', '-'],
    whippedCream: ['없음', '적당히', '많이'],
    extra: ['자바칩', '카라멜드리즐', '초코드리즐', '아몬드', '시나몬', '-'],
    cup: ['1회용 컵', '텀블러', '머그컵', '재활용 컵'],
  };

  options: ICoffeeOption;

  constructor() {
    this.setRandomOption();
  }

  public static getOptionTitle(optionName: keyof ICoffeeOption) {
    return COFFEE_OPTION_TITLE[optionName];
  }

  private setRandomOption() {
    this.options = Object.entries(Coffee.optionsList).reduce<ICoffeeOption>((acc, [key, values]) => {
      return { ...acc, [key]: values[Math.floor(Math.random() * values.length)] || '-' };
    }, {} as ICoffeeOption);
  }

  //
}

const COFFEE_OPTION_TITLE: Record<keyof ICoffeeOption, string> = {
  size: '사이즈',
  shot: '샷',
  syrup: '시럽',
  hotOrIce: 'ICE/HOT',
  whippedCream: '휘핑 크림',
  extra: '엑스트라',
  cup: '컵',
  iceType: '얼음 종류',
};

export class ICoffe {
  name: CoffeeEnum;
  ingredients: Record<string, number>;
  options: ICoffeeOption;
}

type NullOption = '-';

export type ICoffeeOption = {
  size: 'Tall' | 'Grande' | 'Venti';
  shot: '1' | '2' | '3';
  syrup: '바닐라' | '헤이즐넛' | '카라멜' | NullOption;
  hotOrIce: 'ICE' | 'HOT';
  iceType: '기본얼음' | '각얼음' | NullOption;
  whippedCream: '없음' | '적당히' | '많이';
  extra: '자바칩' | '카라멜드리즐' | '초코드리즐' | '아몬드' | '시나몬' | NullOption;
  cup: '1회용 컵' | '텀블러' | '머그컵' | '재활용 컵';
};

export enum CoffeeEnum {
  americano = '아메리카노',
  au_lait = '카페 오레',
  latte = '카페 라떼',
  corretto = '코레또',
  espresso = '에스프레소',
  mocha = '카페 모카',
  cappuccino = '카푸치노',
  lungo = '룽고',
  macchiato = '마끼야또',
  ristretto = '리스트레또',
}

export default Coffee;
