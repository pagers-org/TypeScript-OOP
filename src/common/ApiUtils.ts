import { api } from '@/main';
import { getRandomRange } from '@/common/CommonUtils';
import { Menu, MenuItem, Order } from '@/domain';
import { nanoid } from 'nanoid';

export async function createMenu() {
  const beverages = await api.getBeveragesAll();
  const menuItems = beverages.map(item => new MenuItem({ beverage: item }));
  return new Menu({ menuItems });
}

export async function createRandomOrder() {
  const beveragesCount = await api.getBeveragesCount();
  return createRandomOrderByBeverageId(getRandomRange(1, beveragesCount));
}

export async function createRandomOrderByBeverageId(beverageId: number) {
  const beverage = await api.findBeverage(beverageId);

  return new Order({
    id: nanoid(),
    beverage,
    optionGroups: await randomOptionGroups(),
  });
}

export async function randomOptionGroups() {
  const optionGroups = await api.getOptionGroupsAll();
  return optionGroups.map(item => item.random());
}
