import { makeRepo } from "./storage"
import type { Cart, CartItem } from "../types/Cart"
import type { Product } from "../types/Product"
import { getAllProducts } from "./productService"
import initialCart from "../data/carrito.json"

const repo = makeRepo<Cart>("hh_cart", initialCart as Cart[])


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

export function getCart(): Cart {
  return getOrCreateCart()
}

export function addToCart(productId: number, delta: number = 1): void {
  const list = repo.load()
  const cart = getOrCreateCart()
  const idxCart = list.findIndex((c) => c.id === cart.id)

  const idxItem = cart.items.findIndex((l: CartItem) => l.productId === productId)

  if (idxItem >= 0) {
    const nextQty = cart.items[idxItem].quantity + delta
    if (nextQty <= 0) {
      cart.items.splice(idxItem, 1)
    } else {
      cart.items[idxItem].quantity = nextQty
    }
  } else if (delta > 0) {
    cart.items.push({ productId, quantity: delta })
  }
  cart.updatedAt = new Date().toISOString()
  list[idxCart] = cart
  repo.save(list)
}

export function removeFromCart(productId: number): void {
  const list = repo.load()
  const cart = getOrCreateCart()
  const idxCart = list.findIndex((c) => c.id === cart.id)

  cart.items = cart.items.filter((l: CartItem) => l.productId !== productId)
  cart.updatedAt = new Date().toISOString()
  list[idxCart] = cart
  repo.save(list)
}

export function clearCart(): void {
  const list = repo.load()
  const cart = getOrCreateCart()
  const idxCart = list.findIndex((c) => c.id === cart.id)

  cart.items = []
  cart.updatedAt = new Date().toISOString()
  list[idxCart] = cart
  repo.save(list)
}

export function getCartWithProducts(): Array<CartItem & { product?: Product }> {
  const products = getAllProducts()
  return getOrCreateCart().items.map((l: CartItem) => ({
    ...l,
    product: products.find((p: Product) => p.id === l.productId),
  }))
}
