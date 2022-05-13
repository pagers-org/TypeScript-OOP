import { pickRandomInArray } from './utils/random.js';

import { IOrder, MenuName, MenuSize, Shot, Syrup, Temporature, Ice, WippedCream, Extra, Cup } from './@types/index.js';

class Order {
  #id: number;
  #menuName: MenuName;
  #size: MenuSize;
  #shot: Shot;
  #syrup: Syrup;
  #temporature: Temporature;
  #ice: Ice;
  #wippedCream: WippedCream;
  #extra: Extra;
  #cup: Cup;

  constructor() {
    this.#id = Math.floor(Math.random() * 100); // TODO: 랜덤 값 생성
    this.#menuName = pickRandomInArray<MenuName>([
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
    this.#size = pickRandomInArray<MenuSize>(['Grande', 'Tall', 'Venti']);
    this.#shot = pickRandomInArray<Shot>(['1샷', '2샷', '3샷']);
    this.#syrup = pickRandomInArray<Syrup>(['바닐라', '헤이즐넛', '카라멜']);
    this.#temporature = pickRandomInArray<Temporature>(['ICE', 'HOT']);
    this.#ice = pickRandomInArray<Ice>(['기본 얼음', '각 얼음']);
    this.#wippedCream = pickRandomInArray<WippedCream>(['없음', '보통', '많이']);
    this.#extra = pickRandomInArray<Extra>(['시나몬', '아몬드', '자바칩', '초코드리즐', '카라멜드리즐']);
    this.#cup = pickRandomInArray<Cup>(['1회용컵', '머그컵', '재사용컵', '텀블러']);
  }

  getOrder(): IOrder {
    return {
      id: this.#id,
      menuName: this.#menuName,
      size: this.#size,
      shot: this.#shot,
      syrup: this.#syrup,
      temporature: this.#temporature,
      ice: this.#ice,
      wippedCream: this.#wippedCream,
      extra: this.#extra,
      cup: this.#cup,
    };
  }
}

export default Order;
