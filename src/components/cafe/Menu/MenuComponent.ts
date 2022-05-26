import { Component, MenuButton, Modal } from '@/components';
import { MenuView } from './MenuView';
import { Beverage, Order } from '@/domain';
import { CUSTOM_ELEMENTS, eventListener } from '@/main';
import { createMenu } from '@/common';

const CLASS_NAME_NONE_ORDER = 'none-order';

const MSG_ALERT = '주문을 추가하세요';

export class MenuComponent extends Component {
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
    eventListener
      .modalOpen(({ opened }) => {
        this.modalOpened = opened;
      })
      .orderAdded(({ order }) => {
        this.showAndActiveMenu(order);
      })
      .orderRemoved(({ order }) => {
        this.hideAndUnActiveMenu(order);
      });
  }

  protected bindEvents(): void {
    this.$form.addEventListener('submit', event => {
      event.preventDefault();

      this.openModal();
    });
  }

  private async createMenuButtons() {
    const menuItems = (await createMenu()).getMenuItems();

    for (const menuItem of menuItems) {
      const $button = await this.createMenuButton(menuItem.getBeverage());

      this.$menuButtons.push($button);
      this.$buttons.appendChild($button);
    }
  }

  private async createMenuButton(beverage: Beverage) {
    const $button = this.createComponent<MenuButton>(CUSTOM_ELEMENTS.MENU_BUTTON);

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

    const $modal = this.createComponent<Modal>(CUSTOM_ELEMENTS.MODAL);
    $modal.open(await this.cafe.firstOrder());
  }

  protected view(): string {
    return MenuView();
  }
}
