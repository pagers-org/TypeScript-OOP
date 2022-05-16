import { Cup, Extra, Ice, MenuName, MenuSize, Shot, Syrup, Temporature, WippedCream } from '../@types';

export const MENU_NAME: MenuName[] = [
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

export const MENU_SIZE: MenuSize[] = ['Grande', 'Tall', 'Venti'];

export const MENU_SHOT: Shot[] = ['1샷', '2샷', '3샷'];

export const MENU_SYRUP: Syrup[] = ['바닐라', '헤이즐넛', '카라멜'];

export const MENU_TEMPORATURE: Temporature[] = ['ICE', 'HOT'];

export const MENU_ICE: Ice[] = ['기본 얼음', '각 얼음'];

export const MENU_WIPPED_CREAM: WippedCream[] = ['없음', '보통', '많이'];

export const MENU_EXTRA: Extra[] = ['시나몬', '아몬드', '자바칩', '초코드리즐', '카라멜드리즐'];

export const MENU_CUP: Cup[] = ['1회용컵', '머그컵', '재사용컵', '텀블러'];
