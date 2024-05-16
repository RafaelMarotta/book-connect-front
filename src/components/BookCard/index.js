import React from 'react';
import { Card, Button, Badge, Row, Image } from 'react-bootstrap';

const BookCard = ({handleCardClick, handleRemoveClick, handleEditClick}) => {
  return (
    <div className='col-lg-4 col-md-5 col-sm-6 mt-5'>
      <div className='row border p-2 m-1' >
        <Image className='img-fluid col-md-5' src="/images/book.png" alt="Book Icon" />
        <div className='col-md-7' onClick={handleCardClick} style={{cursor: 'pointer'}}>
          <Card.Title>Lorem ipsum dolor sit amet</Card.Title>
          <Card.Text>
            <div>
              <strong>Estado do livro: </strong>
              <br />
              <Badge bg="secondary">Semi-novo</Badge>
            </div>
            <div>
              <strong>Tipo de entrega: </strong>
              <br />
              <Badge bg="secondary">Entrega em mãos</Badge>{' '}
              <Badge bg="secondary">Correios</Badge>
            </div>
          </Card.Text>
        </div>
        <Button className="col-5 m-2" variant="outline-danger" onClick={handleRemoveClick}>Excluir</Button>
        <div className="col-1"></div> {/* Add this div to create space */}
        <Button className="col-5 m-2 btn-default" variant="outline-primary" onClick={handleEditClick}>Editar</Button> {/* Adjusted the column size */}
      </div>
    </div>
  );
};

export default BookCard;
