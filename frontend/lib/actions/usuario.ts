"use server";

import { API_URL } from "@/lib/api/config";
import type { ActionResult, UsuarioFormData } from "@/lib/types";

// El registro de usuarios es público (visitantes que aún no se han logueado), por eso
// esta acción no requiere ni envía un token de autenticación.
export async function createUsuarioAction(
  data: UsuarioFormData,
): Promise<ActionResult<{ usrId: number }>> {
  try {
    const res = await fetch(`${API_URL}/api/Usuario/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const body = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: body.message ?? "No se pudo registrar el usuario",
      };
    }

    return {
      success: true,
      message: body.message ?? "Usuario registrado correctamente",
      data: body.data,
    };
  } catch {
    return { success: false, message: "Error de conexión con el servidor" };
  }
}
