import { pickRandomInArray, pickRandomUniqueId } from '../utils/random.js';
import { ORDER } from '../constants/index.js';

import {
  TMenuName,
  TMenuSize,
  TShot,
  TSyrup,
  TTemporature,
  TIce,
  TWippedCream,
  TExtra,
  TCup,
} from '../@types/index.js';

class Order {
  id: string;
  menuName: TMenuName;
  size: TMenuSize;
  shot: TShot;
  syrup: TSyrup;
  temporature: TTemporature;
  ice: TIce;
  wippedCream: TWippedCream;
  extra: TExtra;
  cup: TCup;

  constructor() {
    this.id = pickRandomUniqueId();
    this.menuName = pickRandomInArray<TMenuName>(ORDER.MENU_NAME);
    this.size = pickRandomInArray<TMenuSize>(ORDER.MENU_SIZE);
    this.shot = pickRandomInArray<TShot>(ORDER.MENU_SHOT);
    this.syrup = pickRandomInArray<TSyrup>(ORDER.MENU_SYRUP);
    this.temporature = pickRandomInArray<TTemporature>(ORDER.MENU_TEMPORATURE);
    this.ice = pickRandomInArray<TIce>(ORDER.MENU_ICE);
    this.wippedCream = pickRandomInArray<TWippedCream>(ORDER.MENU_WIPPED_CREAM);
    this.extra = pickRandomInArray<TExtra>(ORDER.MENU_EXTRA);
    this.cup = pickRandomInArray<TCup>(ORDER.MENU_CUP);
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
