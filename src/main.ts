import OrderList from './order-list';

let currentElement: HTMLButtonElement | null = null;
const pageNav = document.querySelector('header') as HTMLHeadElement;
const coffeeName = document.querySelector('.coffee_name') as HTMLHeadingElement;
const coffeeFilling = document.querySelector('.filling') as HTMLDivElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('.coffee-category-button');
const addCoffeeOptionsForm = document.querySelector('.coffee-add-area form') as HTMLFormElement;
const modalLayout = document.querySelector('.modal-layout') as HTMLDivElement;
const orderButton = document.querySelector('.order-button') as HTMLButtonElement;
const orderList = new OrderList();

pageNav.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLInputElement;
  if (!$target.matches('[type="radio"]')) return;
  event.preventDefault();
  alert('아직 준비되지 않았네요🥺');
});

buttons.forEach(button =>
  button.addEventListener('click', () => {
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

function createOrderItem() {
  const tableRowHeader = document.querySelector('.table-row.header') as HTMLDivElement;
  const { id, name, size, shots, syrup, hasIce, iceType, whipping, extra, cupType } = orderList.orderCoffee();

  const html = `
  <div class="table-row">
  <div class="cell" data-title="No">${id + 1}</div>
  <div class="cell" data-title="메뉴명">${name}</div>
  <div class="cell" data-title="사이즈">${size}</div>
  <div class="cell" data-title="샷">${shots}</div>
  <div class="cell" data-title="시럽">${syrup}</div>
  <div class="cell" data-title="ICE/HOT">${hasIce}</div>
  <div class="cell" data-title="얼음 종류">${iceType}</div>
  <div class="cell" data-title="휘핑 크림">${whipping}</div>
  <div class="cell" data-title="엑스트라">${extra}</div>
  <div class="cell" data-title="컵">${cupType}</div>
  <div class="cell" data-title="수정하기">
    <span class="edit-order"
      ><i class="fa-solid fa-pen"></i
    ></span>
  </div>
  <div class="cell" data-title="삭제하기">
    <span class="remove-order"
      ><i class="fa-solid fa-trash-can"></i
    ></span>
  </div>
</div>
  `;
  tableRowHeader.insertAdjacentHTML('afterend', html);
}

orderButton.addEventListener('click', () => {
  createOrderItem();
});
