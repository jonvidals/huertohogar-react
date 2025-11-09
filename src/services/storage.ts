export function makeRepo<T>(key: string, seed: T[]) {
  function load(): T[] {
    const raw = localStorage.getItem(key)
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed))
      return [...seed]
    }
    try {
      return JSON.parse(raw) as T[]
    } catch {
      return [...seed]
    }
  }

  function save(items: T[]) {
    localStorage.setItem(key, JSON.stringify(items))
  }

  return { load, save }
}
