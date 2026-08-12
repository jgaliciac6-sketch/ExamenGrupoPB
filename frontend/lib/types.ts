export type Platform = 'PlayStation' | 'Xbox' | 'Nintendo' | 'PC' | 'Otra'

export type Genre =
  | 'Acción'
  | 'Aventura'
  | 'RPG'
  | 'Deportes'
  | 'Carreras'
  | 'Estrategia'
  | 'Terror'
  | 'Otro'

export interface Registration {
  id: number
  name: string
  email: string
  phone: string
  platform: Platform
  favoriteGenre: Genre
  createdAt: string
}

export interface RegistrationFormData {
  name: string
  email: string
  phone: string
  platform: Platform | ''
  favoriteGenre: Genre | ''
  message: string
  acceptsNews: boolean
}

export interface DashboardStat {
  label: string
  value: string
  hint: string
}

// Tipos alineados con el backend (ver backend/src/models y controllers).

export interface ActionResult<T = undefined> {
  success: boolean
  message: string
  data?: T
}

export interface LoginResult {
  token: string
  empId: number
  empNombre: string
}

export interface Usuario {
  USRId: number
  USRNombre: string
  USRCorreo: string
  USRTelefono: string
  USRGeneroFavorito: string
  USRPlataformaFavorita: string
  USRComentario?: string | null
  USREstado: boolean
}

export interface UsuarioFormData {
  USRNombre: string
  USRCorreo: string
  USRTelefono: string
  USRGeneroFavorito: string
  USRPlataformaFavorita: string
  USRComentario?: string
}
