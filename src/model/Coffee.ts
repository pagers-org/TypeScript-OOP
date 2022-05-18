class Coffee {
  name: string;
  id: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

const COFEE_IDS = {
  americano: 'americano',
  au_lait: 'au_lait',
  capuccino: 'capuccino',
  corretto: 'corretto',
  espresso: 'espresso',
  latte: 'latte',
  lungo: 'lungo',
  macchiato: 'macchiato',
  mocha: 'mocha',
  ristretto: 'ristretto',
} as const;

export const COFFE_NAMES: Record<keyof typeof COFEE_IDS, string> = {
  americano: '아메리카노',
  au_lait: '카페 오레',
  capuccino: '카푸치노',
  corretto: '코레또',
  espresso: '에스프레소',
  latte: '카페 라떼',
  lungo: '룽고',
  macchiato: '마끼야또',
  mocha: '카페모카',
  ristretto: '리스트레또',
};

export default Coffee;
