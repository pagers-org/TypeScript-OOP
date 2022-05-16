import { Api } from '@/domain';
import { getRandomRange } from '@/common';

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
      item.getOptions().forEach(option => option.setSelected(false));

      const idx = getRandomRange(0, item.getOptions().length - 1);

      item.getOptions()[idx].setSelected(true);

      return item;
    });
  }
}
