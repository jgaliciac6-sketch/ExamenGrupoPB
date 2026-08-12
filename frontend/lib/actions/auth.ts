'use server'

import { API_URL } from '@/lib/api/config'
import type { ActionResult, LoginResult } from '@/lib/types'

interface LoginPayload {
  empId: number
  empPassword: string
}

export async function loginAction({
  empId,
  empPassword,
}: LoginPayload): Promise<ActionResult<LoginResult>> {
  try {
    const res = await fetch(`${API_URL}/api/Empleado/getEmpleado`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ EMPId: empId, EMPPassword: empPassword }),
      cache: 'no-store',
    })

    const body = await res.json()

    if (!res.ok) {
      return { success: false, message: body.message ?? 'No se pudo iniciar sesión' }
    }

    return {
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        token: body.token,
        empId: body.EMPId,
        empNombre: body.EMPNombre,
      },
    }
  } catch {
    return { success: false, message: 'Error de conexión con el servidor' }
  }
}
