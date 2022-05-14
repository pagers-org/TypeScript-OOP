import { ApiImpl, BeverageService, MenuService, OptionService, Orders } from '@/domain';
import { createCustomElement } from '@/common';
import { CafeMenuSelect } from '@/components/CafeMenuSelect';
import { CafeOrderList } from '@/components/CafeOrderList';
import { CafeHeader } from '@/components/CafeHeader';
import { CafeModal } from '@/components/CafeModal';
import { CafeServing } from '@/components/CafeServing';

export const api = new ApiImpl();
export const orders = new Orders();
export const beverageService = new BeverageService(api);
export const optionService = new OptionService(api);
export const menuService = new MenuService(api);
export const menu = menuService.getMenu();

window.addEventListener('load', () => {
  createCustomElement('cafe-header', CafeHeader);
  createCustomElement('cafe-menu-select', CafeMenuSelect);
  createCustomElement('cafe-order-list', CafeOrderList);
  createCustomElement('cafe-modal', CafeModal);
  createCustomElement('cafe-serving', CafeServing);
});
