import { qs, emit } from '../utils/helpers';
import View from './View';

export default class MainView extends View {
  private template;
  private orderButton!: HTMLButtonElement;
  private coffeeOptionForm!: HTMLFormElement;
  constructor(element = qs('#order') as HTMLElement, template = new Template()) {
    super(element);
    this.template = template;
  }

  show() {
    super.show();
    this.element.innerHTML = this.template.getMain();
    this.orderButton = qs('.order-button') as HTMLButtonElement;
    this.coffeeOptionForm = qs('.coffee-add-area form') as HTMLFormElement;
    this.orderButton.addEventListener('click', () => {
      emit('@add');
    });
    this.coffeeOptionForm.addEventListener('submit', event => {
      event.preventDefault();
      emit('@submit');
    });

    return this;
  }
}

class Template {
  getMain() {
    return `
    <section id="left-section">
    <div class="order-list">
      <h1>주문 목록</h1>
      <div class="order-button-area">
        <button class="order-button">주문 받기</button>
      </div>
      <div class="wrapper">
        <div class="table" id="order-table">
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
        </div>
      </div>
    </div>
    <span class="maked-list-view">
      <button>현재까지 서빙된 커피 확인하기</button>
    </span>
    <div class="maked-list">
      <h1>현재까지 서빙된 커피</h1>
      <div class="wrapper">
        <div class="table" id="maked-table">
          <div class="table-row header">
            <div class="cell">No</div>
            <div class="cell">메뉴(수량)</div>
            <div class="cell">최근 주문 시간</div>
            <div class="cell">최근 서빙 완료 시간</div>
          </div>
          <div class="table-row">
            <div class="cell" data-title="No">1</div>
            <div class="cell" data-title="메뉴(수량)">아메리카노(3)</div>
            <div class="cell" data-title="최근 주문 시간">2022.05.02 20:44:32</div>
            <div class="cell" data-title="최근 서빙 완료 시간">2022.05.02 20:46:17</div>
          </div>
          <div class="table-row">
            <div class="cell" data-title="No">1</div>
            <div class="cell" data-title="메뉴(수량)">에스프레소(1)</div>
            <div class="cell" data-title="최근 주문 시간">2022.05.02 20:51:37</div>
            <div class="cell" data-title="최근 서빙 완료 시간">2022.05.02 20:53:11</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="right-section">
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
  </section>
      `;
  }
}
