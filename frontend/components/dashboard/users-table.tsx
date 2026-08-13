'use client'

import { AlertCircle, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUsuarios } from '@/lib/api/usuarios'
import type { Usuario } from '@/lib/types'

interface UsersTableProps {
  token: string
  refreshKey?: number
}

export function UsersTable({ token, refreshKey }: UsersTableProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')

      const result = await getUsuarios(token)

      if (cancelled) return

      if (!result.success) {
        setError(result.message ?? 'No se pudieron obtener los usuarios')
      } else {
        setUsuarios(result.usuarios)
      }
      setLoading(false)
    }

    load()

    return () => {
      cancelled = true
    }
  }, [token, refreshKey])

  return (
    <Card>
      <CardHeader className="gap-1">
        <CardTitle>Usuarios registrados</CardTitle>
        <p className="text-sm text-muted-foreground">
          {usuarios.length} usuario{usuarios.length === 1 ? '' : 's'}
        </p>
      </CardHeader>

      <CardContent className="pb-6">
        {loading && (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Cargando usuarios...
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 size-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-3 py-3 font-medium">Nombre</th>
                  <th className="px-3 py-3 font-medium">Correo</th>
                  <th className="px-3 py-3 font-medium">Teléfono</th>
                  <th className="px-3 py-3 font-medium">Plataforma</th>
                  <th className="px-3 py-3 font-medium">Género favorito</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-10 text-center text-muted-foreground">
                      No se encontraron usuarios.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr
                      key={u.USRId}
                      className="border-b border-border/50 transition-colors hover:bg-secondary/40"
                    >
                      <td className="px-3 py-3.5 font-medium">{u.USRNombre}</td>
                      <td className="px-3 py-3.5 text-muted-foreground">{u.USRCorreo}</td>
                      <td className="px-3 py-3.5 text-muted-foreground">{u.USRTelefono}</td>
                      <td className="px-3 py-3.5">
                        <Badge variant="outline">{u.USRPlataformaFavorita}</Badge>
                      </td>
                      <td className="px-3 py-3.5 text-muted-foreground">
                        {u.USRGeneroFavorito}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
