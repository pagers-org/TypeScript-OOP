import Drink from '@/Model/Drink';

// 메뉴 하나를 담당하는 view
class OrderRow extends HTMLDivElement {
  drinkRow: HTMLDivElement[] = [];

  constructor(drink: Drink) {
    super();
    this.setAttribute('class', 'table-row');

    const drinkName = this.createCell(drink.name, drink.name);
    this.drinkRow.push(drinkName);

    drink.getOptions().forEach(option => {
      const optionCell = this.createCell(option.name, option.getSelectedOption());
      this.drinkRow.push(optionCell);
    });

    this.drinkRow.push(this.createButton('수정하기'));
    this.drinkRow.push(this.createButton('삭제하기'));
  }

  private createCell(title: string, content: string | number) {
    const newCell = document.createElement('div');
    newCell.setAttribute('class', 'cell');
    newCell.setAttribute('data-title', 'cell');
    newCell.textContent = String(content);

    return newCell;
  }

  private getButtonAttribute = (type: string) => {
    if (type === '수정하기') {
      const listener = function (this: OrderRow) {
        console.log(this);
      }.bind(this);

      return {
        listener,
        icon: 'fa-pen',
      };
    }

    const listener = function (this: OrderRow) {
      this.remove();
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

    newButton.appendChild(newButton);
    newButton.addEventListener('click', listener);

    return newButton;
  };
}

export default OrderRow;
