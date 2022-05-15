import { CUP, EXTRA_OPTION, ICE, SHOT, SIZE, SYRUP, WHIPPED_CREAM } from '@/modules/order/constant';

export type SizeType = typeof SIZE[keyof typeof SIZE];

export type ShotType = typeof SHOT[keyof typeof SHOT];

export type SyrupType = typeof SYRUP[keyof typeof SYRUP];

export type TemperatureType = 'ICE' | 'HOT';

export type IceType = typeof ICE[keyof typeof ICE];

export type WhippedCreamType = typeof WHIPPED_CREAM[keyof typeof WHIPPED_CREAM];

export type ExtraOptionType = typeof EXTRA_OPTION[keyof typeof EXTRA_OPTION];

export type CupType = typeof CUP[keyof typeof CUP];

export interface OrderType {
  id: string;
  menuName: string;
  size: SizeType;
  shot: ShotType;
  syrup: SyrupType;
  temperature: TemperatureType;
  ice: IceType;
  whippedCream: WhippedCreamType;
  extraOption: ExtraOptionType;
  cup: CupType;
}
