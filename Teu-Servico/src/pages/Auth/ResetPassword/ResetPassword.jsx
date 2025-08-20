import React from "react";
import Aside from '../../../components/AsideLogin';

export default function ResetPassword() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
              <Aside />
            
     <main
        style={{
          marginLeft: "32%",
          width: "68%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <form
          style={{
            width: "320px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <h2
            style={{
              
              fontFamily: 'Inter, sans-serif',
              fontSize: "38px", 
              color: "#002C57",
              marginBottom: "24px",
              letterSpacing: "1px"
            }}
          >
            Redefinir senha
          </h2>
<input
  type="password"
  placeholder="Senha nova"
  style={{
    height: "40px",
    border: "none",
    borderBottom: "2px solid #002C57",
    outline: "none",
    fontSize: "18px",
    color: "#002C57",
    paddingLeft: "4px",
  }}
/>

<input
  type="password"
  placeholder="Confirmar senha"
  style={{
    height: "40px",
    border: "none",
    borderBottom: "2px solid #002C57",
    outline: "none",
    fontSize: "18px",
    color: "#002C57",
    paddingLeft: "4px",
  }}
/>

          <button
            type="submit"
            style={{
              backgroundColor: "#F69027",
              color: "#002C57",
              border: "none",
              borderRadius: "3px",
              height: "40px",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "12px",
            }}
          >
            Redefinir senha
          </button>
        </form>
      </main>
    </div>
  );
}
