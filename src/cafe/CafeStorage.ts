import {
  Beverage,
  Option,
  OptionConstructor,
  OptionGroup,
  OptionGroups,
  Options,
  Order,
  Serving,
  ServingConstructor,
} from '@/domain';
import { Storage } from '@/cafe/storage/Storage';

const KEY_ORDERS = 'KEY_ORDERS';
const KEY_SERVINGS = 'KEY_SERVINGS';

export class CafeStorage {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  saveOrders(orders: Order[]) {
    this.storage.put(KEY_ORDERS, orders);
  }

  saveServings(servings: Serving[]) {
    this.storage.put(KEY_SERVINGS, servings);
  }

  getServings(): Serving[] {
    const servings = this.storage.get(KEY_SERVINGS, []);
    return servings.map((serving: ServingConstructor) => new Serving(serving));
  }

  getOrders(): Order[] {
    const orders = this.storage.get(KEY_ORDERS, []);

    return orders.map((item: any) => {
      const groups = item.optionGroups.optionGroups;
      const beverage = Beverage.fromObject(item.beverage);

      const optionGroups = groups.map((optionGroup: any) => {
        const optionList = optionGroup.options.options as OptionConstructor[];
        const options = optionList.map((option: OptionConstructor) => new Option(option));

        return new OptionGroup({ ...optionGroup, options: new Options({ options }) });
      });

      return new Order({ ...item, beverage, optionGroups: new OptionGroups({ optionGroups }) });
    });
  }
}
