import React, { useState } from 'react';
import './loginstyle.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!email) {
      validationErrors.email = 'O campo de e-mail é obrigatório';
    } else if (!/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      validationErrors.email = 'Formato de e-mail inválido';
    }

    if (!password) {
      validationErrors.password = 'O campo de senha é obrigatório';
    } else if (password.length < 6) {
      validationErrors.password = 'A senha deve ter no mínimo 6 caracteres';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          // Redirecionar para a página inicial
          window.location.href = '/index';
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <img src='/images/login.png' alt="logo login"/>
      <h5>Faça seu login no BookConnect</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'error-input' : ''}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <h6>
          <a href="/pages/cadastro.js">Esqueceu sua senha?</a>
        </h6>
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
      <p>ou</p>
      <div className="create-account-link">
        <a href="cadastro.html">Ainda não tem conta? Crie sua conta</a>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;



