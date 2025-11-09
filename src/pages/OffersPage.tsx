import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/product/ProductCard";

const OffersPage: React.FC = () => {
  const ofertas = getAllProducts().filter((p) => p.offer === true);

  return (
    <Container className="py-4">
      <h2 className="mb-3">Ofertas</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {ofertas.map((p) => (
          <Col key={p.id}>
            <ProductCard producto={p} onAddToCart={() => {}} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OffersPage;
