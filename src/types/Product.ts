export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
  active: boolean;
  offer?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export {};

export type Category = {
  id: number
  nombre: string
}