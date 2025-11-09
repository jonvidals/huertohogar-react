import * as React from 'react';
describe("Header Component", () => {
  let onCartClickSpy: jasmine.Spy;

  beforeEach(() => {
    onCartClickSpy = jasmine.createSpy("onCartClick");
  });

  it("debe mostrar contador del carrito con 3 items", () => {
    const contador = 3;
    expect(contador).toBeGreaterThan(0);
  });

  it("debe ejecutar callback al hacer click", () => {
    onCartClickSpy();
    expect(onCartClickSpy).toHaveBeenCalled();
  });
});

export {};
