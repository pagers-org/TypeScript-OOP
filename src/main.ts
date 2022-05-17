import { v4 } from 'uuid';
import { COFFEE, SIZE, WHIPPEDCREAM, EXTRA, ICE, CUP, SYRUP, ICEORHOT, SHOT } from './constants';

let currentElement: HTMLButtonElement | null = null;
const pageNav = document.querySelector('header') as HTMLHeadElement;
const coffeeName = document.querySelector('.coffee_name') as HTMLHeadingElement;
const coffeeFilling = document.querySelector('.filling') as HTMLDivElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('.coffee-category-button');
const addCoffeeOptionsForm = document.querySelector('.coffee-add-area form') as HTMLFormElement;
const modalLayout = document.querySelector('.modal-layout') as HTMLDivElement;

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

export const getRandomItem = (inventory: string[]) => {
  return inventory[Math.floor(Math.random() * inventory.length)];
};

export const getOrder = () => {
  const generateOrder = [COFFEE, SIZE, SHOT, SYRUP, ICEORHOT, ICE, WHIPPEDCREAM, EXTRA, CUP].map(item =>
    getRandomItem(item),
  );

  return generateOrder;
};

export const getOrderListDOM = () => {
  const $itemList = document.querySelectorAll('.ordered-item');
  return $itemList;
};

export const getItemNum = () => {
  const $itemList = getOrderListDOM();
  return $itemList.length + 1;
};

export const addEvent = () => {
  const btnsEdit = document.querySelectorAll('.edit-order');
  const btnsRemove = document.querySelectorAll('.remove-order');

  btnsEdit.forEach(btn => {
    btn.addEventListener('click', e => {
      const cur = (e.target as HTMLDivElement).closest('.table-row');
      const targetId = (cur as HTMLTableRowElement).id;
      editItem(targetId);
    });
  });

  btnsRemove.forEach(btn => {
    btn.addEventListener('click', e => {
      const cur = (e.target as HTMLElement).closest('.ordered-item');
      const targetId = (cur as HTMLElement).id;
      removeItem(targetId);
    });
  });
};

export const toggleContenteditable = (item: Element) => {
  if (item.getAttribute('contenteditable')) {
    item.removeAttribute('contenteditable');
  } else {
    item.setAttribute('contenteditable', 'true');
  }
};

export const editItem = (itemId: string) => {
  const $itemList = getOrderListDOM();
  $itemList.forEach(item => {
    if (itemId === item.id) {
      toggleContenteditable(item);
    }
  });

  addEvent();
};

export const removeItem = (itemId: string) => {
  const $itemList = getOrderListDOM();
  let $newList = '';
  $itemList.forEach(item => {
    if (itemId !== item.id) {
      $newList += `<div id="${v4()}" class="table-row ordered-item">${item.innerHTML}</div></div>`;
    }
  });

  const $table = document.querySelector('#order-table');
  if ($table)
    $table.innerHTML = `<div class="table-row header">
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
              </div> ${$newList}`;

  addEvent();
};

export const setKitchen = () => {
  const $kitchen = document.querySelector('#right-section');
  const $coffeeList = document.querySelectorAll('.coffee-category-button');
  const $itemList = getOrderListDOM();
  if ($itemList.length === 0) {
    if ($kitchen)
      $kitchen.innerHTML = `
  <div id="none-order">
`;
  } else {
    if ($kitchen)
      $kitchen.innerHTML = `
        <h1>주방</h1>
        <div class="coffee-container">
          <h1 class="coffee_name">Choose your coffee</h1>
          <div class="cup">
            <div class="filling reset">
              <div class="coffee">커피</div>
              <div class="water">물</div>
              <div class="liquor">리퀴르</div>
              <div class="milk">우유</div>
              <div class="whipped_cream">휘핑 크림</div>
              <div class="milk_foam">밀크 폼</div>
              <div class="steamed_milk">데운 우유</div>
              <div class="chocolate">초콜릿</div>
            </div>
            <div class="plate"></div>
          </div>
        </div>
        <div class="select-coffee-container">
          <div class="row">
            <div>
              <button class="coffee-category-button" id="americano">아메리카노</button>
              <button class="coffee-category-button" id="au_lait">카페 오레</button>
              <button class="coffee-category-button" id="capuccino">카푸치노</button>
              <button class="coffee-category-button" id="corretto">코레또</button>
              <button class="coffee-category-button" id="espresso">에스프레소</button>
            </div>
            <div>
              <button class="coffee-category-button" id="latte">카페 라떼</button>
              <button class="coffee-category-button" id="lungo">룽고</button>
              <button class="coffee-category-button" id="macchiato">마끼야또</button>
              <button class="coffee-category-button" id="mocha">카페 모카</button>
              <button class="coffee-category-button" id="ristretto">리스트레또</button>
            </div>
          </div>
          <div class="row">
            <div class="coffee-add-area">
              <form>
                <button type="submit" class="coffee-add-options-button">만들기</button>
              </form>
            </div>
          </div>
        </div>`;

    // 커피 선택 버튼 버튼
    $itemList.forEach(item => {
      console.log(item.firstElementChild?.nextElementSibling?.textContent);
    });

    $coffeeList.forEach(coffee => {
      coffee.addEventListener('click', () => {
        coffee.setAttribute('disabled', 'true');
        alert('경고창');
      });
    });
  }
};

setKitchen();

export const btnOrder = document.querySelector('.order-button') as HTMLButtonElement;

btnOrder.addEventListener('click', () => {
  const orderItems = getOrder();
  const $orderTable = document.querySelector('.table') as HTMLTableElement;
  const $newRow = document.createElement('div');
  $newRow.id = v4();
  $newRow.className = 'table-row';
  $newRow.classList.add('ordered-item');
  $newRow.innerHTML = `<div class="cell" data-title="No">${getItemNum()}</div>
                <div class="cell" data-title="메뉴명">${orderItems[0]}</div>
                <div class="cell" data-title="사이즈">${orderItems[1]}</div>
                <div class="cell" data-title="샷">${orderItems[2]}</div>
                <div class="cell" data-title="시럽">${orderItems[3]}</div>
                <div class="cell" data-title="ICE/HOT">${orderItems[4]}</div>
                <div class="cell" data-title="얼음 종류">${orderItems[5]}</div>
                <div class="cell" data-title="휘핑 크림">${orderItems[6]}</div>
                <div class="cell" data-title="엑스트라">${orderItems[7]}</div>
                <div class="cell" data-title="컵">${orderItems[8]}</div>
                <div class="cell" data-title="수정하기">
                  <span class="edit-order"><i class="fa-solid fa-pen"></i></span>
                </div>
                <div class="cell" data-title="삭제하기">
                  <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
                </div>
              `;
  $orderTable.appendChild($newRow);
  addEvent();
  setKitchen();
});
