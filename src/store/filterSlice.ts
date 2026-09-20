import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SortKey } from '../types';

export interface FilterState {
  query: string;
  author: string; // '' = все авторы
  minRating: number; // 0 = любой
  maxPrice: number | null; // null = без ограничения
  sortBy: SortKey;
  page: number;
  pageSize: number;
}

const initialState: FilterState = {
  query: '',
  author: '',
  minRating: 0,
  maxPrice: null,
  sortBy: 'default',
  page: 1,
  pageSize: 8,
};

// любое изменение фильтров/сортировки возвращает на первую страницу
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(s, a: PayloadAction<string>) {
      s.query = a.payload;
      s.page = 1;
    },
    setAuthor(s, a: PayloadAction<string>) {
      s.author = a.payload;
      s.page = 1;
    },
    setMinRating(s, a: PayloadAction<number>) {
      s.minRating = a.payload;
      s.page = 1;
    },
    setMaxPrice(s, a: PayloadAction<number | null>) {
      s.maxPrice = a.payload;
      s.page = 1;
    },
    setSortBy(s, a: PayloadAction<SortKey>) {
      s.sortBy = a.payload;
      s.page = 1;
    },
    setPage(s, a: PayloadAction<number>) {
      s.page = a.payload;
    },
    setPageSize(s, a: PayloadAction<number>) {
      s.pageSize = a.payload;
      s.page = 1;
    },
    resetFilters: s => ({ ...initialState, pageSize: s.pageSize }),
  },
});

export const { setQuery, setAuthor, setMinRating, setMaxPrice, setSortBy, setPage, setPageSize, resetFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
