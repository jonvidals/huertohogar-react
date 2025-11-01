import { Product } from "../types/Product";
import data from "../data/productos.json";

export async function loadProducts(): Promise<Product[]> {
  return data as Product[];
}

export {};
