import OrderList from '../order-list';
const orderList = new OrderList();

export default function OrderItem() {
  const { id, name, size, shots, syrup, hasIce, iceType, whipping, extra, cupType } = orderList.orderCoffee();

  return `
    <div class="table-row">
    <div class="cell" data-title="No">${id + 1}</div>
    <div class="cell" data-title="메뉴명">${name}</div>
    <div class="cell" data-title="사이즈">${size}</div>
    <div class="cell" data-title="샷">${shots}</div>
    <div class="cell" data-title="시럽">${syrup}</div>
    <div class="cell" data-title="ICE/HOT">${hasIce}</div>
    <div class="cell" data-title="얼음 종류">${iceType}</div>
    <div class="cell" data-title="휘핑 크림">${whipping}</div>
    <div class="cell" data-title="엑스트라">${extra}</div>
    <div class="cell" data-title="컵">${cupType}</div>
    <div class="cell" data-title="수정하기">
      <span class="edit-order"
        ><i class="fa-solid fa-pen"></i
      ></span>
    </div>
    <div class="cell" data-title="삭제하기">
      <span class="remove-order"
        ><i class="fa-solid fa-trash-can"></i
      ></span>
    </div>
  </div>
    `;
}
