import React, { useEffect, useState } from "react";
import { Container, Alert, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/components.css";

const OrderSuccessPage: React.FC = () => {
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector("nav.navbar");
    if (header) setOffsetTop(header.clientHeight + 40);
  }, []);

  return (
    <div className="order-page order-success-page" style={{ paddingTop: `${offsetTop}px` }}>
      <div className="order-page-content">
        <Card className="order-card">
          <h2 className="order-title order-title-success">🎉 ¡Compra exitosa!</h2>

          <Container>
            <Alert variant="success" className="text-center">
              <strong>Tu pedido fue procesado correctamente.</strong>
            </Alert>
            <Link to="/productos">
              <Button variant="success" className="mt-2">
                Seguir comprando 🛍️
              </Button>
            </Link>
          </Container>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
