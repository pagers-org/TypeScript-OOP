import Coffee from '../model/Coffee';
import { addClassList, removeClassList, setInnerText } from '../utils';
import { OrdersState } from './OrderList';

type KitchenState = { isOpened: boolean; orders: OrdersState['orders'] };

class Kitchen implements Component {
  private $root: HTMLElement;
  private state: KitchenState;
  private _selectedCoffee: Coffee | undefined;

  subscription: ReturnType<Observable['subscribe']> | undefined;

  set selectedCoffee(coffee: Coffee) {
    if (this._selectedCoffee) {
      removeClassList({ selector: `#${this._selectedCoffee.id}`, className: 'selected' });
      removeClassList({ selector: '.filling', className: this._selectedCoffee.id });
    }

    addClassList({ selector: `#${coffee.id}`, className: 'selected' });
    addClassList({ selector: '.filling', className: coffee.id });
    setInnerText({ selector: '.coffee_name', innerText: coffee.name });

    this._selectedCoffee = coffee;
  }

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
    $coffeContainer.addEventListener('click', e => {
      e.preventDefault();

      const { target } = e;

      if (!(target instanceof HTMLElement)) return;
      if (target.classList.contains('coffee-category-button')) {
        return this.handleClickCoffeeCategory(target.id);
      }
      if (target.classList.contains('coffee-add-options-button')) {
        return this.handleClickAddOption(target.id);
      }
    });
  }

  handleClickCoffeeCategory(coffeeId: string) {
    const order = this.state.orders.find(v => v.coffee.id === coffeeId);
    if (order) {
      this.selectedCoffee = order.coffee;
      return;
    }
    alert(`아직 주문이 없는 커피 입니다.😋`);
  }

  handleClickAddOption(coffeeId: string) {
    // TODO
    if (!this.selectedCoffee) {
      alert('만들고자 하는 커피를 선택 해주세요. ☕️');
    }
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
