import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/loginMobile.css";
import { isLoggedIn, loginUser } from "../services/userService";

export default function LoginMobile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar si es móvil
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Si ya está logueado o entra desde PC → redirigir
  useEffect(() => {
    if (isLoggedIn()) navigate("/");
  }, [isMobile]);
  useEffect(() => {
  // Bloquea el scroll al entrar
  document.body.style.overflow = "hidden";
  document.body.style.height = "100%";

  return () => {
    // Restaura scroll al salir
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  };
}, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginUser(email, password);
      navigate("/");
    } catch {
      setError("Credenciales inválidas. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="login-bg">
      <Container className="login-container">
        <Card className="login-card shadow-card">
          <Card.Body>
            <h3 className="text-center text-success mb-4">Iniciar Sesión</h3>

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

              {error && (
                <p className="text-danger text-center small mb-3">{error}</p>
              )}

              <Button variant="success" type="submit" className="w-100">
                Ingresar
              </Button>
            </Form>

            <div className="text-center mt-3">
              <a href="#">Registrarse</a> |{" "}
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
