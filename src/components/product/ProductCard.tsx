import React from "react";
import { Product } from "../../types/Product";

interface Props {
  producto: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<Props> = ({ producto, onAddToCart }) => (
  <div className="card">
    <img src={producto.imagen} alt={producto.nombre} />
    <h3>{producto.nombre}</h3>
    <p>Stock: {producto.stock}</p>
    <p>${producto.precio.toLocaleString()}</p>
    <button
      className="btn-add-cart"
      onClick={() => onAddToCart(producto)}
    >
      AÑADIR AL CARRITO
    </button>
  </div>
);

export default ProductCard;

export {};
