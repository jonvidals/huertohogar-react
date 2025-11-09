export type CartItem = {
  productId: number
  quantity: number
}

export type Cart = {
  id: string | number
  items: CartItem[]
  updatedAt: string
}


