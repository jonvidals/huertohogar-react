import { Product } from "../types/Product"


export class Carrito {
  private items: (Product & { quantity: number })[] = []

  getItems() {
    return this.items
  }

  agregarProducto(producto: Product) {
    const existente = this.items.find((i) => i.id === producto.id)
    if (existente) {
      if (existente.quantity < producto.stock) {
        existente.quantity++
      }
    } else {
      this.items.push({ ...producto, quantity: 1 })
    }
  }

  eliminarProducto(id: number) {
    this.items = this.items.filter((i) => i.id !== id)
  }

  vaciarCarrito() {
    this.items = []
  }

  calcularTotal(): number {
    return this.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  }
}

export {}
