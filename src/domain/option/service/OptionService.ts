import { Api } from '@/domain';

export class OptionService {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  private getOptionGroups() {
    return this.api.getOptionGroups();
  }

  public createRandomSelectedOptionGroups() {
    return this.getOptionGroups().map(item => {
      item.resetSelected();
      item.randomSelected();

      return item;
    });
  }
}
