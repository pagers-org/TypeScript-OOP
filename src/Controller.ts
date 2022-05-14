import { CoffeeOptions } from 'Coffee';
import Order from './order';
import { qs } from './utils/helpers';
import View from './views/View';

export default class Controller {
  private mainView;
  private headerView;
  private modalView;
  private order;
  private index;
  constructor({ mainView, headerView, modalView }: { mainView: View; headerView: View; modalView: View }) {
    this.mainView = mainView;
    this.headerView = headerView;
    this.modalView = modalView;
    this.index = 0;
    this.order = new Order();
    this.subscribeViewEvents();
    this.renderMainView();
  }

  renderMainView() {
    this.mainView.show();
    this.headerView.show();
    this.modalView.show();
  }

  subscribeViewEvents() {
    addEventListener('@add', () => {
      this.addOrder();
    });
    addEventListener('@submit', event => {
      this.handleSubmit(event);
    });
    this.mainView.on('click', () => this.editOrder());
    this.mainView.on('click', () => this.selectCoffee());
    this.headerView.on('click', () => this.handleTab());
    this.modalView.on('click', () => this.handleClose());
  }

  render() {
    const tabName = '재료관리';
    if (tabName === '재료관리') {
      // TODO
    }

    this.renderMainView();
  }

  editOrder() {
    document.querySelector('.wrapper')?.addEventListener('click', event => {
      const $target = event.target as HTMLElement;

      if ($target.matches('.fa-pen')) {
        const menuListRow = $target.parentElement?.parentElement?.parentElement?.children || [];
        for (let i = 0; i < menuListRow.length - 2; i++) {
          if (menuListRow[i].hasAttribute('contenteditable')) {
            menuListRow[i].removeAttribute('contenteditable');
          } else {
            menuListRow[i].setAttribute('contenteditable', 'true');
          }
        }
      }
      if ($target.matches('.fa-trash-can')) {
        const randomMenu = this.order.getOrderItem;
        const filtered = randomMenu.filter(item => item.id !== $target.id);
        this.order.setOrderItem = filtered;
        this.renderOrderTable();
      }
    });
  }

  addOrder() {
    this.index++;
    const randomMenu = this.order.getRandomOrder;
    this.order.addOrderItem = Object.assign(randomMenu, { id: this.index.toString() });
    this.render();
    this.renderOrderTable();
  }

  selectCoffee() {
    const coffeeFilling = qs('.filling') as HTMLDivElement;
    let currentElement: HTMLButtonElement | null = null;
    const coffeeName = qs('.coffee_name') as HTMLHeadingElement;
    const buttons = document.querySelectorAll<HTMLButtonElement>('.coffee-category-button');

    buttons.forEach(button =>
      button.addEventListener('click', () => {
        if (!this.order.getOrderItem.map(item => item.menu).includes(button.innerText)) {
          alert('주문 내역이 없습니다.');
          return;
        }

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

  handleSubmit(event: Event) {
    event.preventDefault();
    const modalLayout = qs('.modal-layout') as HTMLDivElement;
    modalLayout.classList.toggle('hidden');
  }

  handleTab() {
    const pageNav = qs('header') as HTMLHeadElement;
    pageNav.addEventListener('click', (event: MouseEvent) => {
      const $target = event.target as HTMLInputElement;
      if (!$target.matches('[type="radio"]')) return;
      event.preventDefault();
      alert('아직 준비되지 않았네요🥺');
    });
  }

  handleClose() {
    const modalLayout = qs('.modal-layout') as HTMLDivElement;
    modalLayout.addEventListener('click', (event: MouseEvent) => {
      const $target = event.target as HTMLElement;
      if (!$target.matches('#close-icon')) return;
      modalLayout.classList.toggle('hidden');
    });
  }

  renderOrderTable() {
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
${this.order.getOrderItem
  .map(
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
  )
  .join('')}
  `;
    const $orderTable = document.querySelector('.table') as HTMLDivElement;
    $orderTable.innerHTML = $contents;
  }
}
