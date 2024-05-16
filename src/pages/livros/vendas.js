import React, { useState } from 'react';
import './App.css'; // Use caminho relativo

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    tipoEntrega: '',
    preco: '',
    telefone: '',
    modoVendaOnline: false,
    modoVendaPresencial: false,
    endereco: {
      rua: '',
      numero: '',
      cep: '',
      bairro: '',
      estado: '',
      cidade: '',
    },
  });

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (name.startsWith('endereco')) {
      const fieldName = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        endereco: {
          ...prevState.endereco,
          [fieldName]: value,
        },
      }));
    } else if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
      if (name === 'modoVendaOnline' && checked) {
        setIsModalOpen(true);
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleTelefoneChange = (event) => {
    const { value } = event.target;
    const numeroApenas = value.replace(/\D/g, '');
    setFormData((prevState) => ({
      ...prevState,
      telefone: numeroApenas,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData((prevState) => ({
      ...prevState,
      modoVendaOnline: false,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <div className="App">
      <main>
        <section className="venda">
          <h2>Detalhes da Venda do Livro</h2>
          <form onSubmit={handleSubmit}>
            <div className="livro-info">
              <label htmlFor="titulo">Título:</label>
              <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleInputChange} required />
            </div>
            <div className="livro-info">
              <label htmlFor="tipoEntrega">Tipo de Entrega:</label>
              <select id="tipoEntrega" name="tipoEntrega" value={formData.tipoEntrega} onChange={handleInputChange} required>
                <option value="">Selecione</option>
                <option value="presencial">Presencial</option>
                <option value="correios">Correios</option>
              </select>
            </div>
            <div className="livro-info">
              <label htmlFor="preco">Preço:</label>
              <input type="text" id="preco" name="preco" value={formData.preco} onChange={handleInputChange} required />
            </div>
            <div className="livro-info">
              <label htmlFor="telefone">Telefone do Comprador:</label>
              <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleTelefoneChange} required />
              <small>Somente números são permitidos.</small>
            </div>
            <div className="livro-info checkbox-group">
              <label>
              <label htmlFor="telefone">Modo de venda</label>
                <input type="checkbox" id="modoVendaOnline" name="modoVendaOnline" checked={formData.modoVendaOnline} onChange={handleInputChange} />
                Online
              </label>
              <label>
                <input type="checkbox" id="modoVendaPresencial" name="modoVendaPresencial" checked={formData.modoVendaPresencial} onChange={handleInputChange} />
                Presencial
              </label>
            </div>
            <button type="submit">Registrar Venda</button>
          </form>
        </section>
      </main>

      {isModalOpen && (
        <div id="modal-endereco" className={`modal ${isModalOpen ? 'show' : ''}`} onClick={(event) => event.target.className === 'modal show' && closeModal()}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Endereço do Comprador</h2>
            <form onSubmit={handleSubmit}>
              <div className="modal-info">
                <label htmlFor="rua">Nome da Rua:</label>
                <input type="text" id="rua" name="endereco.rua" value={formData.endereco.rua} onChange={handleInputChange} required />
              </div>
              <div className="modal-info">
                <label htmlFor="numero">Número:</label>
                <input type="text" id="numero" name="endereco.numero" value={formData.endereco.numero} onChange={handleInputChange} required />
              </div>
              <div className="modal-info">
                <label htmlFor="cep">CEP:</label>
                <input type="text" id="cep" name="endereco.cep" value={formData.endereco.cep} onChange={handleInputChange} required />
              </div>
              <div className="modal-info">
                <label htmlFor="bairro">Bairro:</label>
                <input type="text" id="bairro" name="endereco.bairro" value={formData.endereco.bairro} onChange={handleInputChange} required />
              </div>
              <div className="modal-info">
                <label htmlFor="estado">Estado:</label>
                <input type="text" id="estado" name="endereco.estado" value={formData.endereco.estado} onChange={handleInputChange} required />
              </div>
              <div className="modal-info">
                <label htmlFor="cidade">Cidade:</label>
                <input type="text" id="cidade" name="endereco.cidade" value={formData.endereco.cidade} onChange={handleInputChange} required />
              </div>
              <button type="submit">Salvar Endereço</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

