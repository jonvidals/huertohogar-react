import { multiplicar, esPar } from "./matematicas";

describe("Funciones Matemáticas", () => {
  describe("multiplicar", () => {
    it("debe multiplicar dos números positivos", () => {
      expect(multiplicar(3, 4)).toBe(12);
    });

    it("debe manejar multiplicación por cero", () => {
      expect(multiplicar(5, 0)).toBe(0);
    });

    it("debe manejar números negativos", () => {
      expect(multiplicar(-3, 4)).toBe(-12);
    });
  });

  describe("esPar", () => {
    it("debe retornar true para números pares", () => {
      expect(esPar(2)).toBeTruthy();
      expect(esPar(4)).toBeTruthy();
    });

    it("debe retornar false para números impares", () => {
      expect(esPar(3)).toBeFalsy();
    });
  });
});

export {};
