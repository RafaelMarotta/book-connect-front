import React from 'react';
import { Card, Button, Badge, Row, Image } from 'react-bootstrap';

const BookCard = ({livro, handleCardClick, handleRemoveClick, handleEditClick}) => {
  const getConservacaoLabel = (conservacao) => {
    switch (conservacao) {
      case 0:
        return 'Novo';
      case 1:
        return 'Semi-novo';
      case 2:
        return 'Com marcas de uso';
      case 3:
        return 'Desgastado';
      default:
        return '';
    }
  };

  return (
    <div className='col-lg-4 col-md-5 col-sm-6 mt-5'>
      <div className='row border p-2 m-1' >
        <Image className='img-fluid col-md-5' src={`${livro.imageUrl}`} alt="Book Icon" />
        <div className='col-md-7' onClick={handleCardClick} style={{cursor: 'pointer'}}>
          <Card.Title>{livro.titulo}</Card.Title>
          <Card.Text>
            <div>
              <strong>Estado do livro: </strong>
              <br />
              <Badge bg="secondary">{getConservacaoLabel(livro.conservacao)}</Badge>
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
