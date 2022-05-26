import store from "../store";
import Order from "../store/domain/Order";

export default class OrderTableComponent extends HTMLElement {
  constructor(private readonly Store = store) {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    this.shadowRoot.innerHTML = /* html */ `<link rel="stylesheet" href="./assets/css/index.css"></link>`;

    wrapper.setAttribute("class", "wrapper");
    wrapper.innerHTML = this.getBaseMarkup();

    wrapper.querySelector(".order-button")?.addEventListener("click", () => {
      Store.dispatch("makeOrder");
      this.renderOrderList();
    });

    this.shadowRoot.append(wrapper);
  }

  renderOrderList() {
    const target = this.shadowRoot.querySelector(".table-row.header");

    this.removePreStateOrders(target);
    this.reRenderNewStateOrer(target);
  }

  removePreStateOrders = (target: HTMLElement) => {
    if (target.nextElementSibling) {
      while (target.nextElementSibling) {
        target.nextElementSibling.remove();
      }
    }
  };

  reRenderNewStateOrer = (target: HTMLElement) => {
    this.Store.state.orders.forEach((order: Order) => {
      const tableRowElement = document.createElement("div");
      tableRowElement.setAttribute("class", "table-row");
      tableRowElement.innerHTML = this.getNewOrderMarkup(order);
      target.parentElement.append(tableRowElement);
    });
  };

  getBaseMarkup = () => {
    return /*html */ `
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
                </div>`;
  };

  getNewOrderMarkup = (order: Order) => {
    return /* html */ `
            <div class="cell" data-title="No">0</div>
            <div class="cell" data-title="메뉴명">${order.coffee.name}</div>
            <div class="cell" data-title="사이즈">${order.size.name}</div>
            <div class="cell" data-title="샷">${order.shot.name}</div>
            <div class="cell" data-title="시럽">${order.syrup.name}</div>
            <div class="cell" data-title="ICE/HOT">${order.iceOrHot.name}</div>
            <div class="cell" data-title="얼음 종류">${order.ice.name}</div>
            <div class="cell" data-title="휘핑 크림">${order.whippingCream.name}</div>
            <div class="cell" data-title="엑스트라">${order.extra.name}</div>
            <div class="cell" data-title="컵">${order.cup.name}</div>
            <div class="cell" data-title="수정하기">
                <span class="edit-order">수정</span>
            </div>
            <div class="cell" data-title="삭제하기">
                <span class="remove-order">삭제</span>
            </div>
          `;
  };
}
