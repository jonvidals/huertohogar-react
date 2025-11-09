import * as React from "react";
import { Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import Hero from "../components/hero/Hero";
import "../styles/home.css";
import Loading from "../components/common/Loading";
import { useEffect, useState } from "react";
import data from "../data/productos.json";
import { useNavigate } from "react-router-dom";
import Nosotros from "./Nosotros";
import Contacto from "./Contacto";
import { isLoggedIn, getLoggedUser } from "../services/userService";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      const u = getLoggedUser();
      setUser(u);
      setShowWelcome(true);

      const timer = setTimeout(() => setShowWelcome(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) return <Loading />;

  const destacados = data.filter((p) => p.active).slice(0, 3);

  return (
    <>
      <Hero />

      {showWelcome && user && (
        <div className="welcome-container text-center mt-4">
          <Alert
            variant="success"
            className="mx-auto shadow-sm fade-in"
            style={{
              maxWidth: "600px",
              borderRadius: "12px",
              backgroundColor: "#e6f4ea",
              color: "#2e8b57",
              fontWeight: "500",
            }}
          >
            🌿 ¡Bienvenido, {user.nombre}! Nos alegra verte de nuevo en HuertoHogar.
          </Alert>
        </div>
      )}

      <Container id="productos-destacados" className="py-5">
        <h2>Productos Destacados</h2>
        <Row className="g-4">
          {destacados.map((p) => (
            <Col md={4} key={p.id}>
              <Card className="h-100 shadow-sm border-0 rounded-4">
                <Card.Img
                  variant="top"
                  src={p.image}
                  alt={p.name}
                  className="rounded-top-4"
                  style={{ height: "250px" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">{p.name}</Card.Title>
                  <Card.Text>{p.description}</Card.Text>
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={() => navigate("/productos")}
                  >
                    Ver más
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container id="beneficios" className="py-5">
        <h2>¿Por qué elegirnos?</h2>
        <Row className="g-4">
          <Col md={4}>
            <h5>100% Natural</h5>
            <p>Productos libres de químicos y cultivados responsablemente.</p>
          </Col>
          <Col md={4}>
            <h5>Entrega Rápida</h5>
            <p>Llegamos con productos frescos directo desde el campo.</p>
          </Col>
          <Col md={4}>
            <h5>Compromiso Sustentable</h5>
            <p>Apoyamos la agricultura sostenible y el comercio local.</p>
          </Col>
        </Row>
      </Container>

      <Nosotros />

      <Container id="final" className="py-5 text-center">
        <h2>Únete a nuestra comunidad</h2>
        <p>Recibe recetas, tips de cultivo y descuentos exclusivos.</p>
        <Button variant="success" size="lg">
          Suscribirme
        </Button>
      </Container>

      <Contacto />
    </>
  );
}
