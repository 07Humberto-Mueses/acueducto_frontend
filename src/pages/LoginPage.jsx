import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AcueductoLogo from '../imagenes/LogoAcueducto.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('1'); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('email', username);
      formData.append('password', password);
      const response = await fetch('http://localhost:9090/verify_role', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const realRole = data.rol;

        if (realRole !== rol) {
          alert("El rol seleccionado no coincide con el rol real del usuario. Por favor, selecciona el rol correcto.");
          return;
        }
        formData.append('rol', rol);
        const loginResponse = await fetch('http://localhost:9090/login', {
          method: 'POST',
          body: formData,
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (loginResponse.ok) {
          localStorage.setItem('userRole', rol);
          navigate('/app');
        } else {
          setError('Usuario o contraseña incorrectos');
        }
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
      <div className='logoContainer'>
        <img src={AcueductoLogo} alt='Acueducto Logo' className='logo' />
        <h1 className='textoLogo'>Agua Pura, Vida Segura</h1>
      </div>
      <div className="loginContainer">
        <h2 className="loginTitle">Iniciar Sesión</h2>
        <form className="loginForm" onSubmit={handleLogin}>
          <div className={`inputGroup ${error ? 'error' : ''}`}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
            <label>Usuario</label>
          </div>
          <div className={`inputGroup ${error ? 'error' : ''}`}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <label>Contraseña</label>
          </div>
          <div className="inputGroup">
            <select
              className="styledSelect"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="1">Administrador</option>
              <option value="3">Auxiliar</option>
              <option value="2">Contador</option>
            </select>
          </div>
          <button type="submit" className="loginButton">
            Iniciar Sesión
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


