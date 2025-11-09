import usuarios from "../data/usuarios.json";
import { makeRepo } from "./storage";
import type { User } from "../types/Users";

const repo = makeRepo<User>("hh_users", usuarios as User[]);

export function getAllUsers(): User[] {
  return repo.load();
}

export function getUserById(id: number): User | null {
  return repo.load().find(u => u.id === id) ?? null;
}

export function createUser(u: Omit<User, "id">): User {
  const list = repo.load();
  const created: User = { id: Date.now(), ...u };
  repo.save([...list, created]);
  return created;
}

export function updateUser(id: number, patch: Partial<User>): User {
  const list = repo.load();
  const i = list.findIndex(u => u.id === id);
  if (i < 0) throw new Error("Usuario no existe");
  const updated = { ...list[i], ...patch };
  list[i] = updated;
  repo.save(list);
  return updated;
}

export function deleteUser(id: number): void {
  const list = repo.load().filter(u => u.id !== id);
  repo.save(list);
}


export function loginUser(email: string, password: string): User | null {
  const users = getAllUsers();
  const found = users.find(u => u.email === email && u.password === password);
  if (found) {
    localStorage.setItem("user", JSON.stringify(found));
    return found;
  }
  return null;
}

export function logoutUser(): void {
  localStorage.removeItem("user");
}

export function getLoggedUser(): User | null {
  const stored = localStorage.getItem("user");
  return stored ? (JSON.parse(stored) as User) : null;
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}
