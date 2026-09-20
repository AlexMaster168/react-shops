import { Dropdown, Pagination } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../store';
import { setPage, setPageSize } from '../store/filterSlice';
import { selectPageCount } from '../store/selectors';

const sizes = [4, 8, 12].map(n => ({ key: n, value: n, text: `${n} на странице` }));

export default function Pager() {
  const dispatch = useAppDispatch();
  const { page, pageSize } = useAppSelector(s => s.filter);
  const pages = useAppSelector(selectPageCount);

  return (
    <div className="pager">
      <Pagination
        activePage={Math.min(page, pages)}
        totalPages={pages}
        onPageChange={(_, d) => dispatch(setPage(Number(d.activePage)))}
      />
      <Dropdown
        selection
        compact
        value={pageSize}
        options={sizes}
        onChange={(_, d) => dispatch(setPageSize(Number(d.value)))}
      />
    </div>
  );
}
