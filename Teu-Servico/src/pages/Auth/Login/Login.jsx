import React from 'react';
import Aside from '../../../components/AsideLogin';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Aside />

      <main
        style={{
          width: '68vw',
          padding: '0 40px',
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '32vw',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h2
         style={{
         fontFamily: 'Inter, sans-serif',
         fontSize: '38px',
         color: '#002C57',
         letterSpacing: '1px',
         lineHeight: '38px',
         marginBottom: '30px',
         textAlign: 'center',
         width: '100%',
         }}
     >
        Entre
         </h2>

        <form style={{ width: '100%', maxWidth: '300px' }}>
          <input
  type="email"
  name="email"
  placeholder="E-mail"
  style={{
    width: '100%',
    border: 'none',
    outline: 'none',
    padding: '10px 0',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    marginBottom: '24px',
    borderBottom: '2px solid #002C57',
    color: '#002C57',
    backgroundColor: 'transparent',
  }}
/>

<input
  type="password"
  name="password"
  placeholder="Senha"
  style={{
    width: '100%',
    border: 'none',
    outline: 'none',
    padding: '10px 0',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    marginBottom: '24px',
    borderBottom: '2px solid #002C57',
    color: '#002C57',
    backgroundColor: 'transparent',
  }}
/>


          <button
  type="submit"
  style={{
    backgroundColor: '#F69027',
    color: '#002C57',
    width: '100%',
    padding: '14px 0',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    border: 'none',
    marginTop: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  }}
>
  Login
</button>
        </form>

        <p
          style={{
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            marginTop: '20px',
            color: '#002C57',
            textAlign: 'center',
          }}
        >
          Não tem uma conta?{' '}
          <Link to='/create-account' style={{ color: '#F69027', textDecoration: 'none' }}>
            Criar aqui
          </Link>
        </p>
      </main>
    </div>
  );
}
