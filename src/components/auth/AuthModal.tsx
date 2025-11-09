import React, { useState } from "react";

const AuthModal: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="btn btn-outline-primary" onClick={() => setShow(true)}>
        Iniciar SesiÃ³n
      </button>

      {show && (
        <div className="login-overlay" onClick={() => setShow(false)}>
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <h2>Iniciar SesiÃ³n</h2>
            <form>
              <label>Email</label>
              <input type="email" placeholder="Correo electrÃ³nico" required />
              <label>ContraseÃ±a</label>
              <input type="password" placeholder="MÃ­nimo 8 caracteres" required />
              <button type="submit" className="btn-primary">Entrar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
