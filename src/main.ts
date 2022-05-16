import { createCustomElement } from '@/common';
import { Header, Menu, Modal, OrderList, OrderListItem, Serving } from '@/components';
import { App } from '@/App';
import { Cafe, createMenu } from '@/cafe';
import { Orders } from '@/domain';

window.addEventListener('load', () => {
  createCustomElement('cafe-header', Header);
  createCustomElement('cafe-menu', Menu);
  createCustomElement('cafe-order-list', OrderList);
  createCustomElement('cafe-order-list-item', OrderListItem);
  createCustomElement('cafe-modal', Modal);
  createCustomElement('cafe-serving', Serving);
});

new App(new Cafe(new Orders(), createMenu()));
