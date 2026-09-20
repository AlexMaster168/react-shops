import { useEffect } from 'react';
import { Card, Container, Message, Loader } from 'semantic-ui-react';
import { fetchBooks } from '../store/booksSlice';
import { selectFiltered, selectPageItems } from '../store/selectors';
import { useAppDispatch, useAppSelector } from '../store';
import BookCard from './BookCard';
import Filters from './Filters';
import Header from './Header';
import Pager from './Pager';

export default function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(s => s.books.status);
  const items = useAppSelector(selectPageItems);
  const total = useAppSelector(selectFiltered).length;

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Filters />
      {status === 'error' && <Message negative>Не удалось загрузить каталог</Message>}
      {status === 'loading' && <Loader active inline="centered" />}
      {status === 'ready' && total === 0 && <Message info>Ничего не найдено — попробуйте сменить фильтры</Message>}
      <Card.Group itemsPerRow={4} stackable doubling>
        {items.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </Card.Group>
      <Pager />
    </Container>
  );
}
