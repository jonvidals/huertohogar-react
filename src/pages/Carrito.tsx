import * as React from "react"
import { useState, useEffect } from "react"
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap"
import { FaTrashAlt } from "react-icons/fa"
import Loading from "../components/common/Loading"
import "../styles/home.css"
import { useNavigate } from "react-router-dom"

// 🧩 Servicios y tipos
import {
  getCartWithProducts,
  removeFromCart,
  addToCart,
  clearCart,
} from "../services/cartService"
import type { CartItem } from "../types/Cart"
import type { Product } from "../types/Product"

export default function Carrito() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Array<CartItem & { product?: Product }>>([])
  const [offsetTop, setOffsetTop] = useState(0)

  // 🔹 Detectar la altura del header
  useEffect(() => {
    const header = document.querySelector("nav.navbar")
    if (header) setOffsetTop(header.clientHeight + 40)
  }, [])

  // 🔹 Cargar el carrito una sola vez al montar
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setItems(getCartWithProducts())
      setLoading(false)
    }, 400)
  }, [])

  // 🔹 Función para forzar refresco
  const refreshCart = () => {
    setItems(getCartWithProducts())
  }

  // 🔹 Cambiar cantidad desde el select
  const actualizarCantidad = (productId: number, nuevaCantidad: number) => {
    const actual = items.find(i => i.productId === productId)?.quantity || 0
    const delta = nuevaCantidad - actual
    if (delta !== 0) {
      addToCart(productId, delta)
      refreshCart()
    }
  }

  // 🔹 Eliminar producto
  const eliminarProducto = (productId: number) => {
    removeFromCart(productId)
    refreshCart()
  }

  // 🔹 Vaciar carrito
  const vaciarCarrito = () => {
    clearCart()
    refreshCart()
  }

  if (loading) return <Loading />

  // 🔹 Cálculos
  const subtotal = items.reduce(
    (acc, i) => acc + (i.product?.price || 0) * i.quantity,
    0
  )
  const envio = items.length > 0 ? 3000 : 0
  const total = subtotal + envio

  return (
    <section
      id="carrito"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.5)),
          url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1950&q=80')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: `${offsetTop}px`,
        paddingBottom: "60px",
        position: "relative",
        zIndex: 0,
        color: "#f1f1f1",
      }}
    >
      {/* 🔹 Filtro oscuro para contraste */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.7) 100%)",
          backdropFilter: "blur(1.5px)",
          zIndex: 1,
        }}
      ></div>

      {/* 🔹 Contenido */}
      <Container style={{ position: "relative", zIndex: 2 }}>
        <h2
          className="carrito-titulo text-center mb-4"
          style={{
            color: "#e8ffe8",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          🛒 Tu Carrito de Compras
        </h2>

        {items.length === 0 ? (
          <div className="text-center py-5">
            <p style={{ color: "#ddd", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
              Tu carrito está vacío.
            </p>
            <Button
              variant="success"
              href="/productos"
              style={{
                fontWeight: "600",
                backgroundColor: "#2E8B57",
                border: "none",
                boxShadow: "0 0 10px rgba(0,0,0,0.4)",
              }}
            >
              Ver productos
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            <Col lg={8}>
              {items.map((item) => (
                <Card
                  className="shadow-sm border-0 rounded-4 mb-3"
                  key={item.productId}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    color: "#222",
                  }}
                >
                  <Card.Body className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.product?.image || "/placeholder.png"}
                        alt={item.product?.name}
                        width={90}
                        height={90}
                        className="rounded"
                        style={{ objectFit: "cover", border: "1px solid #ccc" }}
                      />
                      <div>
                        <h5 className="mb-1 fw-bold">{item.product?.name}</h5>
                        <p className="text-success fw-semibold mb-0">
                          ${item.product?.price?.toLocaleString("es-CL")}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <Form.Select
                        size="sm"
                        value={item.quantity}
                        onChange={(e) =>
                          actualizarCantidad(item.productId, Number(e.target.value))
                        }
                        style={{ width: "70px" }}
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </Form.Select>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => eliminarProducto(item.productId)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>

            <Col lg={4}>
              <Card
                className="shadow-sm border-0 p-3 sticky-top rounded-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  color: "#222",
                }}
              >
                <h5 className="fw-bold mb-3">Resumen del Pedido</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString("es-CL")}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <span>${envio.toLocaleString("es-CL")}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>Total:</span>
                  <span>${total.toLocaleString("es-CL")}</span>
                </div>
<Button
  variant="success"
  className="w-100 fw-semibold"
  style={{
    backgroundColor: "#2E8B57",
    border: "none",
    boxShadow: "0 0 10px rgba(0,0,0,0.4)",
  }}
  onClick={() => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/checkout") // ✅ va a la página de pago si está logueado
    } else {
  navigate("/login-mobile")
}

  }}
>
  Proceder al Pago
</Button>

                <Button
                  variant="outline-secondary"
                  className="w-100 mt-2"
                  onClick={vaciarCarrito}
                >
                  Vaciar Carrito
                </Button>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  )
}
