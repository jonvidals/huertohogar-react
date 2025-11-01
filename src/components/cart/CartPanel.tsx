import React from "react";
import { CartItem } from "../../types/Product";

interface Props {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: number, delta: number) => void;
}

const CartPanel: React.FC<Props> = ({ items, onClose, onUpdateQty }) => {
  const total = items.reduce((acc, i) => acc + i.precio * i.quantity, 0);

  return (
    <>
      <div className="cart-overlay active" onClick={onClose}></div>
      <div className="cart-panel active">
        <button className="cart-close" onClick={onClose}>
          &times;
        </button>
        <h3>Tu Carrito</h3>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <img src={item.imagen} alt={item.nombre} className="cart-thumb" />
              <div>
                <strong>{item.nombre}</strong>
                <div>
                  <button onClick={() => onUpdateQty(item.id, -1)}>➖</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)}>➕</button>
                </div>
                <p>${(item.precio * item.quantity).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <strong>Total:</strong> ${total.toLocaleString()}
        </div>
      </div>
    </>
  );
};

export default CartPanel;