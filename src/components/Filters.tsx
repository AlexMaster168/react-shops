import { Button, Dropdown, Form, Input, Rating, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  resetFilters,
  setAuthor,
  setMaxPrice,
  setMinRating,
  setQuery,
  setSortBy,
} from '../store/filterSlice';
import { selectAuthors, selectFiltered, selectMaxBookPrice } from '../store/selectors';
import type { SortKey } from '../types';

const sortOptions: { key: SortKey; text: string }[] = [
  { key: 'default', text: 'По умолчанию' },
  { key: 'price_asc', text: 'Цена: сначала дешёвые' },
  { key: 'price_desc', text: 'Цена: сначала дорогие' },
  { key: 'rating_desc', text: 'Рейтинг: высокий' },
  { key: 'rating_asc', text: 'Рейтинг: низкий' },
  { key: 'author', text: 'Автор (А–Я)' },
];

export default function Filters() {
  const dispatch = useAppDispatch();
  const f = useAppSelector(s => s.filter);
  const authors = useAppSelector(selectAuthors);
  const maxBookPrice = useAppSelector(selectMaxBookPrice);
  const found = useAppSelector(selectFiltered).length;

  return (
    <Segment>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Поиск</label>
            <Input
              icon="search"
              placeholder="Название или автор..."
              value={f.query}
              onChange={(_, d) => dispatch(setQuery(d.value))}
            />
          </Form.Field>
          <Form.Field>
            <label>Автор</label>
            <Dropdown
              selection
              search
              clearable
              placeholder="Все авторы"
              value={f.author}
              options={authors.map(a => ({ key: a, value: a, text: a }))}
              onChange={(_, d) => dispatch(setAuthor(String(d.value ?? '')))}
            />
          </Form.Field>
          <Form.Field>
            <label>Сортировка</label>
            <Dropdown
              selection
              value={f.sortBy}
              options={sortOptions.map(o => ({ key: o.key, value: o.key, text: o.text }))}
              onChange={(_, d) => dispatch(setSortBy(d.value as SortKey))}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Цена до, грн</label>
            <Input
              type="number"
              min={0}
              placeholder={`до ${maxBookPrice}`}
              value={f.maxPrice ?? ''}
              onChange={(_, d) => dispatch(setMaxPrice(d.value === '' ? null : Math.max(0, Number(d.value))))}
            />
          </Form.Field>
          <Form.Field>
            <label>Рейтинг от</label>
            <Rating
              size="large"
              maxRating={5}
              clearable
              rating={f.minRating}
              onRate={(_, d) => dispatch(setMinRating(Number(d.rating)))}
            />
          </Form.Field>
          <Form.Field>
            <label>Найдено: {found}</label>
            <Button type="button" onClick={() => dispatch(resetFilters())}>
              Сбросить фильтры
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </Segment>
  );
}
