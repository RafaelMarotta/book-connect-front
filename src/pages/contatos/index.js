// Index.js
import React from 'react';
import ContactForm from './ContactForm'; // Importe o componente de formulário de contato

export default function Index() {
  return (
    <div>
      <h1>Minha Aplicação de Contatos</h1>
      <ContactForm /> {/* Renderize o componente de formulário de contato aqui */}
    </div>
  );
}

