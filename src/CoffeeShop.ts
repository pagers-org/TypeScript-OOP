import CoffeeOrder from './CoffeeOrder/CoffeeOrder';

class CoffeeShop {
  public getReady = () => {
    CoffeeOrder.getReady();
  };
}

export default CoffeeShop;
