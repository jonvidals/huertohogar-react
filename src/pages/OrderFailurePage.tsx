import React, { useEffect, useState } from "react";
import { Container, Alert, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/components.css";

const OrderFailurePage: React.FC = () => {
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector("nav.navbar");
    if (header) setOffsetTop(header.clientHeight + 40);
  }, []);

  return (
    <div className="order-page order-failure-page" style={{ paddingTop: `${offsetTop}px` }}>
      <div className="order-page-content">
        <Card className="order-card">
          <h2 className="order-title order-title-failure">❌ Error en el pago</h2>

          <Container>
            <Alert variant="danger" className="text-center">
              <strong>No se pudo completar la compra.</strong>
            </Alert>
            <Link to="/checkout">
              <Button variant="danger" className="mt-2">
                Intentar nuevamente
              </Button>
            </Link>
          </Container>
        </Card>
      </div>
    </div>
  );
};

export default OrderFailurePage;
