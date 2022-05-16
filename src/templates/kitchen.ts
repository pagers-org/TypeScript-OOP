import { DOM } from '../constants';

const KITCHEN_TEMPLATE = Object.freeze({
  open() {
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
          <button class="${DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS}" id="americano">아메리카노</button>
          <button class="${DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS}" id="au_lait">카페 오레</button>
          <button class="${DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS}" id="capuccino">카푸치노</button>
          <button class="${DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS}" id="corretto">코레또</button>
          <button class="${DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS}" id="espresso">에스프레소</button>
        </div>
        <div>
          <button class="${DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS}" id="latte">카페 라떼</button>
          <button class="${DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS}" id="lungo">룽고</button>
          <button class="${DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS}" id="macchiato">마끼야또</button>
          <button class="${DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS}" id="mocha">카페 모카</button>
          <button class="${DOM.KITCHEN_COFFEE_CATEGORY_BUTTON_CLASS}" id="ristretto">리스트레또</button>
        </div>
      </div>
      <div class="row">
        <div class="coffee-add-area">
          <form id="${DOM.KITCHEN_COFFEE_MAKE_BUTTON_ID}">
            <button type="submit" class="${DOM.KITCHEN_COFFEE_ADD_OPTIONS_BUTTON_CLASS}">만들기</button>
          </form>
        </div>
      </div>
    </div>
  `;
  },
  close() {
    return String.raw`
      <section id="right-section">
        <div id="none-order"></div>
      </section>
    `;
  },
});

export default KITCHEN_TEMPLATE;
