import * as React from 'react';
import heroImg from "../../assets/img/verduras/hero.jpg";
import { Link } from "react-router-dom";
import "../../styles/hero.css";

export default function Hero() {
  return (
    <section id="hero" className="hero-section d-flex align-items-center justify-content-center text-center text-light">
      <div className="hero-content">
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
