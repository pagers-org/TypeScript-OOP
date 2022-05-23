import { ExtraSelection } from '@/businessLogic/extraSelection';
import TableRow from '@/components/OrderUI/OrderTable/TableRow';

const TableRows = ({ rows }: { rows: ExtraSelection[] }) => {
  const $frag = document.createDocumentFragment();
  rows.forEach(item => $frag.appendChild(TableRow({ item })));
  return $frag;
};

export default TableRows;
