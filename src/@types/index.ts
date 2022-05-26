export type MenuNameType =
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

export type MenuSizeType = 'Tall' | 'Grande' | 'Venti';
export type ShotType = '1샷' | '2샷' | '3샷';
export type SyrupType = '바닐라' | '헤이즐넛' | '카라멜';
export type TemporatureType = 'ICE' | 'HOT';
export type IceType = '기본 얼음' | '각 얼음';
export type WippedCreamType = '없음' | '보통' | '많이';
export type ExtraType = '자바칩' | '카라멜드리즐' | '초코드리즐' | '아몬드' | '시나몬';
export type CupType = '1회용컵' | '텀블러' | '머그컵' | '재사용컵';

export interface OrderInterface {
  id: string;
  menuName: MenuNameType;
  size: MenuSizeType;
  shot: ShotType;
  syrup: SyrupType;
  temporature: TemporatureType;
  ice: IceType;
  wippedCream: WippedCreamType;
  extra: ExtraType;
  cup: CupType;
}
