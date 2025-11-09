import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { getLoggedUser } from "../services/userService";
import "../styles/configuracion.css";

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
    <div className="config-page position-relative" style={{ paddingTop: `${offsetTop}px` }}>
      <div className="config-overlay"></div>

      <div className="config-container">
        <Card className="config-card shadow-lg p-4">
          <h2 className="config-title text-success mb-4 text-center">
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
