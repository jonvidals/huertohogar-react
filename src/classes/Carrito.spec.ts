import { Carrito } from "./Carrito"
import type { Product } from "../types/Product"

describe("Carrito Class", () => {
  let carrito: Carrito
  let producto1: Product
  let producto2: Product

  beforeEach(() => {
    carrito = new Carrito()

    producto1 = {
      id: 1,
      name: "Mouse Gamer",
      price: 25000,
      image: "mouse.jpg",
      category: "Periféricos",
      description: "Mouse gaming RGB",
      stock: 10,
      active: true,
    }

    producto2 = {
      id: 2,
      name: "Teclado Mecánico",
      price: 45000,
      image: "keyboard.jpg",
      category: "Periféricos",
      description: "Teclado mecánico retroiluminado",
      stock: 5,
      active: true,
    }
  })

  it("debe inicializar vacío", () => {
    expect(carrito.getItems().length).toBe(0)
  })

  it("debe agregar un producto nuevo", () => {
    carrito.agregarProducto(producto1)
    expect(carrito.getItems().length).toBe(1)
    expect(carrito.getItems()[0].quantity).toBe(1)
  })

  it("debe incrementar cantidad si el producto ya existe", () => {
    carrito.agregarProducto(producto1)
    carrito.agregarProducto(producto1)
    const item = carrito.getItems().find((i) => i.id === producto1.id)
    expect(item?.quantity).toBe(2)
  })

  it("debe calcular el total correctamente", () => {
    carrito.agregarProducto(producto1)
    carrito.agregarProducto(producto2)
    expect(carrito.calcularTotal()).toBe(70000)
  })

  it("debe eliminar un producto del carrito", () => {
    carrito.agregarProducto(producto1)
    carrito.agregarProducto(producto2)
    carrito.eliminarProducto(producto1.id)
    expect(carrito.getItems().length).toBe(1)
    expect(carrito.getItems()[0].id).toBe(2)
  })

  it("debe vaciar el carrito", () => {
    carrito.agregarProducto(producto1)
    carrito.agregarProducto(producto2)
    carrito.vaciarCarrito()
    expect(carrito.getItems().length).toBe(0)
  })
})

export {}
