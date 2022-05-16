import { pickRandomInArray } from './utils/random.js';

import { MenuName, MenuSize, Shot, Syrup, Temporature, Ice, WippedCream, Extra, Cup } from './@types/index.js';

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
    this.id = String(Math.floor(Math.random() * 100)); // TODO: 랜덤 값 생성
    this.menuName = pickRandomInArray<MenuName>([
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
    ]);
    this.size = pickRandomInArray<MenuSize>(['Grande', 'Tall', 'Venti']);
    this.shot = pickRandomInArray<Shot>(['1샷', '2샷', '3샷']);
    this.syrup = pickRandomInArray<Syrup>(['바닐라', '헤이즐넛', '카라멜']);
    this.temporature = pickRandomInArray<Temporature>(['ICE', 'HOT']);
    this.ice = pickRandomInArray<Ice>(['기본 얼음', '각 얼음']);
    this.wippedCream = pickRandomInArray<WippedCream>(['없음', '보통', '많이']);
    this.extra = pickRandomInArray<Extra>(['시나몬', '아몬드', '자바칩', '초코드리즐', '카라멜드리즐']);
    this.cup = pickRandomInArray<Cup>(['1회용컵', '머그컵', '재사용컵', '텀블러']);
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
