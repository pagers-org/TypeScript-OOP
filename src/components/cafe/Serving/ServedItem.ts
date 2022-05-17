import { Component } from '@/components';
import { Serving } from '@/domain';
import { template } from './ServedItem.template';

export class ServedItem extends Component {
  private serving!: Serving;

  public setServing(serving: Serving) {
    this.serving = serving;
  }

  protected template(): string {
    return template(this.serving);
  }

  setNo(no: number) {
    const $el = this.$container.querySelector('[data-title="No"]') as HTMLElement;
    $el.textContent = `${no + 1}`;
  }
}
