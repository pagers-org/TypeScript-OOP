export default class OrderTableComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    this.shadowRoot.innerHTML = /* html */ `<link rel="stylesheet" href="./assets/css/index.css"></link>`;
    wrapper.setAttribute("class", "wrapper");
    wrapper.innerHTML = /*html */ `
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
                            <div class="table-row">
                                <div class="cell" data-title="No">1</div>
                                <div class="cell" data-title="메뉴명">아메리카노</div>
                                <div class="cell" data-title="사이즈">Tall</div>
                                <div class="cell" data-title="샷">2</div>
                                <div class="cell" data-title="시럽">-</div>
                                <div class="cell" data-title="ICE/HOT">ICE</div>
                                <div class="cell" data-title="얼음 종류">각얼음</div>
                                <div class="cell" data-title="휘핑 크림">-</div>
                                <div class="cell" data-title="엑스트라">-</div>
                                <div class="cell" data-title="컵">1회용 컵</div>
                                <div class="cell" data-title="수정하기">
                                    <span class="edit-order"><i class="fa-solid fa-pen"></i></span>
                                </div>
                                <div class="cell" data-title="삭제하기">
                                    <span class="remove-order"><i class="fa-solid fa-trash-can"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

    this.shadowRoot.append(wrapper);
  }
}
