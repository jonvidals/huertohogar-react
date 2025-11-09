import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCartWithProducts, clearCart } from "../services/cartService";
import { getAllUsers } from "../services/userService";
import "../styles/checkout.css";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  const cart = getCartWithProducts();
  const users = getAllUsers();

  const [offsetTop, setOffsetTop] = useState(0);
  useEffect(() => {
    const header = document.querySelector("nav.navbar");
    if (header) setOffsetTop(header.clientHeight + 40);
  }, []);

  const [form, setForm] = useState({
    nombre: users[0]?.nombre ?? "",
    email: users[0]?.email ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const pagoOk = true;

    if (pagoOk) {
      clearCart();
      navigate("/compra-exitosa");
    } else {
      navigate("/compra-fallida");
    }
  };

  return (
    <div
      className="checkout-page position-relative"
      style={{ paddingTop: `${offsetTop}px` }}
    >
      <div className="checkout-overlay" />
      <div className="checkout-content">
        <Card className="checkout-card shadow-lg p-4">
          <h2 className="checkout-title text-success mb-4 text-center">
            🧾 Confirmar tu compra
          </h2>

          <Container>
            {cart.length === 0 ? (
              <Alert variant="warning" className="my-3 text-center">
                Tu carrito está vacío.
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className="mt-4" variant="success">
                  Confirmar compra 💳
                </Button>
              </Form>
            )}
          </Container>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
