import { BaseComponent } from '@/components';
import { Serving } from '@/domain';
import { ServedItemView } from './ServedItemView';
import { Component } from '@/common';

@Component('cafe-served-item')
export class ServedItem extends BaseComponent {
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
