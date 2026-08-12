// Utilidad para persistir la sesión (token JWT del empleado) en el localStorage del navegador.
const TOKEN_KEY = 'nexus_token'
const EMPLEADO_KEY = 'nexus_empleado'

export interface StoredEmpleado {
  empId: number
  empNombre: string
}

export function saveSession(token: string, empleado: StoredEmpleado): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(TOKEN_KEY, token)
  window.localStorage.setItem(EMPLEADO_KEY, JSON.stringify(empleado))
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(TOKEN_KEY)
}

export function getStoredEmpleado(): StoredEmpleado | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(EMPLEADO_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as StoredEmpleado
  } catch {
    return null
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(EMPLEADO_KEY)
}

// Soporte para useSyncExternalStore: localStorage es un sistema externo a React,
// por lo que se lee a través de un snapshot en lugar de copiarla a useState en un efecto.
export function subscribeToSession(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function getTokenServerSnapshot(): string | null {
  return null
}

export function getEmpNombreSnapshot(): string {
  return getStoredEmpleado()?.empNombre ?? ''
}

export function getEmpNombreServerSnapshot(): string {
  return ''
}
