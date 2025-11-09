import React from "react";
import { Container } from "react-bootstrap";
import LoginBox from "../components/LoginBox";

export default function LoginPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <LoginBox />
    </Container>
  );
}
