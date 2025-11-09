import productos from "../data/productos.json"
import { makeRepo } from "./storage"
import type { Product } from "../types/Product"

const repo = makeRepo<Product>("hh_products", productos as Product[])

export function getAllProducts(): Product[] {
  return repo.load()
}

export function getProductById(id: number): Product | null {
  return repo.load().find(p => p.id === id) ?? null
}

export function getProductsByCategory(category: string): Product[] {
  return repo.load().filter(p => p.category === category)
}

export function getOffers(): Product[] {
  return repo.load().filter(p => p.offer)
}

export function createProduct(p: Omit<Product, "id">): Product {
  const list = repo.load()
  const created: Product = { id: Date.now(), ...p }
  repo.save([...list, created])
  return created
}

export function updateProduct(id: number, patch: Partial<Product>): Product {
  const list = repo.load()
  const i = list.findIndex(p => p.id === id)
  if (i < 0) throw new Error("Producto no existe")
  const updated = { ...list[i], ...patch }
  list[i] = updated
  repo.save(list)
  return updated
}

export function deleteProduct(id: number): void {
  repo.save(repo.load().filter(p => p.id !== id))
}
