import OrderRow from '@/View/OrderList/OrderRow/OrderRow';
import Drink from '@/Model/Drink';
import Option from '@/Model/Option';

// 주문목록을 담당하는 view

// 전체 orderTable
const orderTable = document.getElementById('order-table')!;
// 주문받기 버튼
const newOrderButton = document.getElementById('new-order');

// 과제 사항 1, 주문하기 버튼을 누르면 랜덤으로 생성된다.
// @prettier-ignore
newOrderButton?.addEventListener('click', () => {
  console.log('click');
  const drink = new Drink({ name: '아메리카노', options: [
    new Option({
      name: '사이즈',
      selections: ['Tall', 'Grande', 'Venti'],
      selectedIndex: 1,
      type: 'radio',
    }),
    new Option({
      name: '샷',
      selections: ['1', '2', '3'],
      selectedIndex: 0,
      type: 'radio',
    }),
    new Option({
      name: '시럽',
      selections: ['-', '1', '2'],
      selectedIndex: 0,
      type: 'radio',
    }),
    new Option({
      name: 'ICE/HOT',
      selections: ['ICE', 'HOT'],
      selectedIndex: 0,
      type: 'radio',
    }),
    new Option({
      name: '얼음종류',
      selections: ['각얼음', '간얼음'],
      selectedIndex: 0,
      type: 'radio',
    }),
    new Option({
      name: '휘핑크림',
      selections: ['-', '넣음'],
      selectedIndex: 0,
      type: 'radio',
    }),
    new Option({
      name: '엑스트라',
      selections: ['-'],
      selectedIndex: 0,
      type: 'checkbox',
    }),
    new Option({
      name: '컵',
      selections: ['1회용 컵', '다회용 컵', '개인 컵'],
      selectedIndex: 0,
      type: 'radio',
    }),
  ]
  });

  const newRowNumber = orderTable.children.length;
  const newOrderRow = new OrderRow(newRowNumber, drink);

  orderTable.appendChild(newOrderRow.render());
});
