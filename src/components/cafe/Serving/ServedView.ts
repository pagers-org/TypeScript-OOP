export const servedView = () => String.raw`
<div class='cafe-serving'>
  <span class="maked-list-view">
    <button>현재까지 서빙된 커피 확인하기</button>
  </span>
  <div class="maked-list">
    <h1>현재까지 서빙된 커피</h1>
    <div class="wrapper">
      <div class="table" id="maked-table">
        <div class="table-row header">
          <div class="cell">No</div>
          <div class="cell">메뉴(수량)</div>
          <div class="cell">최근 주문 시간</div>
          <div class="cell">최근 서빙 완료 시간</div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
