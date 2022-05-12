import { getCoffeeNameOnly, getRandomCoffee } from '../helper/util';
import { $, $all } from '../helper/dom';
import OrderModel from '../model/order';
import OrderView from '../view/order';
import { OrderItemType } from '../@types';

export default class OrderController {
  constructor(model: OrderModel, view: OrderView) {
    this.model = model;
    this.view = view;
    this.bindEvent(model, view);
  }

  bindEvent(model: OrderModel, view: OrderView) {
    let currentElement: HTMLButtonElement | null = null;
    const coffeeButtons = $all<HTMLButtonElement>('.coffee-category-button');
    const addCoffeeOptionsForm = $<HTMLFormElement>('.coffee-add-area form');
    const modalLayout = $<HTMLDivElement>('.modal-layout');
    const orderButton = $<HTMLButtonElement>('.order-button');
    const coffeeName = $<HTMLHeadingElement>('.coffee_name');
    const coffeeFilling = $<HTMLDivElement>('.filling');

    orderButton.addEventListener('click', () => {
      model.add(getRandomCoffee());
      view.render();
      this.bindFutureEvent(model);
      this.controlButtons(model.orders);
    });

    addCoffeeOptionsForm.addEventListener('submit', e => {
      e.preventDefault();
      if (model.orders.length === 0) return alert('주문이 없어요 ☕️');

      modalLayout.classList.toggle('hidden');
    });

    modalLayout.addEventListener('click', e => {
      const $target = e.target as HTMLElement;
      if (!$target.matches('#close-icon')) return;
      modalLayout.classList.toggle('hidden');
    });

    coffeeButtons.forEach(button =>
      button.addEventListener('click', e => {
        if (currentElement) {
          currentElement.classList.remove('selected');
          coffeeFilling.classList.remove(currentElement.id);
        }

        currentElement = button;
        coffeeFilling.classList.add(currentElement.id);
        currentElement.classList.add('selected');
        coffeeName.innerText = button.innerText;
      }),
    );
  }

  bindFutureEvent(model: OrderModel) {
    $all<HTMLDivElement>('[data-title="수정하기"]').forEach(button => {
      button.addEventListener('click', e => {
        const target = e.target as HTMLDivElement;
        const row = target.closest('.table-row') as HTMLDivElement;
        const _id = row.dataset.key as string;
        const children = row.children;

        for (let i = 1; i < 10; i++) {
          children[i].contentEditable = true;
          children[i].addEventListener('input', () => {
            model.modify({
              _id,
              menu: children[1].innerText,
              size: children[2].innerText,
              shot: children[3].innerText,
              syrup: children[4].innerText,
              iceOrHot: children[5].innerText,
              ice: children[6].innerText,
              cream: children[7].innerText,
              extra: children[8].innerText,
              cup: children[9].innerText,
            });
          });
        }
      });
    });

    $all<HTMLDivElement>('[data-title="삭제하기"]').forEach(button => {
      button.addEventListener('click', e => {
        const target = e.target as HTMLDivElement;
        const row = target.closest('.table-row') as HTMLDivElement;
        const _id = row.dataset.key as string;
        model.remove(_id);
        row.remove();
        this.controlButtons(model.orders);
      });
    });
  }

  controlButtons(order: Array<OrderItemType>) {
    const coffeeButtons = $all<HTMLButtonElement>('.coffee-category-button');
    coffeeButtons.forEach(button => {
      if (!getCoffeeNameOnly(order).includes(button.innerText)) {
        button.disabled = true;
        return;
      }
      button.disabled = false;
    });
  }
}
