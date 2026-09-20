import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../types';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as CartItem[] },
  reducers: {
    // +1 штука
    addOne(state, { payload: id }: PayloadAction<number>) {
      const item = state.items.find(i => i.id === id);
      if (item) item.qty += 1;
      else state.items.push({ id, qty: 1 });
    },
    // -1 штука, на нуле позиция пропадает
    removeOne(state, { payload: id }: PayloadAction<number>) {
      const item = state.items.find(i => i.id === id);
      if (!item) return;
      item.qty -= 1;
      if (item.qty <= 0) state.items = state.items.filter(i => i.id !== id);
    },
    // убрать позицию целиком
    removeAll(state, { payload: id }: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== id);
    },
    clear(state) {
      state.items = [];
    },
  },
});

export const { addOne, removeOne, removeAll, clear } = cartSlice.actions;
export default cartSlice.reducer;
