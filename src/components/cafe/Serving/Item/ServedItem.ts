import { Component } from '@/components';
import { Serving } from '@/domain';
import { ServedItemView } from './ServedItemView';

export class ServedItem extends Component {
  private serving!: Serving;

  public setServing(serving: Serving) {
    this.serving = serving;
  }

  public setNo(no: number) {
    const $el = this.$container.querySelector('[data-title="No"]') as HTMLElement;
    $el.textContent = `${no + 1}`;
  }

  protected view(): string {
    return ServedItemView(this.serving);
  }
}
