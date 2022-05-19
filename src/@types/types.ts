import { Order, Serving } from '@/domain';
import { MenuButton } from '@/components';

export const MATERIAL_NAMES = ['물', '커피', '우유', '데운 우유', '밀크 폼', '리퀴르', '초콜릿', '휘핑 크림'] as const;

export const BEVERAGE_NAMES = [
  '아메리카노',
  '카페오레',
  '카푸치노',
  '코레또',
  '에스프레소',
  '카페 라떼',
  '룽고',
  '마끼야또',
  '카페 모카',
  '리스트레또',
] as const;

export const OPTION_GROUP_NAMES = [
  '사이즈',
  '얼음 종류',
  '샷',
  '휘핑 크림',
  '시럽',
  '엑스트라',
  'ICE/HOT',
  '컵',
] as const;

export const OPTION_NAMES = [
  'Tall',
  'Grande',
  'Venti',
  '기본 얼음',
  '각 얼음',
  '1샷',
  '2샷',
  '3샷',
  '없음',
  '적당히',
  '많이',
  '바닐라',
  '헤이즐넛',
  '카라멜',
  '자바칩',
  '카라멜 드리즐',
  '초코 드리즐',
  '아몬드',
  '시나몬',
  'ICE',
  'HOT',
  '1회용 컵',
  '텀블러',
  '머그컵',
  '재활용 컵',
];

export type OptionGroupName = typeof OPTION_GROUP_NAMES[number];
export type MaterialName = typeof MATERIAL_NAMES[number];
export type BeverageName = typeof BEVERAGE_NAMES[number];
export type OptionName = typeof OPTION_NAMES[number];

export type OrderChangeType = {
  order: Order;
  groupName: OptionGroupName;
  value: string;
};

export interface CustomEventListener {
  (evt: CustomEvent): void;
}

export type EventListenArg<T> = {
  (param: T): void;
};

export type OrderAddDetail = {
  order: Order;
};

export type OrderRemovedDetail = {
  order: Order;
};

export type BeforeServingDetail = {
  order: Order;
  serving: Serving;
};

export type AfterServingDetail = {
  serving: Serving;
};

export type MenuButtonClickDetail = {
  button: MenuButton;
};

export type OptionChangedDetail = {
  order: Order;
  groupName: OptionGroupName;
  value: string;
};

export type ModalOpenDetail = {
  opened: boolean;
};
