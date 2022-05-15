export const MENU = Object.freeze({
  AMERICANO: '아메리카노',
  CAFEORE: '카페오레',
  CAPPUCCINO: '카푸치노',
  CORRETTO: '코레또',
  ESPRESSO: '에스프레소',
  LATTE: '카페라떼',
  LUNGO: '룽고',
  MACCHIATO: '마끼야또',
  MOCHA: '카페모카',
  RISTRETTO: '리스트레토',
} as const);
export const MENU_LIST = Object.values(MENU);
