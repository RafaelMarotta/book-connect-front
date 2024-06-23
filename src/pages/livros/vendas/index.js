import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
import ReactLoading from 'react-loading';

export default function Vendas() {
  const router = useRouter();
  const { id_book, id } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [preco, setPreco] = useState('');
  const [vendaOnline, setVendaOnline] = useState(false);
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    cep: '',
    bairro: '',
    estado: '',
    cidade: '',
  });

  useEffect(() => {
    // Fetch existing book details if id_book is present
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://book-connect-backend.vercel.app/api/livros/${id_book}`);
        const body = await response.json();
        setTitulo(body.titulo);
        setPreco(body.preco_estimado.toString());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };

    if (id_book) {
      fetchBook();
    }
  }, [id_book]);

  const handlePrecoChange = (values) => {
    const { value } = values;
    setPreco(value);
  };

  const handleVendaOnlineChange = (event) => {
    const { value } = event.target;
    if (value === 'Sim') {
      setVendaOnline(true);
      setIsModalOpen(true);
    } else {
      setVendaOnline(false);
    }
  };

  const handleEnderecoChange = (event) => {
    const { name, value } = event.target;
    setEndereco((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVendaOnline(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      titulo,
      preco,
      vendaOnline,
      endereco,
    };
    console.log('Form data:', formData);

    // Perform the form submission here
  };

  return loading ? (
    <div className='d-flex justify-content-center mt-5'>
      <ReactLoading type={"spin"} color={"black"} height={168} width={75} />
    </div>
  ) : (
    <div className='container border p-3 mt-3 col-md-3 col-sm-12'>
      <h2 className='mb-3 mt-2'>{id ? 'Editar' : 'Registrar'} Venda</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="vendaForm.titulo">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o título do livro"
            value={titulo}
            required
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="vendaForm.preco">
          <Form.Label>Preço</Form.Label>
          <NumericFormat
            prefix={"R$ "}
            decimalScale={2}
            placeholder="Valor estimado de venda"
            className='form-control'
            decimalSeparator=','
            value={preco}
            required
            onValueChange={handlePrecoChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Modo de venda</Form.Label>
          <div className='d-flex flex-row'>
            <Form.Check
              type="radio"
              label="Sim"
              name="vendaOnline"
              value="Sim"
              checked={vendaOnline === true}
              onChange={handleVendaOnlineChange}
              className='m-2'
            />
            <Form.Check
              type="radio"
              label="Não"
              name="vendaOnline"
              value="Não"
              checked={vendaOnline === false}
              onChange={handleVendaOnlineChange}
              className='m-2'
            />
          </div>
        </Form.Group>
        <Button variant="primary" type="submit" className='col-12'>
          {id ? 'Salvar Alterações' : 'Registrar Venda'}
        </Button>
      </Form>

      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Endereço da Entrega</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="endereco.rua">
              <Form.Label>Nome da Rua</Form.Label>
              <Form.Control
                type="text"
                name="rua"
                value={endereco.rua}
                required
                onChange={handleEnderecoChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endereco.numero">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={endereco.numero}
                required
                onChange={handleEnderecoChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endereco.cep">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="cep"
                value={endereco.cep}
                required
                onChange={handleEnderecoChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endereco.bairro">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                name="bairro"
                value={endereco.bairro}
                required
                onChange={handleEnderecoChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endereco.estado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="estado"
                value={endereco.estado}
                required
                onChange={handleEnderecoChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endereco.cidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="cidade"
                value={endereco.cidade}
                required
                onChange={handleEnderecoChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Salvar Endereço
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
