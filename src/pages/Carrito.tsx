import * as React from "react"
import { useState, useEffect } from "react"
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap"
import { FaTrashAlt } from "react-icons/fa"
import Loading from "../components/common/Loading"
import "../styles/carrito.css"
import { useNavigate } from "react-router-dom"

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

  useEffect(() => {
    const header = document.querySelector("nav.navbar")
    if (header) setOffsetTop(header.clientHeight + 40)
  }, [])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setItems(getCartWithProducts())
      setLoading(false)
    }, 400)
  }, [])

  const refreshCart = () => {
    setItems(getCartWithProducts())
  }

  const actualizarCantidad = (productId: number, nuevaCantidad: number) => {
    const actual = items.find(i => i.productId === productId)?.quantity || 0
    const delta = nuevaCantidad - actual
    if (delta !== 0) {
      addToCart(productId, delta)
      refreshCart()
    }
  }

  const eliminarProducto = (productId: number) => {
    removeFromCart(productId)
    refreshCart()
  }

  const vaciarCarrito = () => {
    clearCart()
    refreshCart()
  }

  if (loading) return <Loading />

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
                <Card className="cart-card mb-3" key={item.productId}>
                  <Card.Body className="cart-body">
                    <div className="cart-product-info">
                      <img
                        src={item.product?.image || "/placeholder.png"}
                        alt={item.product?.name}
                        className="cart-img"
                      />
                      <div className="cart-info">
                        <h5>{item.product?.name}</h5>
                        <p className="text-success fw-semibold">
                          ${item.product?.price?.toLocaleString("es-CL")}
                        </p>
                        <div className="cart-actions">
                          <div className="cart-qty-control">
                            <button
                              className="cart-btn"
                              onClick={() =>
                                item.quantity > 1 &&
                                actualizarCantidad(item.productId, item.quantity - 1)
                              }
                            >
                              –
                            </button>
                            <span className="cart-qty-num">{item.quantity}</span>
                            <button
                              className="cart-btn"
                              onClick={() =>
                                actualizarCantidad(item.productId, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>

                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => eliminarProducto(item.productId)}
                          >
                            <FaTrashAlt />
                          </Button>
                        </div>
                      </div>
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
                      navigate("/checkout")
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
