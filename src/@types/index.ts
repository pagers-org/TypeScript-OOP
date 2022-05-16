export interface IOrder {
  id: string;
  menuName: MenuName;
  size: MenuSize;
  shot: Shot;
  syrup: Syrup;
  temporature: Temporature;
  ice: Ice;
  wippedCream: WippedCream;
  extra: Extra;
  cup: Cup;
}

export type MenuName =
  | '아메리카노'
  | '카페 오레'
  | '카푸치노'
  | '코레또'
  | '에스프레소'
  | '카페 라떼'
  | '룽고'
  | '마끼야또'
  | '카페 모카'
  | '리스트레또';

export type MenuSize = 'Tall' | 'Grande' | 'Venti';
export type Shot = '1샷' | '2샷' | '3샷';
export type Syrup = '바닐라' | '헤이즐넛' | '카라멜';
export type Temporature = 'ICE' | 'HOT';
export type Ice = '기본 얼음' | '각 얼음';
export type WippedCream = '없음' | '보통' | '많이';
export type Extra = '자바칩' | '카라멜드리즐' | '초코드리즐' | '아몬드' | '시나몬';
export type Cup = '1회용컵' | '텀블러' | '머그컵' | '재사용컵';
