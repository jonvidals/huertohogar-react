import heroImg from "../assets/img/verduras/hero.jpg";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-light"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ color: "#fff", textShadow: "1px 1px 6px rgba(0,0,0,0.7)" }}>
          <h1 className="display-4 fw-bold mb-3">Bienvenido a HuertoHogar</h1>
          <p className="lead mb-4">
            Productos frescos, naturales y orgánicos del campo a tu mesa.
          </p>
          <Button variant="primary" size="lg" href="/productos">
            Ver Productos
          </Button>
        </div>
      </section>

      {/* ===== SECCIÓN PRODUCTOS DESTACADOS ===== */}
      <section className="py-5 bg-light text-center">
        <Container>
          <h2 className="fw-bold mb-4 text-success">Productos Destacados</h2>
          <Row className="g-4">
            {[1, 2, 3].map((n) => (
              <Col md={4} key={n}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Img
                    variant="top"
                    src={`https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=600`}
                    alt={`Producto ${n}`}
                  />
                  <Card.Body>
                    <Card.Title>Producto {n}</Card.Title>
                    <Card.Text>
                      Un producto natural, saludable y de calidad premium.
                    </Card.Text>
                    <Button variant="outline-success">Ver más</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ===== SECCIÓN BENEFICIOS ===== */}
      <section className="py-5 text-center">
        <Container>
          <h2 className="fw-bold mb-4 text-success">¿Por qué elegirnos?</h2>
          <Row className="g-4">
            <Col md={4}>
              <h5 className="fw-bold">🌱 100% Natural</h5>
              <p>
                Todos nuestros productos son libres de químicos y cultivados
                responsablemente.
              </p>
            </Col>
            <Col md={4}>
              <h5 className="fw-bold">🚚 Entrega Rápida</h5>
              <p>
                Llegamos a tu hogar con productos frescos directo desde el
                campo.
              </p>
            </Col>
            <Col md={4}>
              <h5 className="fw-bold">💚 Compromiso Sustentable</h5>
              <p>
                Fomentamos la agricultura sostenible y el comercio local
                responsable.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== SECCIÓN FINAL ===== */}
      <section className="py-5 bg-light text-center">
        <Container>
          <h2 className="fw-bold text-success mb-3">Unite a nuestra comunidad</h2>
          <p className="mb-4">
            Recibí recetas, tips de cultivo y descuentos exclusivos.
          </p>
          <Button variant="success" size="lg">
            Suscribirme
          </Button>
        </Container>
      </section>
    </>
  );
}
