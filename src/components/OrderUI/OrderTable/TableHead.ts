import { createDom } from '@/utils';

const TableHead = () =>
  createDom(`
    <div class="table-row header" >
        <div class="cell">No</div>
        <div class="cell">메뉴명</div>
        <div class="cell">사이즈</div>
        <div class="cell">샷</div>
        <div class="cell">시럽</div>
        <div class="cell">ICE/HOT</div>
        <div class="cell">얼음 종류</div>
        <div class="cell">휘핑 크림</div>
        <div class="cell">엑스트라</div>
        <div classr="cell">컵</div>
        <div class="cell">수정하기</div>
        <div class="cell">삭제하기</div>
    </div>
`);

export default TableHead;
