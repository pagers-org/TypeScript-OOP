import { createCustomElement } from '@/common';
import { ApiImpl, BeverageService, MenuService, OptionService, Orders } from '@/domain';
import { CafeHeader, CafeMenu, CafeModal, CafeOrderList, CafeOrderListRow, CafeServing } from '@/components';

export const api = new ApiImpl();
export const orders = new Orders();
export const beverageService = new BeverageService(api);
export const optionService = new OptionService(api);
export const menuService = new MenuService(api);
export const menu = menuService.getMenu();

window.addEventListener('load', () => {
  createCustomElement('cafe-header', CafeHeader);
  createCustomElement('cafe-menu', CafeMenu);
  createCustomElement('cafe-order-list', CafeOrderList);
  createCustomElement('cafe-order-list-row', CafeOrderListRow);
  createCustomElement('cafe-modal', CafeModal);
  createCustomElement('cafe-serving', CafeServing);
});
