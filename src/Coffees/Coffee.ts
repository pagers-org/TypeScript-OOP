class Coffee {
  static optionsList: Record<keyof ICoffeeOption, Array<ICoffeeOption[keyof ICoffeeOption]>> = {
    size: ['Tall', 'Grande', 'Venti'],
    shot: [1, 2, 3],
    syrup: ['바닐라', '헤이즐넛', '카라멜', null],
    hotOrIce: ['ICE', 'HOT'],
    iceType: ['기본얼음', '각얼음', null],
    whippedCream: ['없음', '적당히', '많이'],
    extra: ['자바칩', '카라멜드리즐', '초코드리즐', '아몬드', '시나몬', null],
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

export type ICoffeeOption = {
  size: 'Tall' | 'Grande' | 'Venti';
  shot: 1 | 2 | 3;
  syrup: '바닐라' | '헤이즐넛' | '카라멜' | null;
  hotOrIce: 'ICE' | 'HOT';
  iceType: '기본얼음' | '각얼음' | null;
  whippedCream: '없음' | '적당히' | '많이';
  extra: '자바칩' | '카라멜드리즐' | '초코드리즐' | '아몬드' | '시나몬' | null;
  cup: '1회용 컵' | '텀블러' | '머그컵' | '재활용 컵';
};

export enum CoffeeEnum {
  Americano = '아메리카노',
  CafeAuLait = '카페 오레',
  CafeLatte = '카페 라떼',
  CafeMocha = '카페 모카',
  Cappuccino = '카푸치노',
  Corretto = '코레또',
  Espresso = '에스프레소',
  Lungo = '룽고',
  Macchiato = '마끼야또',
  Ristretto = '리스트레또',
}

export default Coffee;
