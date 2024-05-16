import React from 'react';
import { Card, Button, Badge, Row, Image } from 'react-bootstrap';

const BookCard = () => {
  return (
    <Card className='col-lg-5 col-md-5 col-sm-6 p-2'>
      <div className='row'>
        <Image className='img-fluid col-md-5' variant="top" src="/images/book.png" alt="Book Icon" />
        <div className='col-md-7'>
          <Card.Title>Lorem ipsum dolor sit amet</Card.Title>
          <Card.Text>
            <div>
              <strong>Estado do livro: </strong>
              <br/>
              <Badge bg="secondary">Semi-novo</Badge>
            </div>
            <div>
              <strong>Tipo de entrega: </strong>
              <br/>
              <Badge bg="secondary">Entrega em mãos</Badge>{' '}
              <Badge bg="secondary">Correios</Badge>
            </div>
          </Card.Text>
          <div className='row'>
            <Button className="col-md-5 m-2" variant="primary">Excluir</Button>
            <Button className="col-md-5 m-2" variant="secondary">Editar</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
