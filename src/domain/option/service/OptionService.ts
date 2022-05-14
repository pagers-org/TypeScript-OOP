import { Api } from '@/domain';
import { getRandomRange } from '@/common';

export class OptionService {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public getOptionGroups() {
    return this.api.getOptionGroups();
  }

  public createRandomSelectedOptionGroups() {
    return this.getOptionGroups().map(item => {
      item.options.forEach(option => (option.selected = false));

      const idx = getRandomRange(0, item.options.length - 1);

      item.options[idx].selected = true;

      return item;
    });
  }
}
