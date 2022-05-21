import { COFFEE, ICE, COLD_HOT, SHOT, SIZE, SYRUP, CREAM, EXTRA, CUP } from '@/constant';

type CofeeType = typeof COFFEE[number];
type SizeType = typeof SIZE[number];
type ShotType = typeof SHOT[number];
type SyrupType = typeof SYRUP[number];
type IceOrHotType = typeof COLD_HOT[number];
type IceType = typeof ICE[number];
type CreamType = typeof CREAM[number];
type ExtraType = typeof EXTRA[number];
type CupType = typeof CUP[number];

export type OrdersType = Record<keyof CoffeeOrderType, CoffeeOrderType>;

export type CoffeeOrderType = {
  _id: string;
  menu: CofeeType;
  size: SizeType;
  cup: CupType;
  iceOrHot: IceOrHotType;
  shot: ShotType;
  ice?: IceType;
  cream?: CreamType;
  extra?: ExtraType;
  syrup?: SyrupType;
};

export type Material = {
  coffee: number;
  water?: number;
  hot_milk?: number;
  milk_foam?: number;
  liqur?: number;
  milk?: number;
  chocolate?: number;
  cream?: number;
};
