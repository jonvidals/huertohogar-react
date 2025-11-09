import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";

export default function AdminDashboard() {
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector("nav.navbar");
    if (header) {
      const height = header.clientHeight;
      setOffsetTop(height + 40);
    }
  }, []);

  return (
    <div
      className="admin-page position-relative"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.65),
            rgba(0, 0, 0, 0.4)
          ),
          url('https://img.freepik.com/foto-gratis/plantacion-organica-vegetales-huerto_23-2148742438.jpg')
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 100%)",
          zIndex: 1,
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <Card
          className="shadow-lg p-4"
          style={{
            width: "100%",
            maxWidth: "700px",
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
            🛠️ Panel de Administración
          </h2>

          <Container className="text-center">
            <p className="mb-4">
              Desde aquí podés gestionar productos, usuarios y contenido del sitio.
            </p>

            <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
              <Button variant="success" href="/admin/productos">
                Gestionar Productos
              </Button>
              <Button variant="success" href="/admin/usuarios">
                Gestionar Usuarios
              </Button>
              <Button variant="outline-success" href="/">
                Volver al Inicio
              </Button>
            </div>
          </Container>
        </Card>
      </div>
    </div>
  );
}
