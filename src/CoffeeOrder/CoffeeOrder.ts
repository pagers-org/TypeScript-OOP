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

class CoffeeOrder {
  private static uniqueIdCounter = 0;

  private static $ = document.querySelector('#order') as HTMLElement;
  private static $table = document.querySelector('#order-table') as HTMLTableElement;
  private static menus: typeof ICoffe[] = [];
  private static orders: CoffeeOrder[] = [];

  private static ACTIONS = {
    CREATE: 'order-button',
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
    CoffeeOrder.addOrderEventListener();
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

  private static addOrderEventListener() {
    CoffeeOrder.$.addEventListener('click', event => {
      switch (true) {
        case (event.target as HTMLElement)?.className === CoffeeOrder.ACTIONS.CREATE:
          CoffeeOrder.orders = [...CoffeeOrder.orders, CoffeeOrder.getRandomOrder()];
          break;
        case (event.target as HTMLElement)?.dataset?.action === CoffeeOrder.ACTIONS.EDIT:
          {
            const orderRow$ = (event.target as HTMLElement).closest('.table-row') as HTMLElement;
            const orderId = Number(orderRow$?.dataset?.id);
            if (isNaN(orderId)) throw new Error('[ERROR]: ORDER_ID_IS_NAN');
            const order = CoffeeOrder.orders.find(o => o.id === orderId);
            if (!order) throw new Error('[ERROR]: ORDER_NOT_FOUND');

            if (order.state.editing) {
              const updatedValues = (Array.from(orderRow$.childNodes) as HTMLDivElement[])
                .filter(c => c.isContentEditable)
                .map(v => v.innerHTML);
              // order.coffee.options = Object.entries(order.coffee.options).map(([key], index) => ({
              //   [key as keyof ICoffeeOption]: updatedValues[index] as ICoffeeOption[keyof ICoffeeOption],
              // }));
            }
            // order.state.editing = !order.state.editing;
          }
          break;
        case (event.target as HTMLElement)?.dataset?.action === CoffeeOrder.ACTIONS.DELETE:
          {
            const orderId = Number(((event.target as HTMLElement).closest('.table-row') as HTMLElement)?.dataset?.id);
            if (isNaN(orderId)) throw new Error('[ERROR]: ORDER_ID_IS_NAN');
            const isUserConfirmedDelete = confirm('정말로 해당 주문을 삭제하시겠어요?');
            if (!isUserConfirmedDelete) throw new Error('[LOG]: USER_CANCELED_DELETE');
            CoffeeOrder.orders = CoffeeOrder.orders.filter(v => v.id !== orderId);
          }
          break;
        default:
          return;
      }
      CoffeeOrder.render();
    });
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
