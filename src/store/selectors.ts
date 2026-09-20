import { createSelector } from '@reduxjs/toolkit';
import type { Book } from '../types';
import type { RootState } from '.';

const compare: Record<string, (a: Book, b: Book) => number> = {
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  rating_desc: (a, b) => b.rating - a.rating,
  rating_asc: (a, b) => a.rating - b.rating,
  author: (a, b) => a.author.localeCompare(b.author, 'ru'),
};

const selectBooks = (s: RootState) => s.books.items;
const selectFilter = (s: RootState) => s.filter;

export const selectAuthors = createSelector(selectBooks, books =>
  [...new Set(books.map(b => b.author))].sort((a, b) => a.localeCompare(b, 'ru')),
);

export const selectMaxBookPrice = createSelector(selectBooks, books => Math.max(0, ...books.map(b => b.price)));

export const selectFiltered = createSelector([selectBooks, selectFilter], (books, f) => {
  const q = f.query.trim().toLowerCase();
  const result = books.filter(
    b =>
      (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)) &&
      (!f.author || b.author === f.author) &&
      b.rating >= f.minRating &&
      (f.maxPrice === null || b.price <= f.maxPrice),
  );
  const cmp = compare[f.sortBy];
  return cmp ? result.sort(cmp) : result;
});

export const selectPageCount = createSelector([selectFiltered, selectFilter], (list, f) =>
  Math.max(1, Math.ceil(list.length / f.pageSize)),
);

export const selectPageItems = createSelector([selectFiltered, selectFilter, selectPageCount], (list, f, pages) => {
  const page = Math.min(f.page, pages);
  return list.slice((page - 1) * f.pageSize, page * f.pageSize);
});

export const selectCartLines = createSelector([selectBooks, (s: RootState) => s.cart.items], (books, items) =>
  items.flatMap(i => {
    const book = books.find(b => b.id === i.id);
    return book ? [{ book, qty: i.qty }] : [];
  }),
);

export const selectCartTotals = createSelector(selectCartLines, lines => ({
  count: lines.reduce((n, l) => n + l.qty, 0),
  price: lines.reduce((n, l) => n + l.qty * l.book.price, 0),
}));
