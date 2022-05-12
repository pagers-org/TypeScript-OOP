import { CoffeeOptions } from 'Coffee';
import Coffee from './coffee';
import Order from './order';

let currentElement: HTMLButtonElement | null = null;
const pageNav = document.querySelector('header') as HTMLHeadElement;
const coffeeName = document.querySelector('.coffee_name') as HTMLHeadingElement;
const coffeeFilling = document.querySelector('.filling') as HTMLDivElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('.coffee-category-button');
const addCoffeeOptionsForm = document.querySelector('.coffee-add-area form') as HTMLFormElement;
const modalLayout = document.querySelector('.modal-layout') as HTMLDivElement;
const orderButton = document.querySelector('.order-button') as HTMLButtonElement;

pageNav.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLInputElement;
  if (!$target.matches('[type="radio"]')) return;
  event.preventDefault();
  alert('아직 준비되지 않았네요🥺');
});

// const coffee = new Coffee();
const order = new Order();
let index = 0;

orderButton.addEventListener('click', e => {
  index++;
  const randomMenu = order.getRandomOrder;
  order.addOrderItem = Object.assign(randomMenu, { id: index.toString() });
  renderOrderTable(order.getOrderItem);
});

const renderOrderTable = (list: CoffeeOptions[]) => {
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
${list
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
};

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
    const randomMenu = order.getOrderItem;
    const filtered = randomMenu.filter(item => item.id !== $target.id);
    order.setOrderItem = filtered;
    renderOrderTable(filtered);
  }
});

buttons.forEach(button =>
  button.addEventListener('click', () => {
    if (!order.getOrderItem.map(item => item.menu).includes(button.innerText)) {
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

addCoffeeOptionsForm.addEventListener('submit', event => {
  event.preventDefault();
  modalLayout.classList.toggle('hidden');
});

modalLayout.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLElement;
  if (!$target.matches('#close-icon')) return;
  modalLayout.classList.toggle('hidden');
});
