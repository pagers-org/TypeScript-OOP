import { createCustomElement } from '@/common';
import { Header, Menu, Modal, OrderList, OrderListItem, Served } from '@/components';
import { App } from '@/App';
import { Cafe, createMenu } from '@/cafe';
import { Orders, Servings } from '@/domain';

window.addEventListener('load', () => {
  createCustomElement('cafe-header', Header);
  createCustomElement('cafe-menu', Menu);
  createCustomElement('cafe-order-list', OrderList);
  createCustomElement('cafe-order-list-item', OrderListItem);
  createCustomElement('cafe-modal', Modal);
  createCustomElement('cafe-serving', Served);
});

new App(new Cafe(new Orders(), createMenu(), new Servings()));
