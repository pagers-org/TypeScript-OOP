import { CoffeeOptions } from 'Coffee';
import Order from './order';
import { qs, qsAll } from './utils/helpers';
import View from './views/View';

export default class Controller {
  private mainView;
  private headerView;
  private modalView;
  private order;
  private orderId;

  constructor({ mainView, headerView, modalView }: { mainView: View; headerView: View; modalView: View }) {
    this.mainView = mainView;
    this.headerView = headerView;
    this.modalView = modalView;
    this.orderId = 0;
    this.order = new Order();
    this.subscribeViewEvents();
    this.renderMainView();
  }

  private renderMainView() {
    this.mainView.show();
    this.headerView.show();
    this.modalView.show();
  }

  private subscribeViewEvents() {
    addEventListener('@add', () => {
      this.addOrder();
    });
    addEventListener('@submit', () => {
      this.handleSubmit();
    });
    this.mainView.on('click', () => this.editOrder());
    this.mainView.on('click', () => this.selectCoffee());
    this.headerView.on('click', () => this.handleTab());
    this.modalView.on('click', () => this.handleClose());
  }

  private Tabrender() {
    const tabName = '재료관리';
    if (tabName === '재료관리') {
      // TODO
    }

    this.renderMainView();
  }

  private editOrder() {
    qs('.wrapper')?.addEventListener('click', event => {
      event.stopPropagation();
      const $target = event.target as HTMLElement;
      const tableRow = $target.closest('.table-row');
      if ($target.matches('.fa-pen')) {
        if (tableRow?.hasAttribute('contenteditable')) {
          alert('수정이 완료 되었습니다 😇');
          tableRow.removeAttribute('contenteditable');
          return;
        } else {
          tableRow?.setAttribute('contenteditable', 'true');
        }
      }
      if ($target.matches('.fa-trash-can')) {
        const randomMenu = this.order.OrderItem;
        const filtered = randomMenu.filter(item => item.id !== $target.id);
        this.order.setOrderItem = filtered;
        this.renderOrderTable();
      }
    });
  }

  private addOrder() {
    this.orderId++;
    this.order.addRandomOrder(this.orderId);
    // this.order.addOrderItem = Object.assign(randomMenu, { id: this.orderId.toString() });
    this.Tabrender();
    this.renderOrderTable();
  }

  private selectCoffee() {
    let currentElement: HTMLButtonElement | null = null;
    const coffeeFilling = qs('.filling') as HTMLDivElement;
    const coffeeName = qs('.coffee_name') as HTMLHeadingElement;
    const buttons = qsAll('.coffee-category-button') as HTMLButtonElement[];
    if (this.order.OrderItem.length === 0) {
      alert('주문내역이 없습니다 🥲');
      return;
    }
    buttons.forEach(button =>
      button.addEventListener('click', event => {
        if (currentElement) {
          currentElement.classList.remove('selected');
          coffeeFilling.classList.remove(currentElement.id);
        }

        currentElement = button;
        coffeeFilling.classList.add(currentElement.id);
        currentElement.classList.add('selected');
        coffeeName.innerText = button.innerText;
      }),
    );
  }

  private handleSubmit() {
    const modalLayout = qs('.modal-layout') as HTMLDivElement;

    modalLayout.classList.toggle('hidden');
  }

  private handleTab() {
    const pageNav = qs('header') as HTMLHeadElement;
    pageNav.addEventListener('click', (event: MouseEvent) => {
      const $target = event.target as HTMLInputElement;
      if (!$target.matches('[type="radio"]')) return;

      alert('아직 준비되지 않았네요🥺');
      return;
    });
  }

  private handleClose() {
    const modalLayout = qs('.modal-layout') as HTMLDivElement;
    modalLayout.addEventListener('click', (event: MouseEvent) => {
      const $target = event.target as HTMLElement;
      if (!$target.matches('#close-icon')) return;
      modalLayout.classList.toggle('hidden');
    });
  }

  private renderOrderTable() {
    const $contents = `
  <div class="table-row header">
  <div class="cell">No</div>
  <div class="cell">메뉴명</div>
  <div class="cell">사이즈</div>
  <div class="cell">샷</div>
  <div class="cell">시럽</div>
  <div class="cell">ICE/HOT</div>
  <div class="cell">얼음 종류</div>
  <div class="cell">휘핑 크림</div>
  <div class="cell">엑스트라</div>
  <div class="cell">컵</div>
  <div class="cell">수정하기</div>
  <div class="cell">삭제하기</div>
</div>
${this.order.OrderItem.map(
  (item: CoffeeOptions) =>
    `
<div class="table-row">
<div class="cell" data-title="No">${item.id}</div>
<div class="cell" data-title="메뉴명">${item.menu}</div>
<div class="cell" data-title="사이즈">${item.size}</div>
<div class="cell" data-title="샷">${item.shot}</div>
<div class="cell" data-title="시럽">${item.syrup}</div>
<div class="cell" data-title="ICE/HOT">${item.iceOrHot}</div>
<div class="cell" data-title="얼음 종류">${item.ice}</div>
<div class="cell" data-title="휘핑 크림">${item.whippedCream}</div>
<div class="cell" data-title="엑스트라">${item.extra}</div>
<div class="cell" data-title="컵">${item.cup}</div>
<div class="cell" data-title="수정하기">
  <span class="edit-order"
    ><i id="${item.id}" class="fa-solid fa-pen"></i
    ></span>
</div>
<div class="cell" data-title="삭제하기">
  <span class="remove-order"
    ><i id="${item.id}" class="fa-solid fa-trash-can"></i
  ></span>
</div>
</div>
`,
).join('')}
  `;
    const $orderTable = qs('.table') as HTMLDivElement;
    $orderTable.innerHTML = $contents;
  }
}
