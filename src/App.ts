import { ApiImpl, BeverageService, Menu, MenuService, OptionService, Orders } from '@/domain';

export class App {
  public orders: Orders;
  public beverageService: BeverageService;
  public optionService: OptionService;
  public menuService: MenuService;
  public menu: Menu;

  constructor() {
    const api = new ApiImpl();
    this.orders = new Orders();
    this.beverageService = new BeverageService(api);
    this.optionService = new OptionService(api);
    this.menuService = new MenuService(api);
    this.menu = this.menuService.getMenu();
  }
}
