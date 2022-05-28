import TableRow from '@/components/OrderUI/OrderTable/TableRow';
import OrderDTO from '@/domains/order/OrderDTO';

const TableRows = ({ rows }: { rows: OrderDTO[] }) => {
  const $frag = document.createDocumentFragment();
  rows.forEach(item => $frag.appendChild(TableRow({ order: item })));
  return $frag;
};

export default TableRows;
