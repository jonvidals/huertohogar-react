import * as React from 'react';
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-light border-top mt-auto py-3">
      <Container className="d-flex justify-content-between align-items-center container-narrow">
        <span className="text-muted small">© {new Date().getFullYear()} HuertoHogar</span>
        <a href="#top" className="small text-decoration-none text-success">Volver arriba ↑</a>
      </Container>
    </footer>
  );
}
