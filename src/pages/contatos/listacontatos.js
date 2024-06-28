import React, { useState, useEffect } from 'react';
import mysql from 'mysql2'; // Importar a biblioteca mysql2

const connection = mysql.createConnection({
 host: 'localhost',
 user: 'username',
 password: 'password',
 database: 'database_name'
});

const App = () => {
 // Estado da lista de contatos
 const [contacts, setContacts] = useState([]);

 // Carrega os contatos do banco de dados ao iniciar o componente
 useEffect(() => {
  readContacts().then((data) => setContacts(data));
  }, []);

 // Função para ler contatos do banco de dados
 const readContacts = async () => {
  const [results] = await connection.query('SELECT * FROM contacts');
  return results;
  };

 // Função para criar um novo contato
 const createContact = async (newContact) => {
  await connection.query('INSERT INTO contacts SET ?', [newContact]);
   const updatedContacts = await readContacts();
   setContacts(updatedContacts);
  };

 // Função para atualizar um contato existente
 const updateContact = async (updatedContact) => {
   await connection.query('UPDATE contacts SET ? WHERE id = ?', [updatedContact, updatedContact.id]);
   const updatedContacts = await readContacts();
   setContacts(updatedContacts);
  };

 // Função para excluir um contato
 const deleteContact = async (contactId) => {
   await connection.query('DELETE FROM contacts WHERE id = ?', [contactId]);
   const filteredContacts = contacts.filter((contact) => contact.id !== contactId);
   setContacts(filteredContacts);
  };

 return (
   <div>
     <h2>Lista de Contatos</h2>
     {/* Exibir a lista de contatos aqui */}
     <ContactForm
      contacts={contacts}
      createContact={createContact}
      updateContact={updateContact}
      deleteContact={deleteContact}
     />
   </div>
 );
};

const ContactForm = ({ contacts, ...props }) => {
 // ... (componente ContactForm original)
};

export default App;
