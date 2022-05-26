import * as Option from "../../config/option";
import { generateRandomNumber } from "../../util/numberGenerator";

export default class Order {
  private no: number;
  private coffee: Option;
  private size: Option;
  private shot: Option;
  private syrup: Option;
  private iceOrHot: Option;
  private ice: Option;
  private whippingCream: Option;
  private extra: Option;
  private cup: Option;

  private isServed: boolean;

  constructor(no = 0) {
    this.no = no + 1;
    this.generateRandomOrder();
    this.isServed = false;
  }

  generateRandomOrder() {
    this.coffee = Option.COFFEE[generateRandomNumber(0, Option.COFFEE.length)];
    this.size = Option.SIZE[generateRandomNumber(0, Option.SIZE.length)];
    this.syrup = Option.SYRUP[generateRandomNumber(0, Option.SYRUP.length)];
    this.shot = Option.SHOT[generateRandomNumber(0, Option.SHOT.length)];
    this.iceOrHot =
      Option.ICE_OR_HOT[generateRandomNumber(0, Option.ICE_OR_HOT.length)];
    this.ice = Option.ICE[generateRandomNumber(0, Option.ICE.length)];
    this.whippingCream =
      Option.WHIPPING_CREAM[
        generateRandomNumber(0, Option.WHIPPING_CREAM.length)
      ];
    this.extra = Option.EXTRA[generateRandomNumber(0, Option.EXTRA.length)];
    this.cup = Option.CUP[generateRandomNumber(0, Option.CUP.length)];
  }

  makeRandomOrder() {
    return new Order();
  }
}
