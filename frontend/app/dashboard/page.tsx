'use client'

import { LogOut } from 'lucide-react'
import { useEffect, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { UsersTable } from '@/components/dashboard/users-table'
import {
  clearSession,
  getEmpNombreServerSnapshot,
  getEmpNombreSnapshot,
  getToken,
  getTokenServerSnapshot,
  subscribeToSession,
} from '@/lib/utils/token'

export default function DashboardPage() {
  const router = useRouter()
  const token = useSyncExternalStore(subscribeToSession, getToken, getTokenServerSnapshot)
  const empNombre = useSyncExternalStore(
    subscribeToSession,
    getEmpNombreSnapshot,
    getEmpNombreServerSnapshot,
  )

  useEffect(() => {
    if (!token) {
      router.replace('/login')
    }
  }, [token, router])

  function handleLogout() {
    clearSession()
    router.replace('/login')
  }

  if (!token) return null

  return (
    <div className="relative min-h-screen overflow-hidden bg-grid px-4 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-3">
            {empNombre && (
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Hola, {empNombre}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="size-4" />
              Cerrar sesión
            </Button>
          </div>
        </header>

        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Usuarios registrados
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Listado de miembros de la comunidad que se han registrado.
          </p>
        </div>

        <UsersTable token={token} />
      </div>
    </div>
  )
}
