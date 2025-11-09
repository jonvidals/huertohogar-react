import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { loginUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

const LoginBox: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginUser(email, password);

    if (user) {
      setError("");
      setSuccess(true); // ✅ muestra mensaje visual

      // Espera 1 segundo antes de redirigir
      setTimeout(() => {
        navigate("/"); // 🔹 redirige al Home
        window.location.reload(); // 🔹 actualiza header y muestra alerta en Home
      }, 1000);
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-popover p-4 bg-white rounded shadow position-relative">
      {/* 🔹 Flecha decorativa */}
      <div className="login-arrow" />

      <h5 className="text-center mb-3 text-success fw-bold">Iniciar Sesión</h5>

      {/* Mensajes */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success" className="text-center">
          🌿 Inicio de sesión exitoso
        </Alert>
      )}

      {/* Formulario */}
      {!success && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@ejemplo.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 mb-2">
            Ingresar
          </Button>
        </Form>
      )}

      {/* Enlaces de ayuda */}
      {!success && (
        <div className="text-center small mt-2">
          <button
            className="btn btn-link text-decoration-none text-success p-0 me-2"
            onClick={() => alert("Funcionalidad de registro próximamente.")}
          >
            Registrarse
          </button>
          |
          <button
            className="btn btn-link text-decoration-none text-success p-0 ms-2"
            onClick={() =>
              alert("Funcionalidad de recuperación próximamente.")
            }
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginBox;
