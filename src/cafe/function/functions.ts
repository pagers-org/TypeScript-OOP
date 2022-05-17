import { Beverage, BeverageService, Menu, OptionService, Order, InMemoryApi, MenuItem } from '@/domain';

import { nanoid } from 'nanoid';
import { BeverageName } from '@/@types';

const api = new InMemoryApi();
const beverageService = () => new BeverageService(api);
const optionService = () => new OptionService(api);

export function createMenu(): Menu {
  const menuItems = beverageService()
    .getBeverages()
    .map(item => new MenuItem(item.getId()));

  return new Menu(menuItems);
}

export function createRandomOrder(): Order {
  const beverage = beverageService().findRandom();
  const optionGroups = optionService().createRandomSelectedOptionGroups();

  return new Order(nanoid(), beverage.getId(), optionGroups);
}

export function getBeverageById(beverageId: number): Beverage {
  return beverageService().findById(beverageId);
}

export function getBeverageName(beverageId: number): BeverageName {
  return getBeverageById(beverageId).getName();
}
