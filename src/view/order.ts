import { OrderItemType } from '../@types';
import { $ } from '../helper/dom';
import OrderModel from '../model/order';

export default class OrderView {
  constructor(model: OrderModel) {
    this.model = model;
    this.rootNode = $<HTMLDivElement>('.order-list');
    this.rootNode.innerHTML += this.orderTable();
  }
  render() {
    this.tableNode = $<HTMLDivElement>('.table');
    this.tableNode.innerHTML = this.orderTable();
  }

  private orderTable() {
    return `
          <div class="wrapper">
            <div class="table" id="order-table">
              <div class="table-row header">
                <div class="cell">No</div>
                <div class="cell">메뉴명</div>
                <div class="cell">사이즈</div>
                <div class="cell">샷</div>
                <div class="cell">시럽</div>
                <div class="cell">ICE/HOT</div>
                <div class="cell">얼음 종류</div>
                <div class="cell">휘핑 크림</div>
                <div class="cell">엑스트라</div>
                <div class="cell">컵</div>
                <div class="cell">수정하기</div>
                <div class="cell">삭제하기</div>
              </div>
              ${this.createOrderRow()}
              </div>
            </div>
          </div>
`;
  }
  private createOrderRow() {
    return this.model.orders
      .map(
        (order: OrderItemType, _idx: number) => `
              <div class="table-row" data-key=${order._id}>
                <div class="cell" data-title="No">${_idx + 1}</div>
                <div class="cell" data-title="메뉴명">${order.menu}</div>
                <div class="cell" data-title="사이즈">Tall</div>
                <div class="cell" data-title="샷">${order.shot}</div>
                <div class="cell" data-title="시럽">-</div>
                <div class="cell" data-title="ICE/HOT">ICE</div>
                <div class="cell" data-title="얼음 종류">-</div>
                <div class="cell" data-title="휘핑 크림">-</div>
                <div class="cell" data-title="엑스트라">-</div>
                <div class="cell" data-title="컵">${order.cup}</div>
                <div class="cell" data-title="수정하기">
                  <span class="edit-order"><i class="fa-solid fa-pen"></i></span>
                </div>
                <div class="cell" data-title="삭제하기">
                  <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
                </div>
              </div>`,
      )
      .join(' ');
  }

  closeKitchen() {}
}
