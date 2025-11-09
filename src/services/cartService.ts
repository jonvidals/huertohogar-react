import { makeRepo } from "./storage"
import type { Cart, CartItem } from "../types/Cart"
import type { Product } from "../types/Product"
import { getAllProducts } from "./productService"
import initialCart from "../data/carrito.json"

/**
 * Repositorio simple basado en localStorage para persistir el carrito.
 * Clave: "hh_cart"
 */
const repo = makeRepo<Cart>("hh_cart", initialCart as Cart[])

/**
 * Obtiene el carrito existente o crea uno vacío si no hay.
 */
function getOrCreateCart(): Cart {
  const list = repo.load()
  if (list.length > 0) return list[0]
  const created: Cart = {
    id: Date.now(),
    items: [],
    updatedAt: new Date().toISOString(),
  }
  repo.save([created])
  return created
}

/**
 * Devuelve el carrito actual.
 */
export function getCart(): Cart {
  return getOrCreateCart()
}

/**
 * Agrega una cantidad (delta) de un producto al carrito.
 * - Si delta es positivo, incrementa.
 * - Si delta es negativo, decrementa.
 * - Si la cantidad resultante es 0 o menor, elimina el item.
 * - Crea el item si no existe.
 */
export function addToCart(productId: number, delta: number = 1): void {
  const list = repo.load()
  const cart = getOrCreateCart()
  const idxCart = list.findIndex((c) => c.id === cart.id)

  // Buscar item existente en el carrito
  const idxItem = cart.items.findIndex((l: CartItem) => l.productId === productId)

  if (idxItem >= 0) {
    // Actualizar cantidad existente
    const nextQty = cart.items[idxItem].quantity + delta
    if (nextQty <= 0) {
      // Si queda en 0 o menos, se elimina el item
      cart.items.splice(idxItem, 1)
    } else {
      cart.items[idxItem].quantity = nextQty
    }
  } else if (delta > 0) {
    // Si no existe y el delta es positivo, se crea el item
    cart.items.push({ productId, quantity: delta })
  }
  // Guardar cambios
  cart.updatedAt = new Date().toISOString()
  list[idxCart] = cart
  repo.save(list)
}

/**
 * Elimina completamente un producto del carrito.
 */
export function removeFromCart(productId: number): void {
  const list = repo.load()
  const cart = getOrCreateCart()
  const idxCart = list.findIndex((c) => c.id === cart.id)

  cart.items = cart.items.filter((l: CartItem) => l.productId !== productId)
  cart.updatedAt = new Date().toISOString()
  list[idxCart] = cart
  repo.save(list)
}

/**
 * Vacía el carrito por completo.
 */
export function clearCart(): void {
  const list = repo.load()
  const cart = getOrCreateCart()
  const idxCart = list.findIndex((c) => c.id === cart.id)

  cart.items = []
  cart.updatedAt = new Date().toISOString()
  list[idxCart] = cart
  repo.save(list)
}

/**
 * Devuelve los items del carrito enriquecidos con el objeto Product.
 */
export function getCartWithProducts(): Array<CartItem & { product?: Product }> {
  const products = getAllProducts()
  return getOrCreateCart().items.map((l: CartItem) => ({
    ...l,
    product: products.find((p: Product) => p.id === l.productId),
  }))
}
