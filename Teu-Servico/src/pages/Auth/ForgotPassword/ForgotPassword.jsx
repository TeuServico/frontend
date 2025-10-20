import React from "react";
import Aside from '../../../components/AsideLogin';

export default function ForgotPassword() {
    return (
    <div style={{ display: 'flex', height: '100vh' }}>
              <Aside />

      <main style={{
        marginLeft: '32%',
        width: '68%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ color: '#002C57', fontSize: '38px', fontStyle: 'normal', marginBottom: '50px', letterSpacing: '1px', fontFamily: 'sans-serif'}}>
  Esqueceu a senha ?
</h1>

<input
  type="email"
  placeholder="Email"
  style={{
    width: '100%',
    padding: '12px 10px',
    fontSize: '16px',
    border: 'none',
    borderBottom: '1px solid #002C57',
    outline: 'none',
    marginBottom: '50px',
  }}
/>

<button
  style={{
    width: '100%',
    padding: '12px',
    backgroundColor: '#F69027',
    color: '#002C57',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }}
>
  Enviar código
</button>

<p style={{ marginTop: '30px', fontFamily: 'sans-serif', fontSize: '14px', color: '#002C57' }}>
  Lembrou sua senha?{' '}
  <a href="/login" style={{ color: '#F69027', textDecoration: 'none' }}>
    Login
  </a>
</p>
        </div>
      </main>
    </div>
  );
}
