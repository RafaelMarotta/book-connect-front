import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CadastroEndereco from './CadastroEndereco'; 

const CadastroEndereco = () => {
  // No state variables used here

  const handleSubmit = (event) => {
    event.preventDefault();

    // Access form values directly from the DOM
    const logradouro = document.getElementById('logradouro').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const pais = document.getElementById('pais').value;
    const cep = document.getElementById('cep').value;

    // Process or send form data (logradouro, numero, etc.)
    console.log('Endereço cadastrado:', {
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      cep,
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Cadastro de Endereço</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="logradouro">
              <Form.Label>Logradouro</Form.Label>
              <Form.Control type="text" id="logradouro" /> {/* Access value with document.getElementById */}
            </Form.Group>

            <Form.Group controlId="numero">
              <Form.Label>Número</Form.Label>
              <Form.Control type="number" id="numero" />
            </Form.Group>

            <Form.Group controlId="complemento">
              <Form.Label>Complemento</Form.Label>
              <Form.Control type="text" id="complemento" />
            </Form.Group>

            <Form.Group controlId="bairro">
              <Form.Label>Bairro</Form.Label>
              <Form.Control type="text" id="bairro" />
            </Form.Group>

            <Form.Row>
              <Form.Group controlId="cidade">
                <Form.Label>Cidade</Form.Label>
                <Form.Control type="text" id="cidade" />
              </Form.Group>

              <Form.Group controlId="estado">
                <Form.Label>Estado</Form.Label>
                <Form.Control type="text" id="estado" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="pais">
                <Form.Label>País</Form.Label>
                <Form.Control type="text" id="pais" />
              </Form.Group>

              <Form.Group controlId="cep">
                <Form.Label>CEP</Form.Label>
                <Form.Control type="text" id="cep" />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CadastroEndereco;
