import { BaseComponent } from '@/components';
import { ServedView } from './ServedView';
import { Serving } from '@/domain';
import { addCustomEventListener, Component } from '@/common';
import { EVENT } from '@/constant';
import { ServedItem } from '@/components/cafe/Serving/Item/ServedItem';

@Component('cafe-served')
export class Served extends BaseComponent {
  private $makedTable!: HTMLElement;
  private $servedList: ServedItem[] = [];

  protected bindElements() {
    this.$makedTable = this.$container.querySelector('#maked-table') as HTMLElement;
  }

  protected bindListeners() {
    addCustomEventListener(EVENT.SERVED, e => {
      const serving = e.detail.serving as Serving;
      this.add(serving);
      this.updateListNo();
    });
  }

  private add(serving: Serving) {
    const servingElement = this.createComponent('cafe-served-item') as ServedItem;
    servingElement.setServing(serving);

    this.$servedList.push(servingElement);
    this.$makedTable.appendChild(servingElement);
  }

  private updateListNo() {
    this.$servedList.forEach((servedItem, index) => {
      servedItem.setNo(index);
    });
  }

  protected view() {
    return ServedView();
  }
}
