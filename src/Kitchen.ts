import { MenuName } from './@types/index.js';
import { $ } from './utils/dom.js';

class Kitchen {
  $target: HTMLElement;
  $currentElement: HTMLButtonElement | null;
  $modalLayout: HTMLDivElement;

  constructor() {
    this.$target = $(`#right-section`);
    this.$currentElement = null;
    this.$modalLayout = $('.modal-layout') as HTMLDivElement;
  }

  closeKitchen() {
    this.$target.innerHTML = this.closeTemplate();
  }

  openKitchen() {
    this.$target.innerHTML = this.openTemplate();
  }

  closeTemplate() {
    return String.raw`
      <section id="right-section">
        <div id="none-order"></div>
      </section>
    `;
  }

  fillingCoffee(clickButton: HTMLButtonElement) {
    const $coffeeFilling = $('.filling') as HTMLDivElement;
    const $coffeeName = $('.coffee_name') as HTMLHeadingElement;

    if (this.$currentElement) {
      this.$currentElement.classList.remove('selected');
      $coffeeFilling.classList.remove(this.$currentElement.id);
    }

    this.$currentElement = clickButton;
    $coffeeFilling.classList.add(this.$currentElement.id);
    this.$currentElement.classList.add('selected');
    $coffeeName.innerText = clickButton.innerText;
  }

  isExistClickMenuName(currentOrderMenuNames: MenuName[], clickMenuName: MenuName) {
    return currentOrderMenuNames.includes(clickMenuName);
  }

  openTemplate() {
    return String.raw`
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
      </div>
    `;
  }
}

export default Kitchen;
