export interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
  rating: number;
}

export interface CartItem {
  id: number;
  qty: number;
}

export type SortKey = 'default' | 'price_asc' | 'price_desc' | 'rating_desc' | 'rating_asc' | 'author';
