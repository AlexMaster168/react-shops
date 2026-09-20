import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Book } from '../types';

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}books.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as Book[];
});

interface BooksState {
  items: Book[];
  status: 'idle' | 'loading' | 'ready' | 'error';
}

const initialState: BooksState = { items: [], status: 'idle' };

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchBooks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.status = 'ready';
      })
      .addCase(fetchBooks.rejected, state => {
        state.status = 'error';
      }),
});

export default booksSlice.reducer;
