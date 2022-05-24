import Component, { Template } from '@/core/Component';

class OrderRow extends Component {
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

  private getButtonAttribute(type: string) {
    if (type === '수정하기') {
      return {
        icon: 'fa-pen',
        onClick: () => {
          console.log('수정');
        },
      };
    }

    return {
      icon: 'fa-trash-can',
      onClick: () => {
        console.log('삭제');
      },
    };
  }

  protected template: () => Template = () => {
    const tableRowWrapper = document.createElement('div');
    tableRowWrapper.classList.add('table-row');

    const idCell = this.createCell('id', 1);
    const cafe = this.createCell('메뉴명', '카페라떼');
    const size = this.createCell('사이즈', 'Grande');
    const shot = this.createCell('샷', 1);
    const syrup = this.createCell('시럽', 1);
    const temp = this.createCell('ICE/HOT', 'ICE');
    const ice = this.createCell('얼음종류', '각얼음');
    const cream = this.createCell('휘핑크림', '-');
    const extra = this.createCell('엑스트라', '-');
    const cup = this.createCell('컵', '1회용 컵');
    const editButton = this.appendButtonIcon(this.createCell('수정하기'));
    const deleteButton = this.appendButtonIcon(this.createCell('삭제하기'));

    return {
      parent: tableRowWrapper,
      children: [idCell, cafe, size, shot, syrup, temp, ice, cream, extra, cup, editButton, deleteButton],
    };
  };
}

export default OrderRow;
