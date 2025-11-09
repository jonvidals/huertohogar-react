import ofertas from "../data/ofertas.json"
import { makeRepo } from "./storage"
import { getAllProducts } from "./productService"
import type { Product } from "../types/Product"
import type { Offer } from "../types/Offer"

const repo = makeRepo<Offer>("hh_offers", ofertas as Offer[])

export function getAllOffers(): Offer[] {
  return repo.load()
}

export function getOfferProducts(): Product[] {
  const ids = repo.load().map(o => String(o.productoId))
  return getAllProducts().filter(p => ids.includes(String(p.id)))
}

export function addOffer(o: Offer): Offer {
  const list = repo.load()
  list.push(o)
  repo.save(list)
  return o
}

export function deleteOffer(id: string): void {
  repo.save(repo.load().filter(o => String(o.id) !== String(id)))
}
