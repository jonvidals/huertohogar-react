import * as React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/product/ProductCard";

const CategoriesPage: React.FC = () => {
  const [cat, setCat] = React.useState<string | null>(null);
  const [items, setItems] = React.useState(getAllProducts());
  const categoriasUnicas = Array.from(new Set(getAllProducts().map(p => p.category)));

  React.useEffect(() => {
    const all = getAllProducts();
    setItems(cat ? all.filter(p => p.category === cat) : all);
  }, [cat]);

  return (
    <Container className="py-4 text-center">
      <h2 className="mb-3">Categorías</h2>
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        <Button variant={!cat ? "primary" : "outline-primary"} onClick={() => setCat(null)}>Todas</Button>
        {categoriasUnicas.map(c => (
          <Button key={c} variant={cat === c ? "primary" : "outline-primary"} onClick={() => setCat(c)}>
            {c}
          </Button>
        ))}
      </div>
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {items.map(p => (
          <Col key={p.id}><ProductCard producto={p} onAddToCart={() => {}} /></Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoriesPage;
