import { BeverageService, ApiImpl, Order, Orders, Recipe } from '@/domain';

describe('app 테스트', () => {
  const beverageService = new BeverageService(new ApiImpl());

  describe('음료 테스트', () => {
    it('음료 가저오기 테스트', () => {
      const beverage = beverageService.getBeverageById(1);

      expect(beverage?.name).toEqual('아메리카노');
    });

    it('레시피 가저오기 테스트', () => {
      const recipes = beverageService.getRecipesByBeverageId(1);
      expect(recipes).toEqual([new Recipe(1, 1, 1, 6), new Recipe(2, 1, 2, 4)]);
    });
  });

  describe('주문 테스트', () => {
    const orders = new Orders();

    const order1 = new Order('1', 1);
    const order2 = new Order('2', 2);
    const order3 = new Order('3', 1);

    orders.add(order1);
    orders.add(order2);
    orders.add(order3);

    const getOrder1 = orders.getFirstByBeverageId(1);
    expect(getOrder1?.id).toEqual('1');
    if (getOrder1) orders.remove(getOrder1);

    const getOrder2 = orders.getFirstByBeverageId(1);
    expect(getOrder2?.id).toEqual('3');
  });
});
