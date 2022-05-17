import { Component } from '@/components';
import { template } from './Served.template';
import { Serving } from '@/domain';
import { addCustomEventListener, createElement } from '@/common';
import { EVENT } from '@/constant';
import { getBeverageById } from '@/cafe';

export class Served extends Component {
  private $makedTable!: HTMLElement;
  private $servedList: HTMLElement[] = [];

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
    const servingElement = this.createServingElement(serving);

    this.$servedList.push(servingElement);
    this.$makedTable.appendChild(servingElement);
  }

  private updateListNo() {
    this.$servedList.forEach((served, index) => {
      const $el = served.querySelector('[data-title="No"]') as HTMLElement;
      $el.textContent = `${index + 1}`;
    });
  }

  private createServingElement(serving: Serving) {
    const beverage = getBeverageById(serving.getBeverageId());

    return createElement(`
    <div class="table-row" data-id='${serving.getOrderId()}'>
      <div class="cell" data-title="No"></div>
      <div class="cell" data-title="메뉴">${beverage.getName()}</div>
      <div class="cell" data-title="최근 주문 시간">${serving.getOrderTime()}</div>
      <div class="cell" data-title="최근 서빙 완료 시간">${serving.getServingTime()}</div>
    </div>
    `);
  }

  protected template() {
    return template();
  }
}
