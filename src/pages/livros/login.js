import React, { useState } from 'react';
import './loginstyle.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
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
      console.log('Login successful!');
      href="/index"; //voltar a home
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
        <button type="submit" href="/pages/index" className="login-button">
          Entrar
        </button>
      </form>
      <p>ou</p>
      <div class="create-account-link">
      <a href="cadastro.html">Ainda não tem conta? Crie sua conta</a>
    </div>
    </div>
  );
}

export default Login;


