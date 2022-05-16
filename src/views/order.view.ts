import { $, $all } from "../utils/dom";
import { CoffeeDTO } from "../@types";
import { createRandomOrder } from '../utils/random';

export class OrderView {
  private coffeeIndex = 0;
  constructor() {}

  bindHeaderEvent() {
    const pageNav = $("header") as HTMLHeadElement;
    pageNav.addEventListener("click", (event: MouseEvent) => {
      const $target = event.target as HTMLInputElement;
      if (!$target.matches('[type="radio"]')) return;
      event.preventDefault();
      alert("아직 준비되지 않았네요🥺");
    });
  }
  bindMakeCoffeeEvent() {
    let currentElement: HTMLButtonElement | null = null;
    const buttons = $all<HTMLButtonElement>(".coffee-category-button");
    const coffeeFilling = $(".filling") as HTMLDivElement;
    const coffeeName = $(".coffee_name") as HTMLHeadingElement;
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        if (currentElement) {
          currentElement.classList.remove("selected");
          coffeeFilling.classList.remove(currentElement.id);
        }

        currentElement = button;
        coffeeFilling.classList.add(currentElement.id);
        currentElement.classList.add("selected");
        coffeeName.innerText = button.innerText;
      })
    );
  }
  bindModalEvent() {
    const addCoffeeOptionsForm = $(".coffee-add-area form") as HTMLFormElement;
    const modalLayout = $(".modal-layout") as HTMLDivElement;

    addCoffeeOptionsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      modalLayout.classList.toggle("hidden");
    });
    modalLayout.addEventListener("click", (event: MouseEvent) => {
      const $target = event.target as HTMLElement;
      if (!$target.matches("#close-icon")) return;
      modalLayout.classList.toggle("hidden");
    });
  }
  bindOrderEvent(handler: Function) {
    const orderButton = $(".order-button") as HTMLButtonElement;
    orderButton.addEventListener("click", (event) => {
      event.preventDefault();
      const newCoffee: CoffeeDTO = createRandomOrder(this.coffeeIndex+1);
      console.log(`bindOrderEvent: ${JSON.stringify(newCoffee)}`);
      this.coffeeIndex++;
      handler(newCoffee);
    });
  }
  createOrderTable(coffees: CoffeeDTO[]) {
    const orderTable = $("#order-table") as HTMLDivElement;
    const content = `
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
      
      ${this.createCoffeeRow(coffees)}
    `;
    orderTable.innerHTML = content;
  }
  createCoffeeRow(coffees: CoffeeDTO[]) {
    let content = "";
    coffees.map((coffee) => {
      content += `
        <div class="table-row">
          <div class="cell" data-title="No">${coffee.id}</div>
            <div class="cell" data-title="메뉴명">${coffee.name}</div>
            <div class="cell" data-title="사이즈">${coffee.size}</div>
            <div class="cell" data-title="샷">${coffee.shot}</div>
            <div class="cell" data-title="시럽">${coffee.syrup}</div>
            <div class="cell" data-title="ICE/HOT">${coffee.icehot}</div>
            <div class="cell" data-title="얼음 종류">${coffee.ice}</div>
            <div class="cell" data-title="휘핑 크림">${coffee.whippedcream}</div>
            <div class="cell" data-title="엑스트라">${coffee.extra}</div>
            <div class="cell" data-title="컵">${coffee.cup}</div>
            <div class="cell" data-title="수정하기">
              <span class="edit-order"><i class="fa-solid fa-pen"></i></span>
            </div>
            <div class="cell" data-title="삭제하기">
              <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
          </div>
        </div>
      `;
    });
    return content;
  }
}
