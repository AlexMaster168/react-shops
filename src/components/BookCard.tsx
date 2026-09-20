import { useState } from 'react';
import { Button, Card, Icon, Image, Rating } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../store';
import { addOne, removeOne } from '../store/cartSlice';
import type { Book } from '../types';

const PLACEHOLDER = `${import.meta.env.BASE_URL}covers/placeholder.svg`;

export default function BookCard({ book }: { book: Book }) {
  const dispatch = useAppDispatch();
  const qty = useAppSelector(s => s.cart.items.find(i => i.id === book.id)?.qty ?? 0);
  const [src, setSrc] = useState(`${import.meta.env.BASE_URL}${book.image}`);

  return (
    <Card>
      <div className="card-image">
        <Image src={src} alt={book.title} onError={() => setSrc(PLACEHOLDER)} />
      </div>
      <Card.Content>
        <Card.Header>{book.title}</Card.Header>
        <Card.Meta>{book.author}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Rating rating={book.rating} maxRating={5} disabled />
        <b style={{ float: 'right' }}>{book.price} грн</b>
      </Card.Content>
      {qty === 0 ? (
        <Button primary attached="bottom" onClick={() => dispatch(addOne(book.id))}>
          <Icon name="cart plus" /> В корзину
        </Button>
      ) : (
        <Button.Group attached="bottom">
          <Button icon="minus" aria-label="Убрать одну" onClick={() => dispatch(removeOne(book.id))} />
          <Button disabled content={`${qty} шт.`} />
          <Button icon="plus" aria-label="Добавить ещё одну" onClick={() => dispatch(addOne(book.id))} />
        </Button.Group>
      )}
    </Card>
  );
}
