export type User = {
  id: string | number
  nombre: string
  email: string
  password: string      
  address?: string
  city?: string
  isAdmin?: boolean
}
