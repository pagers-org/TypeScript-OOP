class Coffee {
  private static uniqueIdCounter = 0;

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

  private static list: Coffee[] = [];

  private orderId: number;

  private options: ICoffeeOption;

  public name: CoffeeEnum;
  private id: number;

  static getId = () => (this.uniqueIdCounter += 1);

  constructor(orderId: number) {
    this.orderId = orderId;
    this.id = Coffee.getId();
    this.options = Object.entries(Coffee.optionsList).reduce<ICoffeeOption>((acc, [key, values]) => {
      return { ...acc, [key]: values[Math.floor(Math.random() * values.length)] || '-' };
    }, {} as ICoffeeOption);

    Coffee.list.push(this);
  }

  public destroy() {
    Coffee.list = Coffee.list.filter(v => v.id !== this.id);
  }

  public updateOptions(params: { key: string; value: string }[]) {
    this.options = params.reduce((acc, { key, value }) => {
      const optionKey = key as keyof ICoffeeOption;
      const optionValue = value as ICoffeeOption[keyof ICoffeeOption];
      if (!Coffee.optionsList[optionKey].includes(optionValue))
        throw new Error(
          `${optionValue} 는 유효한 커피 옵션이 아니예요 🥲\n👉${Coffee.optionsList[optionKey].join(
            '\n👉',
          )}\n중에서 입력 해주세요 🙏`,
        );
      return {
        ...acc,
        [optionKey]: optionValue,
      };
    }, {} as ICoffeeOption);
  }

  public static getOptionTitle(optionName: string) {
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
    return COFFEE_OPTION_TITLE[optionName as keyof ICoffeeOption] || '';
  }

  public static optionTemplate = `${Object.entries(Coffee.optionsList)
    .map(([key]) => `<div class="cell">${Coffee.getOptionTitle(key)}</div>`)
    .join('')}`;

  public renderOptions = (editable: boolean) => {
    return Object.entries(this.options)
      .map(
        ([key, option]) =>
          `<div class="cell" ${editable ? 'contenteditable' : ''} data-title="${Coffee.getOptionTitle(
            key,
          )}" data-key="${key}">${option}</div>`,
      )
      .join('\n');
  };

  public static hasCoffeeInList(coffeeName: string) {
    return !!Coffee.list.find(c => c.name === CoffeeEnum[coffeeName as keyof typeof CoffeeEnum]);
  }
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
