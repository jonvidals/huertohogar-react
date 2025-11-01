export interface Product {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  descripcion?: string;
  imagen?: string;
  activo: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
