import Drink from '@/Model/Drink';
import OptionGroup from '@/Model/OptionGroup';
import Option from '@/Model/Option';
import Order from '@/Model/Order';
import { drinkMap } from '@/Model/constants/drinks';
import { optionGroups } from '~/src/Model/constants/optionGroups';
import { getRandomElementInArray, getRandomNumber } from '@/utils/utils';

class OrderFactory {
  private createRandomDrink() {
    const drinkName = getRandomElementInArray(Object.keys(drinkMap));

    return new Drink(drinkName);
  }

  private createRandomOptionGroups() {
    const newOptionGroups = optionGroups.map(({ groupName, options, multiple }) => {
      const optionObjects = options.map(option => new Option(option, false));
      const optionGroup = new OptionGroup(groupName, optionObjects, multiple);
      optionGroup.selectOption(getRandomNumber(options.length));

      return optionGroup;
    });

    return newOptionGroups;
  }

  createRandomOrder() {
    const drink = this.createRandomDrink();
    const optionGroups = this.createRandomOptionGroups();

    return new Order(drink, optionGroups);
  }
}

export default OrderFactory;
