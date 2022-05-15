import { ApiImpl, Beverage, BeverageName, BeverageService, MenuService, OptionService, Order } from '@/domain';
import { nanoid } from 'nanoid';

const api = new ApiImpl();
const beverageService = new BeverageService(api);
const optionService = new OptionService(api);
const menuService = new MenuService(api);

export function createMenu() {
  return menuService.getMenu();
}

export function createRandomOrder() {
  const beverage = beverageService.createRandomBeverage();
  const optionGroups = optionService.createRandomSelectedOptionGroups();

  return new Order(nanoid(), beverage.id, optionGroups);
}

export function getBeverageById(beverageId: number): Beverage {
  return beverageService.getBeverageById(beverageId);
}

export function getBeverageName(beverageId: number): BeverageName {
  return getBeverageById(beverageId).name;
}
