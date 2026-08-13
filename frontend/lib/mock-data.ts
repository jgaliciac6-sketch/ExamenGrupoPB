import type { DashboardStat, Genre, Platform, Registration } from './types'

// MOCK: Reemplazar posteriormente por datos provenientes de la API (AWS API Gateway + Lambda).
export const MOCK_STATS: DashboardStat[] = [
  { label: 'Total de registros', value: '124', hint: 'Acumulado histórico' },
  { label: 'Registros de hoy', value: '8', hint: 'Últimas 24 horas' },
  { label: 'Plataforma favorita', value: 'PlayStation', hint: 'Más seleccionada' },
  { label: 'Género más popular', value: 'RPG', hint: 'Preferencia principal' },
]

// MOCK: Datos de ejemplo únicamente para visualizar la interfaz.
export const MOCK_REGISTRATIONS: Registration[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@email.com',
    phone: '5555-5555',
    platform: 'PlayStation',
    favoriteGenre: 'RPG',
    createdAt: '11/08/2026',
  },
  {
    id: 2,
    name: 'María López',
    email: 'maria@email.com',
    phone: '4444-4444',
    platform: 'PC',
    favoriteGenre: 'Aventura',
    createdAt: '11/08/2026',
  },
  {
    id: 3,
    name: 'Carlos Ramírez',
    email: 'carlos@email.com',
    phone: '3333-3333',
    platform: 'Xbox',
    favoriteGenre: 'Acción',
    createdAt: '10/08/2026',
  },
  {
    id: 4,
    name: 'Ana Torres',
    email: 'ana@email.com',
    phone: '2222-2222',
    platform: 'Nintendo',
    favoriteGenre: 'Aventura',
    createdAt: '10/08/2026',
  },
  {
    id: 5,
    name: 'Diego Herrera',
    email: 'diego@email.com',
    phone: '1111-1111',
    platform: 'PlayStation',
    favoriteGenre: 'Deportes',
    createdAt: '09/08/2026',
  },
  {
    id: 6,
    name: 'Sofía Castro',
    email: 'sofia@email.com',
    phone: '6666-6666',
    platform: 'PC',
    favoriteGenre: 'Estrategia',
    createdAt: '09/08/2026',
  },
  {
    id: 7,
    name: 'Luis Mendoza',
    email: 'luis@email.com',
    phone: '7777-7777',
    platform: 'Xbox',
    favoriteGenre: 'Carreras',
    createdAt: '08/08/2026',
  },
  {
    id: 8,
    name: 'Valentina Ruiz',
    email: 'valentina@email.com',
    phone: '8888-8888',
    platform: 'PlayStation',
    favoriteGenre: 'Terror',
    createdAt: '08/08/2026',
  },
]

export const PLATFORMS: Platform[] = ['PlayStation', 'Xbox', 'Nintendo', 'PC', 'Otra']

export const GENRES: Genre[] = [
  'Acción',
  'Aventura',
  'RPG',
  'Deportes',
  'Carreras',
  'Estrategia',
  'Terror',
  'Otro',
]
