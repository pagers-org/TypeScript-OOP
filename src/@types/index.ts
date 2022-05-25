export type TMenuName =
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

export type TMenuSize = 'Tall' | 'Grande' | 'Venti';
export type TShot = '1샷' | '2샷' | '3샷';
export type TSyrup = '바닐라' | '헤이즐넛' | '카라멜';
export type TTemporature = 'ICE' | 'HOT';
export type TIce = '기본 얼음' | '각 얼음';
export type TWippedCream = '없음' | '보통' | '많이';
export type TExtra = '자바칩' | '카라멜드리즐' | '초코드리즐' | '아몬드' | '시나몬';
export type TCup = '1회용컵' | '텀블러' | '머그컵' | '재사용컵';

export interface IOrder {
  id: string;
  menuName: TMenuName;
  size: TMenuSize;
  shot: TShot;
  syrup: TSyrup;
  temporature: TTemporature;
  ice: TIce;
  wippedCream: TWippedCream;
  extra: TExtra;
  cup: TCup;
}
