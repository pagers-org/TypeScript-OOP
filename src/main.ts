import { Coffee } from './Coffee';
import {OrderManagement} from "./OrderManagement";

let currentElement: HTMLButtonElement | null = null;
const pageNav = document.querySelector('header') as HTMLHeadElement;
const coffeeName = document.querySelector('.coffee_name') as HTMLHeadingElement;
const coffeeFilling = document.querySelector('.filling') as HTMLDivElement;
const orderButton = document.querySelector('.order-button') as HTMLButtonElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('.coffee-category-button');
const addCoffeeOptionsForm = document.querySelector('.coffee-add-area form') as HTMLFormElement;
const modalLayout = document.querySelector('.modal-layout') as HTMLDivElement;

const coffee = new Coffee();
const orderManagement = new OrderManagement();

pageNav.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLInputElement;
  if (!$target.matches('[type="radio"]')) return;
  event.preventDefault();
  alert('아직 준비되지 않았네요🥺');
});

// 주문 목록
orderButton.addEventListener('click', () => {
  const randomMenu = coffee.randomMenu;
  const orderCount = orderManagement.orderCount;
  const $orderTable = document.querySelector('#order-table');
  const coffeeOrder = `
    <div class="cell" data-title="No">${orderCount + 1}</div>
    <div class="cell" data-title="메뉴명">${randomMenu.name}</div>
    <div class="cell" data-title="사이즈">${randomMenu.size}</div>
    <div class="cell" data-title="샷">${randomMenu.shot ?? '-'}</div>
    <div class="cell" data-title="시럽">${randomMenu.syrup ?? '-'}</div>
    <div class="cell" data-title="ICE/HOT">${randomMenu.iceOrHot}</div>
    <div class="cell" data-title="얼음 종류">${randomMenu.ice}</div>
    <div class="cell" data-title="휘핑 크림">${randomMenu.whippedCream ?? '-'}</div>
    <div class="cell" data-title="엑스트라">${randomMenu.extra ?? '-'}</div>
    <div class="cell" data-title="컵">${randomMenu.cup}</div>
    <div class="cell" data-title="수정하기">
      <span class="edit-order"><i class="fa-solid fa-pen"></i></span>
    </div>
    <div class="cell" data-title="삭제하기">
      <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
    </div>
  `
  const coffeeRow = document.createElement('div');
  coffeeRow.className = `table-row ${randomMenu.name}-${orderCount + 1}`;
  coffeeRow.innerHTML = coffeeOrder;
  $orderTable?.insertAdjacentElement('beforeend', coffeeRow);

  const $coffees = document.querySelectorAll('.coffee-category-button');
  $coffees.forEach(coffee => {
    coffee.classList.remove('selected');
    coffeeFilling.classList.remove(coffee.id);
  });

  // @ts-ignore
  const [target] = [...document.querySelectorAll('.coffee-category-button')]
    .filter(a => a.textContent.includes(`${randomMenu.name}`))
  target.classList.add('selected');
  coffeeFilling.classList.remove(target.id);
});

// 만들기 모달 열기
addCoffeeOptionsForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!orderManagement.orderCount) {
    alert('주문을 먼저 받은 후에 만들어 주세요.');
    return;
  }
  modalLayout.classList.toggle('hidden');
});


modalLayout.addEventListener('click', (event: MouseEvent) => {
  const $target = event.target as HTMLElement;

  // todo: 커피 옵션 채워지게 하기, 서빙완료된 커피로 이동하기
  orderManagement.deleteOrder();

  if (!$target.matches('#close-icon')) return;
  modalLayout.classList.toggle('hidden');
});
