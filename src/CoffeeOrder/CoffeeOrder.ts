import Coffee, { ICoffe, ICoffeeOption } from '../Coffees/Coffee';
import Americano from '../Coffees/Americano';
import CafeAuLait from '../Coffees/CafeAuLait';
import CafeLatte from '../Coffees/CafeLatte';
import CafeMocha from '../Coffees/CafeMocha';
import Cappuccino from '../Coffees/Cappuccino';
import Corretto from '../Coffees/Corretto';
import Espresso from '../Coffees/Espresso';
import Lungo from '../Coffees/Lungo';
import Macchiato from '../Coffees/Macchiato';
import Ristretto from '../Coffees/Ristretto';
import CoffeeKitchen from '../CoffeeKitchen/CoffeeKitchen';

class CoffeeOrder {
  private static uniqueIdCounter = 0;

  private static $ = document.querySelector('.order-list') as HTMLElement;
  private static $table = document.querySelector('#order-table') as HTMLTableElement;

  private static menus: typeof ICoffe[] = [];
  private static orders: CoffeeOrder[] = [];

  private static ACTIONS = {
    NEW: 'order-button',
    DELETE: 'DELETE',
    EDIT: 'EDIT',
  };

  static getOrderId = () => (this.uniqueIdCounter += 1);

  id: number;
  state: OrderState;
  coffee: ICoffe;

  constructor(coffee: ICoffe) {
    this.coffee = coffee;
    this.id = CoffeeOrder.getOrderId();
    this.state = { editing: false };
  }

  public static getReady() {
    CoffeeOrder.addCoffeeMenus();
    CoffeeOrder.$.addEventListener('click', CoffeeOrder.handleClickEvent);
  }

  private static getRandomCoffee(): ICoffe {
    const randomIndex = Math.floor(Math.random() * this.menus.length);
    const randomCoffee = this.menus[randomIndex] && new this.menus[randomIndex]();

    if (!(randomCoffee instanceof Coffee)) {
      alert('커피 메뉴가 아직 준비되지 않았어요 🥲');
      throw new Error();
    }

    return randomCoffee;
  }

  private static addCoffeeMenus() {
    [Americano, CafeAuLait, CafeLatte, CafeMocha, Cappuccino, Corretto, Espresso, Lungo, Macchiato, Ristretto].forEach(
      CoffeeOrder.addMenu,
    );
  }

  private static render() {
    this.$table.innerHTML = CoffeeOrder.headerTemplate + CoffeeOrder.orders.map(o => o.template()).join('\n');
  }

  private template() {
    return `
      <div class="table-row" data-id="${this.id}" >
        <div class="cell" data-title="No">${this.id}</div>
        <div class="cell" data-title="메뉴명">${this.coffee.name}</div>
        ${Object.entries(this.coffee.options)
          .map(
            ([key, option]) =>
              `<div class="cell" ${this.state.editing ? 'contenteditable' : ''} data-title="${Coffee.getOptionTitle(
                key as keyof ICoffeeOption,
              )}">${option}</div>`,
          )
          .join('\n')}
        <div class="cell" data-title="수정하기">
          <span class="edit-order"><i class="fa-solid ${this.state.editing ? 'fa-save' : 'fa-pen'}"  data-action="${
      CoffeeOrder.ACTIONS.EDIT
    }"></i></span>
        </div>
        <div class="cell" data-title="삭제하기">
          <span class="remove-order"><i class="fa-solid fa-trash-can" data-action="${
            CoffeeOrder.ACTIONS.DELETE
          }"></i></span>
        </div>
      </div>
    `;
  }

  private static headerTemplate = `
    <div class="table-row header">
      <div class="cell">No</div>
      <div class="cell">메뉴명</div>
      ${Object.entries(Coffee.optionsList)
        .map(([key]) => `<div class="cell">${Coffee.getOptionTitle(key as keyof ICoffeeOption)}</div>`)
        .join('')}
      <div class="cell">수정하기</div>
      <div class="cell">삭제하기</div>
    </div>
  `;

  private static handleClickEvent(event: MouseEvent) {
    const target = event.target as HTMLElement;
    switch (true) {
      case (target as HTMLElement)?.className === CoffeeOrder.ACTIONS.NEW:
        CoffeeOrder.orders.length === 0 && CoffeeKitchen.open();
        CoffeeOrder.orders = [...CoffeeOrder.orders, CoffeeOrder.getRandomOrder()];
        CoffeeOrder.render();
        break;
      case (target as HTMLElement)?.dataset?.action === CoffeeOrder.ACTIONS.EDIT:
        CoffeeOrder.editOrder(target);
        CoffeeOrder.render();
        break;
      case (target as HTMLElement)?.dataset?.action === CoffeeOrder.ACTIONS.DELETE:
        CoffeeOrder.deleteOrder(target);
        CoffeeOrder.render();
        CoffeeOrder.orders.length === 0 && CoffeeKitchen.close();
        break;
      default:
        console.log(event.target);
        return;
    }
  }

  private static deleteOrder(target: HTMLElement) {
    const orderId = Number((target.closest('.table-row') as HTMLElement)?.dataset?.id);
    if (isNaN(orderId)) return;
    const isUserConfirmedDelete = confirm('정말로 해당 주문을 삭제하시겠어요? 💭');
    if (!isUserConfirmedDelete) return;
    alert('주문이 삭제 되었어요 ✅');
    CoffeeOrder.orders = CoffeeOrder.orders.filter(v => v.id !== orderId);
  }

  private static editOrder(target: HTMLElement) {
    try {
      const orderRow$ = target.closest('.table-row') as HTMLElement;
      const orderId = Number(orderRow$?.dataset?.id);
      const order = CoffeeOrder.orders.find(o => o.id === orderId);
      if (!order) throw new Error('[ERROR]: ORDER_NOT_FOUND');

      if (order.state.editing) {
        const updatedValues = (Array.from(orderRow$.childNodes) as HTMLDivElement[])
          .filter(c => c.isContentEditable)
          .map(v => v.innerHTML);

        order.coffee.options = Object.entries(order.coffee.options).reduce((acc, [key], index) => {
          const optionKey = key as keyof ICoffeeOption;
          const optionValue = updatedValues[index] as ICoffeeOption[keyof ICoffeeOption];

          if (!Coffee.optionsList[optionKey].includes(optionValue))
            throw new Error(
              `${optionValue} 는 유효한 커피 옵션이 아니예요 🥲\n👉${Coffee.optionsList[optionKey].join(
                '\n👉',
              )}\n중에서 입력 해주세요 🙏`,
            );
          return {
            ...acc,
            [optionKey]: optionValue,
          };
        }, {} as ICoffeeOption);
        alert('주문 수정 완료! 🎉');
      }

      order.state.editing = !order.state.editing;
    } catch (error) {
      alert(error);
    }
  }

  private static getRandomOrder(): CoffeeOrder {
    return new CoffeeOrder(CoffeeOrder.getRandomCoffee());
  }

  private static addMenu(menu: typeof ICoffe) {
    if (CoffeeOrder.menus.includes(menu)) return;
    CoffeeOrder.menus.push(menu);
  }
}

type OrderState = {
  editing: boolean;
};

export default CoffeeOrder;
