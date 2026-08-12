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
