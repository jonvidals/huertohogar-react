import * as React from 'react';
import { Product } from "./types/Product";

describe("App Integration", () => {
  it("debe simular agregar producto al carrito", () => {
    const carrito: Product[] = [];
    const producto: Product = {
      id: 1,
      name: "Mouse",
      price: 25000,
      image: "mouse.jpg",
      category: "Periféricos",
      description: "Mouse gaming RGB",
      stock: 10,
      active: true,
    };

    carrito.push(producto);
    expect(carrito.length).toBe(1);
    expect(carrito[0].name).toBe("Mouse");
  });
});

export {};
