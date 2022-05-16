import {COFFEE, SIZE, SHOT, SYRUP, ICE_HOT, ICE, WHIPPED_CREAM, EXTRA, CUP} from "@/constant/coffee";

export type CoffeName = typeof COFFEE[keyof typeof COFFEE];
export type Size = typeof SIZE[keyof typeof SIZE];
export type Shot = typeof SHOT[keyof typeof SHOT];
export type Syrup = typeof SYRUP[keyof typeof SYRUP];
export type IceHot = typeof ICE_HOT[keyof typeof ICE_HOT];
export type Ice = typeof ICE[keyof typeof ICE];
export type WhippedCream = typeof WHIPPED_CREAM[keyof typeof WHIPPED_CREAM];
export type Extra = typeof EXTRA[keyof typeof EXTRA];
export type Cup = typeof CUP[keyof typeof CUP];

export interface CoffeeDTO {
  id: number;
  name: CoffeName;
  size: Size;
  shot: Shot;
  syrup?: Syrup;
  icehot: IceHot;
  ice: Ice;
  whippedcream?: WhippedCream;
  extra?: Extra;
  cup: Cup;
}