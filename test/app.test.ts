import { InMemoryApi, Order, Orders, Serving } from '@/domain';

describe('카페 테스트', () => {
  const api = new InMemoryApi();
  let orders: Orders;

  beforeEach(() => {
    orders = new Orders();
  });

  it('음료 테스트', () => {
    const beverage = api.findBeverage(1);

    expect(beverage.getName()).toEqual('아메리카노');
  });

  it('주문 테스트', () => {
    const order1 = new Order('1', 1);
    const order2 = new Order('2', 2);
    const order3 = new Order('3', 1);

    orders.addOrderGroup(order1);
    orders.addOrderGroup(order2);
    orders.addOrderGroup(order3);

    const firstOrder = orders.firstOrder();
    expect(firstOrder.getId()).toEqual('1');

    const firstOrderShift = orders.firstOrderShift();
    expect(firstOrder).toEqual(firstOrderShift);

    orders.firstOrderShift();
    orders.firstOrderShift();

    expect(orders.isEmpty()).toBeTruthy();
  });

  it('서빙 테스트', () => {
    const order = new Order('1', 1);
    orders.addOrderGroup(order);

    const servingOrder = orders.firstOrderShift();

    const serving = new Serving(
      servingOrder.getId(),
      api.findBeverageName(servingOrder.getBeverageId()),
      servingOrder.getOrderTime(),
    );

    expect(orders.isEmpty()).toBeTruthy();
    expect(serving.getBeverageName()).toEqual('아메리카노');
  });
});
