import * as React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Contacto() {
  const [form, setForm] = React.useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Gracias por contactarte, ${form.nombre}! Te responderemos pronto.`);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div id="contacto" className="py-5">
      <Container className="text-center">
        <h2 className="productos-title mb-3">Contáctanos</h2>
        <p className="productos-subtitle mb-4">
          Si tenés dudas, sugerencias o querés colaborar con nosotros, completá
          el formulario o escribinos a{" "}
          <strong>contacto@huertohogar.cl</strong>.
        </p>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Form
              onSubmit={handleSubmit}
              className="text-start shadow p-4 rounded bg-white"
            >
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="ejemplo@email.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="Escribí tu mensaje aquí..."
                />
              </Form.Group>

              <div className="text-center">
                <Button type="submit" className="btn btn-success px-4">
                  Enviar Mensaje
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        <div className="mt-5">
          <h5 className="text-success mb-2">📍 Dirección</h5>
          <p>Camino Rural #1234, Concepción, Chile</p>

          <h5 className="text-success mb-2">📞 Teléfono</h5>
          <p>+56 9 8765 4321</p>
        </div>
      </Container>
    </div>
  );
}
