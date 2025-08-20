import React from 'react';

export default function Aside() {
  return (
    <aside style={{
      backgroundColor: '#006E90',
      width: '32%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
    }}>
      <img
        src="/teuServicoLogo.png"
        alt="Teu Serviço"
        style={{ maxWidth: '60%', maxHeight: '60%' }}
      />
    </aside>
  );
}
