import {
  CupType,
  ExtraType,
  IceType,
  MenuNameType,
  MenuSizeType,
  ShotType,
  SyrupType,
  TemporatureType,
  WippedCreamType,
} from '../@types';

export const MENU_NAME: MenuNameType[] = [
  '룽고',
  '리스트레또',
  '마끼야또',
  '아메리카노',
  '에스프레소',
  '카페 라떼',
  '카페 모카',
  '카페 오레',
  '카푸치노',
  '코레또',
];

export const MENU_SIZE: MenuSizeType[] = ['Grande', 'Tall', 'Venti'];

export const MENU_SHOT: ShotType[] = ['1샷', '2샷', '3샷'];

export const MENU_SYRUP: SyrupType[] = ['바닐라', '헤이즐넛', '카라멜'];

export const MENU_TEMPORATURE: TemporatureType[] = ['ICE', 'HOT'];

export const MENU_ICE: IceType[] = ['기본 얼음', '각 얼음'];

export const MENU_WIPPED_CREAM: WippedCreamType[] = ['없음', '보통', '많이'];

export const MENU_EXTRA: ExtraType[] = ['시나몬', '아몬드', '자바칩', '초코드리즐', '카라멜드리즐'];

export const MENU_CUP: CupType[] = ['1회용컵', '머그컵', '재사용컵', '텀블러'];
