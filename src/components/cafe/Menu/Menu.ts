import { addCustomEventListener } from '@/common';
import { EVENT } from '@/events';
import { Component, MenuButton, Modal } from '@/components';
import { MenuView } from './MenuView';
import { Order } from '@/domain';

const CLASS_NAME_NONE_ORDER = 'none-order';

const MSG_ALERT = '주문을 추가하세요';

export class Menu extends Component {
  private $form!: HTMLElement;
  private $buttons!: HTMLElement;
  private $menuButtons: MenuButton[] = [];
  private modalOpened = false;

  protected bindElements(): void {
    this.$form = this.$container.querySelector('.coffee-add-area form') as HTMLElement;
    this.$buttons = this.$container.querySelector('.select-coffee-container .buttons') as HTMLElement;
  }

  protected mounted(): void {
    this.createMenuButtons();
  }

  protected bindListeners(): void {
    addCustomEventListener(EVENT.MODAL_OPEN, e => {
      this.modalOpened = e.detail.opened;
    });

    addCustomEventListener(EVENT.ORDER_ADDED, e => {
      e.preventDefault();

      this.showAndActiveMenu(e.detail.order);
    });

    addCustomEventListener(EVENT.ORDER_REMOVED, e => {
      e.preventDefault();

      this.hideAndUnActiveMenu(e.detail.order);
    });
  }

  protected bindEvents(): void {
    this.$form.addEventListener('submit', event => {
      event.preventDefault();

      this.openModal();
    });
  }

  private async createMenuButtons() {
    const menuItems = await this.cafe.getMenuItems();

    for (const menuItem of menuItems) {
      const $button = await this.createMenuButton(menuItem.getBeverageId());

      this.$menuButtons.push($button);
      this.$buttons.appendChild($button);
    }
  }

  private async createMenuButton(beverageId: number) {
    const beverage = await this.cafe.findBeverage(beverageId);
    const $button = this.createComponent('cafe-menu-button') as MenuButton;

    $button.setMenuId(beverage.getId());
    $button.setMenuName(beverage.getName());

    return $button;
  }

  private showAndActiveMenu(order: Order): void {
    this.show();
    this.findMenuButton(order.getBeverageId()).active();
  }

  private hideAndUnActiveMenu(order: Order): void {
    if (this.cafe.isEmptyOrder()) {
      this.hide();
    }

    if (this.cafe.isEmptyOrderGroup(order.getBeverageId())) {
      this.findMenuButton(order.getBeverageId()).unActive();
    }
  }

  private findMenuButton(beverageId: number): MenuButton {
    return this.$menuButtons.find(button => button.getMenuId() === beverageId) as MenuButton;
  }

  private hide(): void {
    this.$container.classList.add(CLASS_NAME_NONE_ORDER);
  }

  private show(): void {
    this.$container.classList.remove(CLASS_NAME_NONE_ORDER);
  }

  private async openModal() {
    if (this.modalOpened) {
      return;
    }

    if (this.cafe.isEmptyOrder()) {
      return alert(MSG_ALERT);
    }

    const order = this.cafe.firstOrder();
    const beverage = await this.cafe.findBeverage(order.getBeverageId());
    const $modal = this.createComponent('cafe-modal') as Modal;
    $modal.open(order, beverage);
  }

  protected view(): string {
    return MenuView();
  }
}
