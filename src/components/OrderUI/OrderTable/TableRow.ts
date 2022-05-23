import { ExtraSelection } from '@/businessLogic/extraSelection';
import { createDom } from '@/utils';

const TableRow = ({ item }: { item: ExtraSelection }) => {
  const template = ({ item }: { item: ExtraSelection }) => `
    <div class="table-row" data-order-id="${item.id}" >
        <div class="cell" data-title="No">${item.id}</div>
        <div class="cell" data-title="메뉴명">아메리카노</div>
        <div class="cell" data-title="사이즈">Tall</div>
        <div class="cell" data-title="샷">2</div>
        <div class="cell" data-title="시럽">${item.getSelected()}</div>
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
`;

  return createDom(template({ item }));
};

export default TableRow;
