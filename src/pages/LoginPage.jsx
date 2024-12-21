import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AcueductoLogo from '../imagenes/LogoAcueducto.png'

const LoginPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const UsuarioPredefinido = {
        usuario: 'admin',
        password: '123456'
    }

    const handleLogin = (event) => {
        event.preventDefault()
        if (username === UsuarioPredefinido.usuario && password === UsuarioPredefinido.password) {
            alert('Sesión iniciada con éxito')
            navigate('/app')
        } else {
            setError('Usuario o contraseña incorrectos')
        }

    }

    return (
        <div>
            <div className='logoContainer'>
                <img src={AcueductoLogo} alt='Acueducto Logo' className='logo' />
                <h1 className='textoLogo'>Agua Pura, Vida Segura</h1>
            </div>
            <div className="loginContainer">
                <h2 className="loginTitle">Iniciar Sesión</h2>
                <form className="loginForm" onSubmit={handleLogin}>
                    <div className="inputGroup">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label>Usuario</label>
                    </div>
                    <div className="inputGroup">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label>Contraseña</label>
                    </div>
                    <button type="submit" className="loginButton">Iniciar Sesión</button>
                </form>
            </div>

        </div>
    )
}
export default LoginPage