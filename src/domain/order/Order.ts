import { Beverage, OptionGroups } from '@/domain';
import { OptionGroupName, OptionName } from '@/@types';

export type OrderConstructor = {
  id: string;
  beverage: Beverage;
  optionGroups?: OptionGroups;
  orderTime?: Date;
};

export class Order {
  private readonly id: string;
  private readonly beverage: Beverage;
  private readonly optionGroups: OptionGroups;
  private readonly orderTime: Date;

  constructor(constructor: OrderConstructor) {
    this.id = constructor.id;
    this.beverage = constructor.beverage;
    this.optionGroups = constructor.optionGroups || new OptionGroups();
    this.orderTime = constructor.orderTime || new Date();
  }

  public validate() {
    this.optionGroups.validate();
  }

  public setSelectedOptionValue(groupName: OptionGroupName, value: string): void {
    this.optionGroups.setSelectedOptionValue(groupName, value);
  }

  public getSelectedOptionValue(groupName: OptionGroupName): string {
    return this.optionGroups.getSelectedOptionValue(groupName);
  }

  public isSelectedOptionEquals(groupName: OptionGroupName, target: OptionName): boolean {
    return this.optionGroups.isSelectedOptionEquals(groupName, target);
  }

  public getBeverageId() {
    return this.beverage.getId();
  }

  public getBeverageName() {
    return this.beverage.getName();
  }

  public getId() {
    return this.id;
  }

  public getOrderTime() {
    return this.orderTime;
  }
}
