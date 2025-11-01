import React, { useState } from "react";

const AuthModal: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="btn btn-outline-primary" onClick={() => setShow(true)}>
        Iniciar Sesión
      </button>

      {show && (
        <div className="login-overlay" onClick={() => setShow(false)}>
          <div className="login-box" onClick={(e) => e.stopPropagation()}>
            <h2>Iniciar Sesión</h2>
            <form>
              <label>Email</label>
              <input type="email" placeholder="Correo electrónico" required />
              <label>Contraseña</label>
              <input type="password" placeholder="Mínimo 8 caracteres" required />
              <button type="submit" className="btn-primary">Entrar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
