import { $, $all } from '../utils/dom';
import { CoffeeDTO } from '../@types';

export class OrderView {
  private orderTable = $("#order-table") as HTMLDivElement;
  createOrderRow(coffee: CoffeeDTO) {
    const content = `
      <div class="table-row" data-key=${coffee.id}>
        <div class="cell" data-title="No">${coffee.id}</div>
          <div class="cell" data-title="메뉴명">${coffee.name}</div>
          <div class="cell" data-title="사이즈">${coffee.size}</div>
          <div class="cell" data-title="샷">${coffee.shot}</div>
          <div class="cell" data-title="시럽">${coffee.syrup}</div>
          <div class="cell" data-title="ICE/HOT">${coffee.iceHot}</div>
          <div class="cell" data-title="얼음 종류">${coffee.ice}</div>
          <div class="cell" data-title="휘핑 크림">${coffee.whippedCream}</div>
          <div class="cell" data-title="엑스트라">${coffee.extra}</div>
          <div class="cell" data-title="컵">${coffee.cup}</div>
          <div class="cell" data-title="수정하기">
            <span class="edit-order"><i class="fa-solid fa-pen"></i></span>
          </div>
          <div class="cell" data-title="삭제하기">
            <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
        </div>
      </div>
    `;
    this.orderTable.insertAdjacentHTML("beforeend", content);
  }
  deleteOrderRow(id: number) {
    const deletedItem = $(`[data-key="${id}"]`) as HTMLDivElement;
    deletedItem.remove();
  }
}
