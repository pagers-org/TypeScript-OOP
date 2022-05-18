import { $ } from '@/helper/dom';
import { order } from '@/coffee/order';
import { Template } from '@/view/Template';

export default class OrderArea extends Template {
  constructor() {
    super();
    const rootNode = $<HTMLElement>('#left-section');
    rootNode.insertAdjacentHTML('afterbegin', this.template());
    this.createOrderRow();
    this.bindEvent();
  }

  bindEvent() {
    const orderButton = $<HTMLButtonElement>('.order-button');
    // const modifyButton = $<HTMLSpanElement>('.edit-order');
    // const removeButton = $<HTMLSpanElement>('.remove-order');
    orderButton.addEventListener('click', this.createOrderRow);
    //modifyButton.addEventListener('click', this.modifyOrderRow);
    //removeButton.addEventListener('click', this.removeOrderRow);
  }

  removeOrderRow(e) {
    const row = e.target.closest('.table-row');
    const id = row.dataset.key;
    order.removeOrder(id);
    row.remove();
  }
  modifyOrderRow(e) {
    // modify
  }

  createOrderRow() {
    const { _id, menu, size, cup, iceOrHot, ice, shot, cream, extra, syrup } = order.createOrder();
    const table = $<HTMLDivElement>('#order-table');
    const row = ` 
            <div class="table-row" data-key=${_id}>
            <div class="cell" data-title="No">1</div>
            <div class="cell" data-title="메뉴명">${menu}</div>
            <div class="cell" data-title="사이즈">${size}</div>
            <div class="cell" data-title="샷">${shot}</div>
            <div class="cell" data-title="시럽">${syrup}</div>
            <div class="cell" data-title="ICE/HOT">${iceOrHot}</div>
            <div class="cell" data-title="얼음 종류">${iceOrHot === 'HOT' ? '-' : ice}</div>
            <div class="cell" data-title="휘핑 크림">${cream}</div>
            <div class="cell" data-title="엑스트라">${extra}</div>
            <div class="cell" data-title="컵">${cup}</div>
            <div class="cell" data-title="수정하기">
              <span class="edit-order"><i class="fa-solid fa-pen"></i></span>
            </div>
            <div class="cell" data-title="삭제하기">
              <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
            </div>
          </div>`;
    table.insertAdjacentHTML('beforeend', row);
  }

  template() {
    return `
        <div class="order-list">
          <h1>주문 목록</h1>
          <div class="order-button-area">
            <button class="order-button">주문 받기</button>
          </div>
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
            </div>
          </div>
        </div>

`;
  }
}
