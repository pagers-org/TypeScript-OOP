import * as Option from "@/types/config/option";
import { generateRandomNumber } from "@/types/util";

export default class Order {
  private coffee: Option;
  private size: Option;
  private syrup: Option;
  private iceOrHot: Option;
  private ice: Option;
  private whippingCream: Option;
  private extra: Option;
  private cup: Option;

  private isServed: boolean;

  constructor() {
    this.generateRandomOrder();
    this.isServed = false;
  }

  generateRandomOrder() {
    this.coffee = Option.COFFEE[generateRandomNumber];
    this.size = Option.SIZE[generateRandomNumber];
    this.syrup = Option.SYRUP[generateRandomNumber];
    this.iceOrHot = Option.ICE_OR_HOT[generateRandomNumber];
    this.ice = Option.ICE[generateRandomNumber];
    this.whippingCream = Option.WHIPPING_CREAM[generateRandomNumber];
    this.extra = Option.EXTRA[generateRandomNumber];
    this.cup = Option.CUP[generateRandomNumber];
  }

  makeRandomOrder() {
    return new Order();
  }
}
