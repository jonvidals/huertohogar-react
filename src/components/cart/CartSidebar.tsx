import * as React from "react"
import { useNavigate } from "react-router-dom"
import type { CartItem } from "../../types/Cart"
import type { Product } from "../../types/Product"
import { clearCart, getCartWithProducts } from "../../services/cartService"
import "../../styles/components.css"

interface Props {
  items: Array<CartItem & { product?: Product }>
  onClose: () => void
  onUpdateQty: (id: number, delta: number) => void
}

const CartSidebar: React.FC<Props> = ({ items, onClose, onUpdateQty }) => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = React.useState(items)

  React.useEffect(() => {
    setCartItems(items)
  }, [items])

  const total = cartItems.reduce(
    (acc, item) => acc + (item.product ? item.product.price * item.quantity : 0),
    0
  )

  const handleGoToCheckout = () => {
    onClose()
    navigate("/carrito")
  }

  const handleClearCart = () => {
    clearCart()
    setCartItems(getCartWithProducts())
  }

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>

      <div className="cart-sidebar">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2 className="cart-title">Tu Carrito</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">El carrito está vacío</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.product?.id ?? item.productId}
                className="cart-item"
              >
                <div className="cart-item-info">
                  <h5>{item.product?.name}</h5>
                  <small>
                    ${(item.product?.price ?? 0).toLocaleString("es-CL")}
                  </small>
                </div>

                <div className="cart-item-controls">
                  <button
                    onClick={() => onUpdateQty(item.product?.id ?? 0, -1)}
                    disabled={item.quantity === 1}
                    className="qty-button minus"
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQty(item.product?.id ?? 0, 1)}
                    className="qty-button plus"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              Total: ${total.toLocaleString("es-CL")}
            </div>

            <div className="cart-footer">
              <button className="checkout-button" onClick={handleGoToCheckout}>
                Ir al pago 💳
              </button>

              <button className="clearcart-button" onClick={handleClearCart}>
                Vaciar carrito 🗑️
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CartSidebar
