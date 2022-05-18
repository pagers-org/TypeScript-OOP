import { OrdersState } from './OrderList';

type KitchenState = { isOpened: boolean; orders: OrdersState['orders'] };

class Kitchen implements Component {
  private $root: HTMLElement;
  private state: KitchenState;

  subscription: ReturnType<Observable['subscribe']> | undefined;

  constructor($root: HTMLElement | null) {
    if (!$root) throw new Error('root element is required to render');
    this.$root = $root;
    this.state = { isOpened: false, orders: [] };
    this.init();
  }

  init(): void {
    this.setEvent();
  }

  render(): void {
    this.$root.innerHTML = this.template();
  }

  template(): string {
    if (!this.state.isOpened) return `<div id="none-order"></div>`;

    return `
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
  }

  setState<KitchenState>(state: KitchenState) {
    this.state = { ...this.state, ...state };
    this.render();
    this.setEvent();
  }

  setEvent(): void {
    const $coffeContainer = this.$root.querySelector('.select-coffee-container');
    if (!($coffeContainer instanceof HTMLElement)) return;
    $coffeContainer.addEventListener('click', ({ target }) => {
      if (!(target instanceof HTMLElement)) return;
      if (target.classList.contains('coffee-category-button')) {
        this.handleClickCoffeeCategory(target.id);
      }
      // console.log(target);
    });
  }

  handleClickCoffeeCategory(coffeeId: string) {
    if (this.state.orders.find(v => v.coffee.id === coffeeId)) {
      return;
    }
    alert('아직 주문이 없는 커피 입니다.😋');
  }

  subscriber(state: OrdersState) {
    if (state.orders.length === 0) {
      return this.setState({ isOpened: false, orders: state.orders });
    }
    this.setState({ isOpened: true, orders: state.orders });
  }

  callback() {
    //
  }
}

export default Kitchen;
