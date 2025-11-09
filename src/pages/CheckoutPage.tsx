import React, { useEffect, useState } from "react"
import { Container, Form, Row, Col, Button, Alert, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getCartWithProducts, clearCart } from "../services/cartService"
import { getAllUsers } from "../services/userService"

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()

  // 🔐 Proteger ruta: si no hay usuario logueado, mandar al login
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) navigate("/login")
  }, [navigate])

  // 🛒 Datos básicos
  const cart = getCartWithProducts()
  const users = getAllUsers()

  // 🧱 Des-solapar header como en AdminDashboard
  const [offsetTop, setOffsetTop] = useState(0)
  useEffect(() => {
    const header = document.querySelector("nav.navbar")
    if (header) setOffsetTop(header.clientHeight + 40)
  }, [])

  // 📝 Form
  const [form, setForm] = useState({
    nombre: users[0]?.nombre ?? "",
    email: users[0]?.email ?? "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return

    // ✅ Forzar éxito en pruebas (cambiá a tu lógica real cuando quieras)
    const pagoOk = true
    // const pagoOk = Math.random() > 0.2
    // const pagoOk = form.nombre.trim() !== "" && form.email.trim() !== ""

    if (pagoOk) {
      clearCart()
      navigate("/compra-exitosa")
    } else {
      navigate("/compra-fallida")
    }
  }

  return (
    <div
      className="checkout-page position-relative"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.4)),
          url('https://img.freepik.com/foto-gratis/plantacion-organica-vegetales-huerto_23-2148742438.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        paddingTop: `${offsetTop}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingBottom: "60px",
        overflowY: "auto",
      }}
    >
      {/* oscurecimiento en bordes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 100%)",
          zIndex: 1,
        }}
      />

      {/* contenido */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 800 }}>
        <Card
          className="shadow-lg p-4"
          style={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: 15,
          }}
        >
          <h2
            className="text-success mb-4 text-center"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 600,
              borderBottom: "2px solid #2e8b57",
              display: "inline-block",
              paddingBottom: 4,
              margin: "0 auto 20px",
            }}
          >
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
  )
}

export default CheckoutPage
