import { Product } from "../types/Product"

/**
 * Clase in-memory usada en pruebas unitarias (NO persiste en localStorage).
 * Mantiene una lista de productos con cantidad.
 */
export class Carrito {
  private items: (Product & { quantity: number })[] = []

  /** Devuelve los ítems actuales */
  getItems() {
    return this.items
  }

  /** Agrega un producto (si existe, aumenta la cantidad respetando el stock) */
  agregarProducto(producto: Product) {
    const existente = this.items.find((i) => i.id === producto.id)
    if (existente) {
      // Evitar sobrepasar el stock declarado en el producto
      if (existente.quantity < producto.stock) {
        existente.quantity++
      }
    } else {
      this.items.push({ ...producto, quantity: 1 })
    }
  }

  /** Elimina un producto por id */
  eliminarProducto(id: number) {
    this.items = this.items.filter((i) => i.id !== id)
  }

  /** Vacía el carrito */
  vaciarCarrito() {
    this.items = []
  }

  /** Calcula el total del carrito */
  calcularTotal(): number {
    return this.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  }
}

export {}
