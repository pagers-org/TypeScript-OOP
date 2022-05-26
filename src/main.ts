import { createCustomElement } from '@/common';
import { Header, MenuComponent, MenuButton, Modal, OrderList, OrderListItem, Served, ServedItem } from '@/components';
import { App } from '@/App';
import { Cafe } from '@/cafe';
import { Orders, Servings } from '@/domain';
import { FetchApi } from '@/api/FetchApi';
import { EventDispatcher, EventListener } from '@/event';

export const eventListener = new EventListener();
export const eventDispatcher = new EventDispatcher();

// const api =new InMemoryApi();

export const api = new FetchApi();

new App(new Cafe(new Orders(), new Servings()));

export const CUSTOM_ELEMENTS = {
  HEADER: 'cafe-header',
  MENU: 'cafe-menu',
  MENU_BUTTON: 'cafe-menu-button',
  ORDER_LIST: 'cafe-order-list',
  ORDER_LIST_ITEM: 'cafe-order-list-item',
  MODAL: 'cafe-modal',
  SERVED: 'cafe-served',
  SERVED_ITEM: 'cafe-served-item',
};

setTimeout(() => {
  createCustomElement(CUSTOM_ELEMENTS.HEADER, Header);
  createCustomElement(CUSTOM_ELEMENTS.MENU, MenuComponent);
  createCustomElement(CUSTOM_ELEMENTS.MENU_BUTTON, MenuButton);
  createCustomElement(CUSTOM_ELEMENTS.ORDER_LIST, OrderList);
  createCustomElement(CUSTOM_ELEMENTS.ORDER_LIST_ITEM, OrderListItem);
  createCustomElement(CUSTOM_ELEMENTS.MODAL, Modal);
  createCustomElement(CUSTOM_ELEMENTS.SERVED, Served);
  createCustomElement(CUSTOM_ELEMENTS.SERVED_ITEM, ServedItem);
});
