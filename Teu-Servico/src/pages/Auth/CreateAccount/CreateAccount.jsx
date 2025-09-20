import React from 'react';
import Aside from '../../../components/AsideLogin';
import { Link } from 'react-router-dom';

export default function CreateAccount() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
          <Aside />

      <main style={{
        width: '68vw',
        marginLeft: '32vw',
        padding: '0 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'Inter, sans-serif',
        color: '#002C57',
      }}>
        <h2 style={{
          fontSize: '32px',
          letterSpacing: '1px',
          marginBottom: '30px',
          textAlign: 'center',
          width: '100%',
        }}>
          Criar uma Conta
        </h2>

<button
  type="button"
  style={{
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
    width: '54px',
    height: '54px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
          <img src="/google-logo.png" alt="Google" style={{ width: '38px', height: '38px' }} />
        </button>


<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '300px',
  margin: '24px 0',
}}>
  <div style={{
    flex: 1,
    height: '1px',
    backgroundColor: '#F69027',
    opacity: 0.5,
  }} />
  <span style={{
    margin: '0 12px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#002C57',
  }}>Ou</span>
  <div style={{
    flex: 1,
    height: '1px',
    backgroundColor: '#F69027',
    opacity: 0.5,
  }} />
</div>
        {/* Formulário */}
        <form style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="Nome Completo"
            style={{
              padding: '10px 0',
              marginBottom: '20px',
              border: 'none',
              borderBottom: '2px solid #002C57',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'transparent',
              color: '#002C57',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <input
            type="email"
            placeholder="Email"
            style={{
              padding: '10px 0',
              marginBottom: '20px',
              border: 'none',
              borderBottom: '2px solid #002C57',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'transparent',
              color: '#002C57',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            style={{
              padding: '10px 0',
              marginBottom: '20px',
              border: 'none',
              borderBottom: '2px solid #002C57',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: 'transparent',
              color: '#002C57',
              fontFamily: 'Inter, sans-serif',
            }}
          />

<button
type='submit'
  style={{
    backgroundColor: '#002C57',
    color: '#F69027',
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
  Criar Conta
</button>
        </form>

        {/* Link para login */}
        <p style={{
          marginTop: '20px',
          fontSize: '14px',
          color: '#002C57',
          textAlign: 'center',
        }}>
          Já tem uma conta?{' '}
          <Link style={{ color: '#F69027', textDecoration: 'none', fontWeight: '600', cursor: 'pointer' }} to='/login'>
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}
