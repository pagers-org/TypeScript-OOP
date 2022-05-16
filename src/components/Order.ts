import { pickRandomInArray, pickRandomUniqueId } from '../utils/random.js';
import { ORDER } from '../constants/index.js';

import { MenuName, MenuSize, Shot, Syrup, Temporature, Ice, WippedCream, Extra, Cup } from '../@types/index.js';

class Order {
  id: string;
  menuName: MenuName;
  size: MenuSize;
  shot: Shot;
  syrup: Syrup;
  temporature: Temporature;
  ice: Ice;
  wippedCream: WippedCream;
  extra: Extra;
  cup: Cup;

  constructor() {
    this.id = pickRandomUniqueId();
    this.menuName = pickRandomInArray<MenuName>(ORDER.MENU_NAME);
    this.size = pickRandomInArray<MenuSize>(ORDER.MENU_SIZE);
    this.shot = pickRandomInArray<Shot>(ORDER.MENU_SHOT);
    this.syrup = pickRandomInArray<Syrup>(ORDER.MENU_SYRUP);
    this.temporature = pickRandomInArray<Temporature>(ORDER.MENU_TEMPORATURE);
    this.ice = pickRandomInArray<Ice>(ORDER.MENU_ICE);
    this.wippedCream = pickRandomInArray<WippedCream>(ORDER.MENU_WIPPED_CREAM);
    this.extra = pickRandomInArray<Extra>(ORDER.MENU_EXTRA);
    this.cup = pickRandomInArray<Cup>(ORDER.MENU_CUP);
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
