import { Component } from '@/components';
import { template } from './Served.template';
import { Serving } from '@/domain';
import { addCustomEventListener } from '@/common';
import { EVENT } from '@/constant';
import { ServedItem } from '@/components/cafe/Serving/ServedItem';

export class Served extends Component {
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
    const servingElement = document.createElement('cafe-served-item') as ServedItem;
    servingElement.setServing(serving);
    servingElement.setCafe(this.cafe);

    this.$servedList.push(servingElement);
    this.$makedTable.appendChild(servingElement);
  }

  private updateListNo() {
    this.$servedList.forEach((servedItem, index) => {
      servedItem.setNo(index);
    });
  }

  protected template() {
    return template();
  }
}
