import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("debe agregar el símbolo de peso ($)", () => {
    const resultado = formatPrice(1000);
    expect(resultado.startsWith("$")).toBeTruthy();
  });

  it("debe formatear 1000 como $1.000", () => {
    expect(formatPrice(1000)).toBe("$1.000");
  });

  it("debe formatear 1000000 como $1.000.000", () => {
    expect(formatPrice(1000000)).toBe("$1.000.000");
  });

  it("debe manejar valores NaN devolviendo $0", () => {
    expect(formatPrice(NaN)).toBe("$0");
  });
});

export {};
