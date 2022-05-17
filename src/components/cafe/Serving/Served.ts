import { Component } from '@/components';
import { template } from './Served.template';
import { Serving } from '@/domain';
import { addCustomEventListener } from '@/common';
import { EVENT } from '@/constant';

export class Served extends Component {
  private $makedTable!: HTMLElement;
  private $servedList: HTMLElement[] = [];

  protected initElements() {
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
    const servingElement = serving.toElement();

    this.$servedList.push(servingElement);
    this.$makedTable.appendChild(servingElement);
  }

  private updateListNo() {
    this.$servedList.forEach((served, index) => {
      const $el = served.querySelector('[data-title="No"]') as HTMLElement;
      $el.textContent = `${index + 1}`;
    });
  }

  protected template() {
    return template();
  }
}
