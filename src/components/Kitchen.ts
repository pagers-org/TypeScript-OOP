import { OrdersState } from './OrderList';

class Kitchen implements Component {
  init(): void {
    //
  }
  render(): void {
    //
  }
  template(): string {
    return '';
  }
  setState<T>(state: T): void {
    //
  }
  setEvent(): void {
    //
  }

  observer(state: OrdersState) {
    console.log('Kitchen', state);
  }
}

export default Kitchen;
