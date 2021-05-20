import React from 'react';
import {Card, Image, Button} from 'semantic-ui-react';
import { Rating } from '@material-ui/lab';

const BookCard = book => {
    const { title, author, price, image, addToCart,rating, addedCount} = book;
    return (
        <Card>
            <div className="card-image">
                <Image src={image} />
            </div>
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                    <span className="date">{author}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Rating
                    name="simple-controlled"
                    size={"large"}
                    value={rating}
                    className="rating"
                />
                <a>
                    <i className="fas fa-hryvnia"/>
                    {price}
                </a>
            </Card.Content>
            <Button onClick={addToCart.bind(this, book)}>
                Добавить в корзину {addedCount > 0 && `(${addedCount})`}
            </Button>
        </Card>
    );
};

export default BookCard;
