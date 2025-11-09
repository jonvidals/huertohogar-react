import * as React from "react";
import { Container, Table, Button, Form, Row, Col, Card } from "react-bootstrap";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../../services/productService";
import type { Product } from "../../types/Product";

const AdminProducts: React.FC = () => {
  const [productos, setProductos] = React.useState<Product[]>(getAllProducts());
  const [draft, setDraft] = React.useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    image: "",
    category: "",
    description: "",
    stock: 0,
    active: true,
  });
  const [offsetTop, setOffsetTop] = React.useState(0);

  React.useEffect(() => {
    const header = document.querySelector("nav.navbar");
    if (header) setOffsetTop(header.clientHeight + 40);
  }, []);

  function refresh() {
    setProductos(getAllProducts());
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    createProduct(draft);
    setDraft({ name: "", price: 0, image: "", category: "", description: "", stock: 0, active: true });
    refresh();
  }

  return (
    <div
      className="admin-page position-relative"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
          url('https://img.freepik.com/foto-gratis/plantacion-organica-vegetales-huerto_23-2148742438.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        paddingTop: `${offsetTop}px`,
        paddingBottom: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
          zIndex: 1,
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1100px" }}>
        <Card
          className="shadow-lg p-4"
          style={{
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: "15px",
          }}
        >
          <h2 className="text-success mb-4 text-center">📦 Administrar Productos</h2>

          <Form onSubmit={handleCreate} className="mb-3">
            <Row className="g-2">
              <Col><Form.Control placeholder="Nombre" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Col>
              <Col><Form.Control type="number" placeholder="Precio" value={draft.price} onChange={(e) => setDraft({ ...draft, price: +e.target.value })} /></Col>
              <Col><Form.Control placeholder="Categoría" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} /></Col>
              <Col xs="auto"><Button type="submit" variant="success">Agregar</Button></Col>
            </Row>
          </Form>

          <Table bordered hover responsive>
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Activo</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>${p.price.toLocaleString()}</td>
                  <td>{p.stock}</td>
                  <td>{p.active ? "Sí" : "No"}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => { updateProduct(p.id, { active: !p.active }); refresh(); }}
                    >
                      {p.active ? "Desactivar" : "Activar"}
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => { deleteProduct(p.id); refresh(); }}
                    >
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default AdminProducts;
