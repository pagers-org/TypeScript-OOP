import type Drink from '@/Model/Drink';
import OrderController from '@/Controller/OrderController';

// 메뉴 하나를 담당하는 view
// 한 줄을 만들어내는 컴포넌트에 가깝다.
class OrderRow {
  id: number;
  orderRowElement: HTMLDivElement;
  drinkRow: HTMLDivElement[] = [];
  isEditMode = false;
  orderController = OrderController;

  constructor(id: number, drink: Drink) {
    this.orderRowElement = document.createElement('div');
    this.orderRowElement.setAttribute('class', 'table-row');

    this.id = id;
    const idElement = this.createCell('id', id);
    this.drinkRow.push(idElement);

    const drinkName = this.createCell(drink.name, drink.name, true);
    this.drinkRow.push(drinkName);

    drink.getOptions().forEach(option => {
      const optionCell = this.createCell(option.name, option.getSelectedOption(), true);
      this.drinkRow.push(optionCell);
    });

    this.drinkRow.push(this.createButton('수정하기'));
    this.drinkRow.push(this.createButton('삭제하기'));

    this.drinkRow.forEach(row => {
      this.orderRowElement.appendChild(row);
    });
  }

  private createCell(title: string, content: string | number, isEditable = false) {
    const newCell = document.createElement('div');
    newCell.setAttribute('class', 'cell');
    newCell.setAttribute('data-title', title);
    if (isEditable) newCell.classList.add('editable');
    newCell.textContent = String(content);

    return newCell;
  }

  private getButtonAttribute = (type: string) => {
    if (type === '수정하기') {
      const listener = function (this: OrderRow) {
        const childrens = Array.from(this.orderRowElement.children);
        let attributeFunction: (children: Element) => void;

        if (!this.isEditMode) {
          attributeFunction = (children: Element) => {
            children.setAttribute('contenteditable', 'true');
          };
          this.isEditMode = true;
        } else {
          attributeFunction = (children: Element) => {
            children.removeAttribute('contenteditable');
          };
          this.isEditMode = false;
        }

        childrens.forEach(children => {
          if (children.classList.contains('editable')) {
            attributeFunction(children);
          }
        });
      }.bind(this);

      return {
        listener,
        icon: 'fa-pen',
      };
    }

    const listener = function (this: OrderRow) {
      this.orderController.deleteDrink(this.id - 1);
      this.orderRowElement.remove();
    }.bind(this);

    return {
      listener,
      icon: 'fa-trash-can',
    };
  };

  private createButton = (title: string) => {
    const { icon, listener } = this.getButtonAttribute(title);

    const newButton = document.createElement('div');
    newButton.setAttribute('class', 'cell');
    newButton.setAttribute('data-title', title);

    const span = document.createElement('span');
    span.setAttribute('class', 'edit-order');
    const iconEl = document.createElement('i');
    iconEl.setAttribute('class', `fa-solid ${icon}`);
    span.appendChild(iconEl);

    newButton.appendChild(span);
    newButton.addEventListener('click', listener);

    return newButton;
  };

  render() {
    return this.orderRowElement;
  }
}

export default OrderRow;
