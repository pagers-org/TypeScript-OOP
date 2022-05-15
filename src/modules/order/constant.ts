export const SIZE = Object.freeze({
  GRANDE: 'Grande',
  TALL: 'Tall',
  VENTI: 'Venti',
} as const);
export const SIZE_LIST = Object.values(SIZE);

export const SHOT = Object.freeze({
  ONE: '1샷',
  TWO: '2샷',
  THREE: '3샷',
} as const);
export const SHOT_LIST = Object.values(SHOT);

export const SYRUP = Object.freeze({
  VANILLA: '바닐라',
  HAZELNUT: '헤이즐넛',
  CARAMEL: '카라멜',
} as const);
export const SYRUP_LIST = Object.values(SYRUP);

export const ICE = Object.freeze({
  NORMAL: '기본 얼음',
  SQUARE: '각 얼음',
} as const);
export const ICE_LIST = Object.values(ICE);

export const WHIPPED_CREAM = Object.freeze({
  NONE: '없음',
  NORMAL: '적당히',
  EXTRA: '많음',
} as const);
export const WHIPPED_CREAM_LIST = Object.values(WHIPPED_CREAM);

export const EXTRA_OPTION = Object.freeze({
  JAVA: '자바칩',
  CARAMEL: '카라멜 드리즐',
  CHOCO: '초코 드리즐',
  ALMOND: '아몬드',
  CINNAMON: '시나몬',
});
export const EXTRA_OPTION_LIST = Object.values(EXTRA_OPTION);

export const CUP = Object.freeze({
  DISPOSABLE: '일회용',
  TUMBLER: '텀블러',
  MUG: '머그컵',
  REUSE: '재활용 컵',
} as const);
export const CUP_LIST = Object.values(CUP);
