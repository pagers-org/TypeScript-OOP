import type {
  MenuNameType,
  MenuSizeType,
  ShotType,
  SyrupType,
  TemporatureType,
  IceType,
  WippedCreamType,
  ExtraType,
  CupType,
  OrderInterface,
} from '../@types/index.js';

export class Order {
  private id: string;
  private menuName: MenuNameType;
  private size: MenuSizeType;
  private shot: ShotType;
  private syrup: SyrupType;
  private temporature: TemporatureType;
  private ice: IceType;
  private wippedCream: WippedCreamType;
  private extra: ExtraType;
  private cup: CupType;

  constructor(order: OrderInterface) {
    this.id = order.id;
    this.menuName = order.menuName;
    this.size = order.size;
    this.shot = order.shot;
    this.syrup = order.syrup;
    this.temporature = order.temporature;
    this.ice = order.ice;
    this.wippedCream = order.wippedCream;
    this.extra = order.extra;
    this.cup = order.cup;
  }

  get orderDatas(): OrderInterface {
    return {
      id: this.id,
      menuName: this.menuName,
      size: this.size,
      shot: this.shot,
      syrup: this.syrup,
      temporature: this.temporature,
      ice: this.ice,
      wippedCream: this.wippedCream,
      extra: this.extra,
      cup: this.cup,
    };
  }

  get orderId(): string {
    return this.id;
  }

  get orderMenuName(): MenuNameType {
    return this.menuName;
  }

  public updateOrder(updateData: any, index: number) {
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
