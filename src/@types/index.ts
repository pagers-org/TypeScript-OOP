import { COFFEE, ICE, COLD_HOT, SHOT, SIZE, SYRUP, CREAM, EXTRA, CUP } from '../constant';

type CoffeMenuType = typeof COFFEE[number];
type SizeType = typeof SIZE[number];
type ShotType = typeof SHOT[number];
type SyrupType = typeof SYRUP[number];
type IceOrHotType = typeof COLD_HOT[number];
type IceType = typeof ICE[number];
type CreamType = typeof CREAM[number];
type ExtraType = typeof EXTRA[number];
type CupType = typeof CUP[number];

export type OrderItemType = {
  _id: string;
  menu: CoffeMenuType;
  size: SizeType;
  cup: CupType;
  iceOrHot: IceOrHotType;
  shot: ShotType;
  ice?: IceType;
  cream?: CreamType;
  extra?: ExtraType;
  syrup?: SyrupType;
};
