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
    const order1 = new Order({ id: '1', beverageId: 1 });
    const order2 = new Order({ id: '2', beverageId: 2 });
    const order3 = new Order({ id: '3', beverageId: 1 });

    orders.addOrder(order1);
    orders.addOrder(order2);
    orders.addOrder(order3);

    const firstOrder = orders.firstOrder();
    expect(firstOrder.getId()).toEqual('1');

    const firstOrderShift = orders.firstOrderShift();
    expect(firstOrder).toEqual(firstOrderShift);

    orders.firstOrderShift();
    orders.firstOrderShift();

    expect(orders.isEmpty()).toBeTruthy();
  });

  it('서빙 테스트', () => {
    const order = new Order({ id: '1', beverageId: 1 });
    orders.addOrder(order);

    const servingOrder = orders.firstOrderShift();
    const beverageName = api.findBeverageName(servingOrder.getBeverageId());
    const orderId = servingOrder.getId();
    const orderTime = servingOrder.getOrderTime();

    const serving = new Serving({
      orderId,
      beverageName,
      orderTime,
    });

    expect(orders.isEmpty()).toBeTruthy();
    expect(serving.getBeverageName()).toEqual('아메리카노');
  });
});
