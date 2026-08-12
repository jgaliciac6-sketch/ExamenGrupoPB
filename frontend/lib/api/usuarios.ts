import { API_URL } from '@/lib/api/config'
import type { Usuario } from '@/lib/types'

// GET de usuarios: no vive en lib/actions porque los Server Actions son para mutaciones (POST),
// no para lecturas de datos.
interface GetUsuariosResult {
  success: boolean
  usuarios: Usuario[]
  message?: string
}

export async function getUsuarios(token: string): Promise<GetUsuariosResult> {
  try {
    const res = await fetch(`${API_URL}/api/Usuario/getUsuarios`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })

    const body = await res.json()

    if (!res.ok) {
      return {
        success: false,
        usuarios: [],
        message: body.message ?? 'No se pudieron obtener los usuarios',
      }
    }

    return { success: true, usuarios: body.usuarios ?? [] }
  } catch {
    return { success: false, usuarios: [], message: 'Error de conexión con el servidor' }
  }
}
