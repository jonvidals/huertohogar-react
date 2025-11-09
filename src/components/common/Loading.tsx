import * as React from 'react';
import { Spinner } from "react-bootstrap";
import "../../styles/loading.css";

export default function Loading() {
  return (
    <div className="loading-container">
      <Spinner animation="border" variant="success" role="status" />
      <span className="loading-text">Cargando...</span>
    </div>
  );
}
