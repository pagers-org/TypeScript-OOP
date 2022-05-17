import { addCustomEventListener, dispatchCustomEvent } from '@/common';
import { EVENT } from '@/constant';
import { Component, MenuButton, Modal } from '@/components';
import { MenuView } from './MenuView';
import { Order } from '@/domain';

const CLASS_NAME_NONE_ORDER = 'none-order';

const MSG_ALERT = '주문을 추가하세요';

export class Menu extends Component {
  private $form!: HTMLElement;
  private $buttons!: HTMLElement;
  private $menuButtons: MenuButton[] = [];

  protected bindElements(): void {
    this.$form = this.$container.querySelector('.coffee-add-area form') as HTMLElement;
    this.$buttons = this.$container.querySelector('.select-coffee-container .buttons') as HTMLElement;
  }

  protected mounted(): void {
    this.createMenuButtons();
  }

  protected bindListeners(): void {
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

      if (this.cafe.isOpenModal()) {
        return;
      }

      if (this.cafe.isEmptyOrder()) {
        return alert(MSG_ALERT);
      }

      const order = this.cafe.firstOrder();
      const beverage = this.cafe.findBeverage(order.getBeverageId());

      (this.createComponent('cafe-modal') as Modal).open(order, beverage);
    });
  }

  private createMenuButtons(): void {
    this.cafe.menuItems().forEach(menuItem => {
      const $button = this.createMenuButton(menuItem.getBeverageId());

      this.$menuButtons.push($button);
      this.$buttons.appendChild($button);
    });
  }

  private createMenuButton(beverageId: number) {
    const beverage = this.cafe.findBeverage(beverageId);
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

  protected view(): string {
    return MenuView();
  }
}
