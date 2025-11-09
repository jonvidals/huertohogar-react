import React, { useEffect, useState, useRef } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { FaLeaf, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import LoginBox from "../LoginBox";
import {
  isLoggedIn,
  getLoggedUser,
  logoutUser,
} from "../../services/userService";
import "../../styles/navbar.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const location = useLocation();
  const navigate = useNavigate();
  const loginRef = useRef<HTMLDivElement>(null);
  const user = getLoggedUser();

  // 🔹 Detectar modo responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Cambiar color del navbar con scroll o en páginas fijas
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    if (
      location.pathname === "/login-mobile" ||
      location.pathname === "/configuracion"
    ) {
      setScrolled(true);
    } else {
      setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // 🔹 Cerrar menú al cambiar de página
  useEffect(() => {
    if (expanded) setExpanded(false);
  }, [location.pathname]);

  // 🔹 Cerrar popup al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(event.target as Node)) {
        setShowLogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Ir a una sección del home
  const goToHomeAnchor = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.querySelector(`#${id}`);
        section?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const section = document.querySelector(`#${id}`);
      section?.scrollIntoView({ behavior: "smooth" });
    }
    setExpanded(false);
  };

  // 🔹 Cerrar sesión
  const handleLogout = () => {
    logoutUser();
    navigate("/");
    setShowLogin(false);
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className={`py-3 custom-navbar navbar-fixed ${
        scrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
    >
      <Container className="container-narrow">
        {/* ===== Marca / Logo ===== */}
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

        {/* ===== Botón Hamburguesa ===== */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="border-0 menu-toggle"
        />

        {/* ===== Links ===== */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center justify-content-end">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className="nav-item"
              onClick={() => setExpanded(false)}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/productos"
              className="nav-item"
              onClick={() => setExpanded(false)}
            >
              Productos
            </Nav.Link>
            <Nav.Link
              className="nav-item"
              onClick={() => goToHomeAnchor("nosotros")}
            >
              Nosotros
            </Nav.Link>
            <Nav.Link
              className="nav-item"
              onClick={() => goToHomeAnchor("contacto")}
            >
              Contacto
            </Nav.Link>

            {/* 🛒 Carrito solo en MOBILE (arriba en el menú) */}
            {isMobile && (
              <Nav.Link
                as={NavLink}
                to="/carrito"
                className="nav-item nav-cart-mobile"
                onClick={() => setExpanded(false)}
              >
                <FaShoppingCart className="cart-icon me-2" />
                Carrito
              </Nav.Link>
            )}

            {/* ===== Acciones (Login + Carrito Desktop) ===== */}
            <div className="nav-actions" ref={loginRef}>
              {isMobile ? (
                // 📱 Responsive
                user && isLoggedIn() ? (
                  <div className="mobile-user">
                    <span className="user-welcome">
                      <FaUserCircle color="#FFD700" size={18} />
                      <span>Bienvenido, {user.nombre}</span>
                    </span>

                    <div className="mobile-links mt-2 text-center">
                      {user?.isAdmin && (
                        <Link
                          to="/admin"
                          className="dropdown-link d-block"
                          onClick={() => setExpanded(false)}
                        >
                          Panel Admin
                        </Link>
                      )}

                      <Link
                        to="/configuracion"
                        className="dropdown-link d-block"
                        onClick={() => setExpanded(false)}
                      >
                        Configuración
                      </Link>

                      <span
                        className="logout mt-2 d-block"
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="login-button"
                    onClick={() => navigate("/login-mobile")}
                  >
                    <FaUserCircle className="login-icon" />
                    <span className="login-text">Iniciar Sesión</span>
                  </div>
                )
              ) : (
                // 💻 Escritorio
                <>
                  <div
                    className="login-button"
                    onClick={() => setShowLogin((prev) => !prev)}
                  >
                    <FaUserCircle className="login-icon" />
                    <span className="login-text">
                      {user ? user.nombre : "Iniciar Sesión"}
                    </span>
                  </div>

                  {/* 🔹 Carrito solo en DESKTOP */}
                  <Link to="/carrito" className="ms-4">
                    <FaShoppingCart className="cart-icon" />
                  </Link>
                </>
              )}

              {/* 🔹 Popover login (no logueado) */}
              {showLogin && !isLoggedIn() && !isMobile && (
                <div className="login-popover">
                  <div className="login-arrow"></div>
                  <LoginBox />
                </div>
              )}

              {/* 🔹 Dropdown usuario logueado (solo escritorio) */}
              {showLogin && isLoggedIn() && !isMobile && (
                <div className="user-dropdown animate-dropdown">
                  <div className="dropdown-arrow"></div>
                  <p className="dropdown-name">{user?.nombre || "Usuario"}</p>

                  {user?.isAdmin && (
                    <Link
                      to="/admin"
                      className="dropdown-link"
                      onClick={() => setShowLogin(false)}
                    >
                      Panel Admin
                    </Link>
                  )}

                  <Link
                    to="/configuracion"
                    className="dropdown-link"
                    onClick={() => setShowLogin(false)}
                  >
                    Configuración
                  </Link>

                  <button className="logout-btn" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
