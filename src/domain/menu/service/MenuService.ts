import { Menu, MenuItem, Api } from '@/domain';

export class MenuService {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public getMenu() {
    return new Menu(this.api.getBeverages().map(item => new MenuItem(item.id)));
  }
}
