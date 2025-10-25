import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaLeaf, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`py-3 custom-navbar ${
        scrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
    >
      <Container className="container-narrow">
        <Navbar.Brand
          as={NavLink}
          to="/"
          className={`brand d-flex align-items-center gap-2 ${
            scrolled ? "brand-scrolled" : "brand-default"
          }`}
        >
          <FaLeaf className="logo-icon" />
          <span className="brand-text">
            Huerto<span>Hogar</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {["/", "/productos", "/nosotros", "/contacto", "/carrito"].map(
              (path, index) => {
                const labels = [
                  "Inicio",
                  "Productos",
                  "Nosotros",
                  "Contacto",
                  "Carrito",
                ];
                return (
                  <Nav.Link
                    key={path}
                    as={NavLink}
                    to={path}
                    end={path === "/"}
                    className={`mx-2 nav-item ${
                      scrolled ? "link-scrolled" : "link-default"
                    }`}
                  >
                    {labels[index]}
                  </Nav.Link>
                );
              }
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
