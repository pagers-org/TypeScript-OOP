import { COFFEE, SIZE, SHOT, ICE_HOT, CUP, SYRUP, ICE, WHIPPED_CREAM, EXTRA } from '../constant/coffee';

function random(coffeeMenuArr: string[]) {
  return Math.floor(Math.random() * coffeeMenuArr.length);
}
export function createRandomOrder(id: number) {
  return {
    id: id,
    name: COFFEE[random(COFFEE)],
    size: SIZE[random(SIZE)],
    shot: SHOT[random(SHOT)],
    iceHot: ICE_HOT[random(ICE_HOT)],
    cup: CUP[random(CUP)],
    ice: ICE[random(ICE)],
    syrup: SYRUP[random(SYRUP)],
    whippedCream: WHIPPED_CREAM[random(WHIPPED_CREAM)],
    extra: EXTRA[random(EXTRA)],
  };
}
