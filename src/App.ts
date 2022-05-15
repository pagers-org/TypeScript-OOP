import { ApiImpl, BeverageService, Menu, MenuService, OptionService, Orders } from '@/domain';
import { EVENT } from '@/constant';

const api = new ApiImpl();
export const beverageService = new BeverageService(api);
export const optionService = new OptionService(api);
export const menuService = new MenuService(api);

export class Store {
  public orders: Orders;
  public menu: Menu;

  constructor() {
    this.orders = new Orders();
    this.menu = menuService.getMenu();
  }
}

export class App {
  constructor() {
    const store = new Store();

    addEventListener(EVENT.COMPONENT_INITIALIZE, e => {
      const { component } = (e as CustomEvent).detail;
      component.setStore(store);
    });
  }
}
