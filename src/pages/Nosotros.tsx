import * as React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function Nosotros() {
  return (
    <div id="nosotros">
      <Container>
        {/* Título y subtítulo centrados */}
        <div className="text-center mb-5">
          <h2 className="productos-title">Sobre HuertoHogar</h2>
          <p className="productos-subtitle mx-auto" style={{ maxWidth: "800px" }}>
            Cultivamos bienestar, calidad y cercanía. Creemos en una vida más
            natural, en la comida fresca y en el respeto por la tierra.
          </p>
        </div>

        {/* Contenido principal: imagen + texto */}
        <Row className="align-items-center">
          <Col md={6} className="mb-4">
            <div className="nosotros-imagen-wrapper">
              <Image
                src="https://caminoaljardin.cl/wp-content/uploads/2020/10/Huerto-organico-casero.jpg"
                alt="Huerto orgánico"
                fluid
                className="nosotros-imagen"
              />
            </div>
          </Col>

          <Col md={6} className="nosotros-texto">
            <h4 className="text-success mb-3">Nuestra Misión</h4>
            <p>
              Promover una alimentación consciente y saludable, acercando a las
              familias productos frescos, naturales y libres de químicos.
            </p>

            <h4 className="text-success mb-3 mt-4">Nuestros Valores</h4>
            <ul>
              <li>Compromiso con la sustentabilidad</li>
              <li>Respeto por el medio ambiente</li>
              <li>Apoyo a productores locales</li>
              <li>Calidad y transparencia en cada entrega</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
