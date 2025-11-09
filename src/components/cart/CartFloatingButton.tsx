import * as React from "react"
import { FaShoppingCart } from "react-icons/fa"
import "../../styles/components.css"

interface Props {
  count: number
  onClick: () => void
}

const CartFloatingButton: React.FC<Props> = ({ count, onClick }) => {
  return (
    <div className="cart-floating-button" onClick={onClick}>
      <FaShoppingCart />
      {count > 0 && <div className="cart-counter">{count}</div>}
    </div>
  )
}

export default CartFloatingButton
