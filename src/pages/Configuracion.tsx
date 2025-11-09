import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { getLoggedUser } from "../services/userService";

export default function Configuracion() {
  const [offsetTop, setOffsetTop] = useState(0);
  const user = getLoggedUser();

  useEffect(() => {
    const header = document.querySelector("nav.navbar");
    if (header) {
      const height = header.clientHeight;
      setOffsetTop(height + 40);
    }
  }, []);

  return (
    <div
      className="config-page position-relative"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.6),   /* 🔹 capa oscura superior */
            rgba(0, 0, 0, 0.4)   /* 🔹 capa inferior más suave */
          ),
          url('https://cdn.portalfruticola.com/2018/09/d8dc8ad8-huertoorganicospf.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        paddingTop: `${offsetTop}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingBottom: "60px",
        overflowY: "scroll",
      }}
    >
      {/* 🔹 Oscurecimiento extra solo en los bordes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
          zIndex: 1,
        }}
      ></div>

      {/* 🔹 Contenido principal */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Card
          className="shadow-lg p-4"
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: "15px",
          }}
        >
          <h2
            className="text-success mb-4 text-center"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: "600",
              borderBottom: "2px solid #2e8b57",
              display: "inline-block",
              paddingBottom: "4px",
              margin: "0 auto 20px",
            }}
          >
            ⚙️ Configuración de cuenta
          </h2>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" defaultValue={user?.nombre} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" defaultValue={user?.email} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control type="text" defaultValue={user?.city || ""} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" defaultValue={user?.address || ""} />
            </Form.Group>

            <Button variant="success" className="w-100 mt-3">
              Guardar cambios
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
