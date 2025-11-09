import * as React from 'react';
import type { Product } from "../../types/Product"

interface Props {
  producto: Product
  onAddToCart: (p: Product) => void
}

const ProductCard: React.FC<Props> = ({ producto, onAddToCart }) => (
  <div className="card">
    <img src={producto.image} alt={producto.name} />
    <h3>{producto.name}</h3>
    <p>Stock: {producto.stock}</p>
    <p>${producto.price.toLocaleString()}</p>
    <button className="btn-add-cart" onClick={() => onAddToCart(producto)}>
      Agregar al carrito
    </button>
  </div>
)

export default ProductCard
