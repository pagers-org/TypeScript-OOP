import Component, { Template } from '@/core/Component';
import Order from '@/Model/Order';
import { ORDERS } from '@/Stores/constants';

class OrderRow extends Component {
  $container!: HTMLElement;
  $optionGroups!: HTMLElement[];
  order!: Order;

  protected componentDidMonted: () => void = () => {
    this.addEventListener(ORDERS, e => {
      this.setOrder(e.detail!.payload as Order);
    });
  };

  public setOrder(order: Order) {
    this.order = order;
    this.render();
  }

  private createCell(title: string, textContent?: string | number) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-title', title);
    cell.textContent = String(textContent || '');
    return cell;
  }

  private appendButtonIcon(cell: HTMLDivElement) {
    const span = document.createElement('span');
    span.classList.add('edit-order');

    const cellType = cell.getAttribute('data-title')!;
    const { icon, onClick } = this.getButtonAttribute(cellType);

    const i = document.createElement('i');
    i.classList.add('fa-solid');
    i.classList.add(icon);
    span.appendChild(i);
    span.addEventListener('click', onClick);
    cell.appendChild(span);
    return cell;
  }

  private getButtonAttribute = (type: string) => {
    if (type === '수정하기') {
      return {
        icon: 'fa-pen',
        onClick: () => {
          this.$optionGroups.forEach($optionGroup => {
            const CONTENT_EDITABLE = 'contenteditable';
            const isEditable = $optionGroup.getAttribute(CONTENT_EDITABLE);
            if (isEditable) {
              return $optionGroup.removeAttribute(CONTENT_EDITABLE);
            }
            $optionGroup.setAttribute(CONTENT_EDITABLE, 'true');
          });
        },
      };
    }

    return {
      icon: 'fa-trash-can',
      onClick: () => {
        this.destroy();
      },
    };
  };

  private destroy = () => {
    this.$container.remove();
    this.remove();
  };

  protected template: () => Template = () => {
    const tableRowWrapper = document.createElement('div');
    tableRowWrapper.classList.add('table-row');
    this.$container = tableRowWrapper;

    if (!this.order) {
      const div = document.createElement('div');
      div.textContent = 'loading...';
      return {
        parent: tableRowWrapper,
        children: [div],
      };
    }

    const idCell = this.createCell('id', 1);
    const cafe = this.createCell('메뉴명', this.order.drink.menuName);
    const optionGroups = this.order.optionGroups.map(optionGroup => {
      const optionName = optionGroup.name;
      const selectedOption = optionGroup.getSelectedOption()[0];
      return this.createCell(optionName, selectedOption.name);
    }, this);
    this.$optionGroups = optionGroups;
    const editButton = this.appendButtonIcon(this.createCell('수정하기'));
    const deleteButton = this.appendButtonIcon(this.createCell('삭제하기'));

    return {
      parent: tableRowWrapper,
      children: [idCell, cafe, ...optionGroups, editButton, deleteButton],
    };
  };
}

export default OrderRow;
