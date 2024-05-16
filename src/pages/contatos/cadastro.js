// ContactForm.js
import React, { useState } from 'react';
import './ContactForm.css'; // Importe o arquivo CSS para estilização

const ContactForm = () => {
  // Estado para armazenar os dados do contato
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Estado para controlar a validade do email
  const [emailValid, setEmailValid] = useState(true);
  // Estado para controlar a validade do telefone
  const [phoneValid, setPhoneValid] = useState(true);

  // Função para lidar com a mudança nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Verifica se o número de telefone tem menos de 11 dígitos ou não está no formato correto
    if (name === 'phone' && (!/^\(\d{2}\) 9\d{4}-\d{4}$/.test(value) || value.length < 14)) {
      setPhoneValid(false);
    } else {
      setPhoneValid(true);
    }

    // Formata automaticamente o número do telefone para o padrão brasileiro
    if (name === 'phone' && value.length <= 15) {
      newValue = value.replace(/\D/g, '') // Remove todos os caracteres não numéricos
                     .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) 9 $2-$3'); // Formata como (xx) 9 xxxx-xxxx
    }

    setContact({
      ...contact,
      [name]: newValue
    });

    // Verifica a validade do email
    if (name === 'email') {
      const isValid = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(value);
      setEmailValid(isValid);
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados do contato para onde precisar (API, banco de dados, etc.)
    console.log(contact);
    // Limpar o formulário após o envio
    setContact({
      name: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div className="contact-form-container">
      <h2 className="titulo">Cadastrar Contato</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleInputChange}
            placeholder="Nome"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          {!emailValid && <p className="error-message">Insira um e-mail válido</p>}
        </div>
        <div className="form-group">
          <input
            type="tel" // Tipo de input para número de telefone
            name="phone"
            value={contact.phone}
            onChange={handleInputChange}
            placeholder="Telefone"
            required
          />
          {!phoneValid && <p className="error-message">O número de telefone deve ter o formato (DDD) 9XXXX-XXXX</p>}
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default ContactForm;
