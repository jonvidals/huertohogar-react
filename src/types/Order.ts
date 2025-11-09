import type { CartItem } from "./Cart"

export type Order = {
  id: string
  userId?: string
  items: CartItem[]
  total: number
  status: "pending" | "paid" | "failed"
  createdAt: string
}
