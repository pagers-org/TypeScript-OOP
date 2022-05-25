import { pickRandomInArray, pickRandomUniqueId } from '../utils/random.js';
import { ORDER } from '../constants/index.js';

import {
  MenuNameType,
  MenuSizeType,
  ShotType,
  SyrupType,
  TemporatureType,
  IceType,
  WippedCreamType,
  ExtraType,
  CupType,
} from '../@types/index.js';

class Order {
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

  constructor() {
    this.id = pickRandomUniqueId();
    this.menuName = pickRandomInArray<MenuNameType>(ORDER.MENU_NAME);
    this.size = pickRandomInArray<MenuSizeType>(ORDER.MENU_SIZE);
    this.shot = pickRandomInArray<ShotType>(ORDER.MENU_SHOT);
    this.syrup = pickRandomInArray<SyrupType>(ORDER.MENU_SYRUP);
    this.temporature = pickRandomInArray<TemporatureType>(ORDER.MENU_TEMPORATURE);
    this.ice = pickRandomInArray<IceType>(ORDER.MENU_ICE);
    this.wippedCream = pickRandomInArray<WippedCreamType>(ORDER.MENU_WIPPED_CREAM);
    this.extra = pickRandomInArray<ExtraType>(ORDER.MENU_EXTRA);
    this.cup = pickRandomInArray<CupType>(ORDER.MENU_CUP);
  }

  // TODO: any 고쳐야함
  updateOrder(updateData: any, index: number) {
    switch (index) {
      case 0:
        this.id = updateData;
        break;
      case 1:
        this.menuName = updateData;
        break;
      case 2:
        this.size = updateData;
        break;
      case 3:
        this.shot = updateData;
        break;
      case 4:
        this.syrup = updateData;
        break;
      case 5:
        this.temporature = updateData;
        break;
      case 6:
        this.ice = updateData;
        break;
      case 7:
        this.wippedCream = updateData;
        break;
      case 8:
        this.extra = updateData;
        break;
      case 9:
        this.cup = updateData;
        break;
      default:
        return;
    }
  }
}

export default Order;
