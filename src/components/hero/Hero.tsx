import * as React from 'react';
import heroImg from "../../assets/img/verduras/hero.jpg";
import { Button } from "react-bootstrap";
import "../../styles/hero.css";
import { Link } from "react-router-dom"; // 👈 asegurate de tener esto al inicio del archivo

export default function Hero() {
  return (
    <section
      id="hero" 
      className="d-flex align-items-center justify-content-center text-center text-light"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ color: "#fff", textShadow: "1px 1px 6px rgba(0,0,0,0.7)" }}>
        <h1 className="display-4 fw-bold mb-3">
          Bienvenido a HuertoHogar
        </h1>
        <p className="lead mb-4">
          Productos frescos, naturales y orgánicos del campo a tu mesa.
        </p>

        <Link to="/productos" className="btn btn-success btn-lg">
          Ver Productos
        </Link>

      </div>
    </section>
  );
}
