export const drinkMap = {
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

export const drinkMenuList = Object.keys(drinkMap) as unknown as keyof typeof drinkMap;
export type DrinkMenuList = typeof drinkMenuList;
