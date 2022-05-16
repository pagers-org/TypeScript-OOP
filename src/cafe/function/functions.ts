import { Beverage, BeverageService, Menu, MenuService, OptionService, Order, InMemoryApi } from '@/domain';

import { nanoid } from 'nanoid';
import { BeverageName } from '@/@types';

const api = new InMemoryApi();
const beverageService = () => new BeverageService(api);
const optionService = () => new OptionService(api);
const menuService = () => new MenuService(api);

export function createMenu(): Menu {
  return menuService().getMenu();
}

export function createRandomOrder(): Order {
  const beverage = beverageService().createRandomBeverage();
  const optionGroups = optionService().createRandomSelectedOptionGroups();

  return new Order(nanoid(), beverage.getId(), optionGroups);
}

export function getBeverageById(beverageId: number): Beverage {
  return beverageService().getBeverageById(beverageId);
}

export function getBeverageName(beverageId: number): BeverageName {
  return getBeverageById(beverageId).getName();
}
