import Component from '../core/Component';
import Coffee, { CoffeeId, COFFE_NAMES } from '../model/Coffee';
import { addClassList, entries, pickChunk, removeClassList, selectTarget, setInnerText } from '../utils';
import { OrdersState } from './OrderList';

type KitchenState = { isOpened: boolean; orders: OrdersState['orders'] };

class Kitchen extends Component implements Observer<OrdersState> {
  private state: KitchenState = { isOpened: false, orders: [] };
  private selectedCoffee: Coffee | undefined;

  set setSelectedCoffee(coffee: Coffee) {
    this.toggleSelectedCoffee(coffee);
    this.selectedCoffee = coffee;
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
        ${pickChunk(entries(COFFE_NAMES), 2, 0)
          .map(
            ([id, name]) =>
              `<button class="coffee-category-button ${
                this.hasCoffeeOrder(id) ? 'selected' : ''
              }" id="${id}">${name}</button>`,
          )
          .join('')}
        </div>
        <div>
        ${pickChunk(entries(COFFE_NAMES), 2, 1)
          .map(
            ([id, name]) =>
              `<button class="coffee-category-button ${
                this.hasCoffeeOrder(id) ? 'selected' : ''
              }" id="${id}">${name}</button>`,
          )
          .join('')}
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
    const $coffeContainer = selectTarget('.select-coffee-container');

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

  hasCoffeeOrder(coffeeId: CoffeeId) {
    return !!this.state.orders.find(order => order.coffee.id === coffeeId);
  }

  handleClickAddOption(coffeeId: string) {
    // TODO
    if (!this.selectedCoffee) {
      alert('만들고자 하는 커피를 선택 해주세요. ☕️');
    }
  }

  observer(state: OrdersState) {
    if (state.orders.length === 0) {
      return this.setState({ isOpened: false, orders: state.orders });
    }
    this.setState({ isOpened: true, orders: state.orders });
  }

  toggleSelectedCoffee(coffee: Coffee) {
    if (this.selectedCoffee) {
      removeClassList({ selector: '.filling', className: this.selectedCoffee.id });
    }

    addClassList({ selector: '.filling', className: coffee.id });
    setInnerText({ selector: '.coffee_name', innerText: coffee.name });
  }
}

export default Kitchen;
