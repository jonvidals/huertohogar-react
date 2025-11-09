import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import type { CartItem } from "../types/Cart";
import { getAllProducts } from "../services/productService";
import Hero from "../components/hero/Hero";
import ProductCard from "../components/product/ProductCard";
import CartSidebar from "../components/cart/CartSidebar";
import { addToCart, getCartWithProducts } from "../services/cartService";
import SearchBar from "../components/search/SearchBar";
import Loading from "../components/common/Loading";
import CartFloatingButton from "../components/cart/CartFloatingButton";
import "../styles/productos.css";

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [cart, setCart] = useState<Array<CartItem & { product?: Product }>>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProductos(data);
        setFiltered(data);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading) {
      const section = document.querySelector("#productos");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    }
  }, [loading]);

  const addToCartGlobal = (p: Product) => {
    addToCart(p.id, 1);
    setCart(getCartWithProducts());
  };

  const updateQty = (id: number, delta: number) => {
    addToCart(id, delta);
    setCart(getCartWithProducts());
  };

  const handleSearch = (term: string) => {
    const lower = term.toLowerCase();
    const base = productos.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
    setFiltered(categoria ? base.filter((p) => p.category === categoria) : base);
  };

  const handleCategoria = (cat: string | null) => {
    setCategoria(cat);
    const base = getAllProducts();
    const data = cat ? base.filter((p) => p.category === cat) : base;

    const input =
      (document.querySelector(".search-wrapper input") as HTMLInputElement | null)?.value ?? "";
    if (input.trim()) {
      const lower = input.toLowerCase();
      setFiltered(
        data.filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.category.toLowerCase().includes(lower)
        )
      );
    } else {
      setFiltered(data);
    }
  };

  if (loading) return <Loading />;

  const categoriasUnicas = Array.from(new Set(productos.map((p) => p.category)));
  const ofertas = productos.filter((p) => p.offer === true);

  return (
    <div className="productos-page">
      <Hero />

      <section id="productos" className="productos">
        <h2 className="productos-title">Nuestros Productos</h2>
        <p className="productos-subtitle">
          Disfrutá de la mejor selección de alimentos saludables.
        </p>

        <div className="search-wrapper">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="category-bar">
          <div className="category-container">
            <div className="category-scroll">
              <button
                className={`chip-btn ${!categoria ? "active" : ""}`}
                onClick={() => handleCategoria(null)}
              >
                Todas
              </button>
              {categoriasUnicas.map((cat) => (
                <button
                  key={cat}
                  className={`chip-btn ${categoria === cat ? "active" : ""}`}
                  onClick={() => handleCategoria(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="cards">
          {filtered.map((p) => (
            <div key={p.id} className="position-relative">
              {p.offer && <span className="badge-oferta">Oferta</span>}
              <ProductCard producto={p} onAddToCart={addToCartGlobal} />
            </div>
          ))}
        </div>

        {ofertas.length > 0 && (
          <section className="mt-5 ofertas-section">
            <h3 className="mb-3 text-danger">🔥 Productos en Oferta</h3>
            <div className="cards">
              {ofertas.slice(0, 4).map((p) => (
                <div key={p.id} className="position-relative">
                  <span className="badge-oferta">Oferta</span>
                  <ProductCard producto={p} onAddToCart={addToCartGlobal} />
                </div>
              ))}
            </div>
          </section>
        )}
      </section>

      {cartOpen && (
        <CartSidebar
          items={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
        />
      )}

      <CartFloatingButton
        count={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onClick={() => setCartOpen(!cartOpen)}
      />
    </div>
  );
};

export default Productos;
