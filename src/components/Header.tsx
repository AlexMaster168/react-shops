import { Button, Header as SHeader, Icon, Image, List, Menu, Popup } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../store';
import { addOne, clear, removeAll, removeOne } from '../store/cartSlice';
import { selectCartLines, selectCartTotals } from '../store/selectors';

function CartList() {
  const dispatch = useAppDispatch();
  const lines = useAppSelector(selectCartLines);
  const { price } = useAppSelector(selectCartTotals);

  if (!lines.length) return <p>Корзина пуста</p>;

  return (
    <>
      <List divided verticalAlign="middle">
        {lines.map(({ book, qty }) => (
          <List.Item key={book.id}>
            <List.Content floated="right">
              <Button.Group size="mini">
                <Button icon="minus" aria-label="Убрать одну" onClick={() => dispatch(removeOne(book.id))} />
                <Button disabled content={qty} />
                <Button icon="plus" aria-label="Добавить ещё одну" onClick={() => dispatch(addOne(book.id))} />
              </Button.Group>
              <Button
                size="mini"
                color="red"
                icon="trash"
                aria-label="Удалить позицию"
                onClick={() => dispatch(removeAll(book.id))}
              />
            </List.Content>
            <Image avatar src={`${import.meta.env.BASE_URL}${book.image}`} />
            <List.Content>
              <List.Header>{book.title}</List.Header>
              {qty} × {book.price} = {qty * book.price} грн
            </List.Content>
          </List.Item>
        ))}
      </List>
      <SHeader as="h4">Итого: {price} грн</SHeader>
      <Button size="small" onClick={() => dispatch(clear())}>
        Очистить корзину
      </Button>
    </>
  );
}

export default function Header() {
  const { count, price } = useAppSelector(selectCartTotals);

  return (
    <Menu>
      <Menu.Item header>Магазин книг</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          Итого:&nbsp;<b>{price}</b>&nbsp;грн
        </Menu.Item>
        <Popup
          on="click"
          position="bottom right"
          wide="very"
          trigger={
            <Menu.Item as="a">
              <Icon name="shopping cart" /> Корзина (<b>{count}</b>)
            </Menu.Item>
          }
          content={<CartList />}
        />
      </Menu.Menu>
    </Menu>
  );
}
