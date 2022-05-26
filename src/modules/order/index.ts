import {
  CupType,
  ExtraOptionType,
  IceType,
  ShotType,
  SizeType,
  SyrupType,
  TemperatureType,
  WhippedCreamType,
} from '@/modules/order/type';
import { MenuType } from '@/modules/menu/type';
import { getRandomID, getRandomValue } from '@/util/getRandom';
import {
  CUP_LIST,
  EXTRA_OPTION_LIST,
  ICE_LIST,
  SHOT_LIST,
  SIZE_LIST,
  SYRUP_LIST,
  WHIPPED_CREAM_LIST,
} from '@/modules/order/constant';
import { MENU_LIST } from '@/modules/menu/constant';

export default class Order {
  id: string;
  menuName: MenuType;
  size: SizeType;
  shot: ShotType;
  syrup: SyrupType;
  temperature: TemperatureType;
  ice: IceType;
  whippedCream: WhippedCreamType;
  extraOption: ExtraOptionType;
  cup: CupType;

  constructor() {
    this.id = getRandomID();
    this.menuName = getRandomValue(MENU_LIST) as MenuType;
    this.size = getRandomValue(SIZE_LIST) as SizeType;
    this.shot = getRandomValue(SHOT_LIST) as ShotType;
    this.syrup = getRandomValue(SYRUP_LIST) as SyrupType;
    this.temperature = getRandomValue(['ICE', 'HOT']) as TemperatureType;
    this.ice = getRandomValue(ICE_LIST) as IceType;
    this.whippedCream = getRandomValue(WHIPPED_CREAM_LIST) as WhippedCreamType;
    this.extraOption = getRandomValue(EXTRA_OPTION_LIST) as ExtraOptionType;
    this.cup = getRandomValue(CUP_LIST) as CupType;
  }
}
