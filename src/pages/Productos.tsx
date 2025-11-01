import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { loadProducts } from "../services/productService";
import Hero from "../components/hero/Hero";
import ProductCard from "../components/product/ProductCard";
import CartPanel from "../components/cart/CartPanel";
import SearchBar from "../components/search/SearchBar";
import "../styles/productos.css";

interface CartItem extends Product {
  quantity: number;
}

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const data = await loadProducts();
      setProductos(data);
      setFiltered(data);
    })();
  }, []);

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing)
        return prev.map((i) =>
          i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...p, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const handleSearch = (term: string) => {
    const lower = term.toLowerCase();
    setFiltered(
      productos.filter(
        (p) =>
          p.nombre.toLowerCase().includes(lower) ||
          p.categoria.toLowerCase().includes(lower)
      )
    );
  };

  return (
    <div className="productos-page">
      <Hero />
      <main className="productos">
        <SearchBar onSearch={handleSearch} />
        <h2>Nuestros Productos</h2>
        <p>Disfruta de la mejor selección de alimentos saludables.</p>
        <div className="cards">
          {filtered.map((p) => (
            <ProductCard key={p.id} producto={p} onAddToCart={addToCart} />
          ))}
        </div>
      </main>
      {cartOpen && (
        <CartPanel
          items={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
        />
      )}
    </div>
  );
};

export default Productos;
