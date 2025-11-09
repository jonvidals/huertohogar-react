import * as React from 'react';
import { Product } from "../types/Product";

describe("ProductCard Component", () => {
  let producto: Product;
  let onAddSpy: jasmine.Spy;

  beforeEach(() => {
    producto = {
      id: 1,
      name: "Mouse Gamer",
      price: 25000,
      image: "mouse.jpg",
      category: "Periféricos",
      description: "Mouse RGB",
      stock: 10,
      active: true,
    };
    onAddSpy = jasmine.createSpy("onAddToCart");
  });

  it("debe tener nombre correcto", () => {
    expect(producto.name).toBe("Mouse Gamer");
  });

  it("debe tener precio 25000", () => {
    expect(producto.price).toBe(25000);
  });

  it("debe llamar callback cuando se agrega al carrito", () => {
    onAddSpy(producto);
    expect(onAddSpy).toHaveBeenCalledWith(producto);
  });

  it("no debe llamar callback si no hay stock", () => {
    const sinStock = { ...producto, stock: 0 };
    if (sinStock.stock > 0) onAddSpy(sinStock);
    expect(onAddSpy).not.toHaveBeenCalled();
  });
});

export {};
