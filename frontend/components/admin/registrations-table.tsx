'use client'

import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { MOCK_REGISTRATIONS, PLATFORMS } from '@/lib/mock-data'

const PAGE_SIZE = 5

export function RegistrationsTable() {
  const [query, setQuery] = useState('')
  const [platform, setPlatform] = useState('all')
  const [page, setPage] = useState(1)

  // Filtros locales sobre los datos MOCK (sin llamadas a API).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MOCK_REGISTRATIONS.filter((r) => {
      const matchesQuery =
        q === '' ||
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
      const matchesPlatform = platform === 'all' || r.platform === platform
      return matchesQuery && matchesPlatform
    })
  }, [query, platform])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  function resetPage<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value)
      setPage(1)
    }
  }

  return (
    <Card>
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Registros</CardTitle>
          <p className="text-sm text-muted-foreground">
            {filtered.length} registro{filtered.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o correo..."
              className="pl-9"
              value={query}
              onChange={(e) => resetPage(setQuery)(e.target.value)}
              aria-label="Buscar registros"
            />
          </div>
          <div className="sm:w-52">
            <Select
              value={platform}
              onChange={(e) => resetPage(setPlatform)(e.target.value)}
              aria-label="Filtrar por plataforma"
            >
              <option value="all">Todas las plataformas</option>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-3 font-medium">Nombre</th>
                <th className="px-3 py-3 font-medium">Correo</th>
                <th className="px-3 py-3 font-medium">Teléfono</th>
                <th className="px-3 py-3 font-medium">Plataforma</th>
                <th className="px-3 py-3 font-medium">Género favorito</th>
                <th className="px-3 py-3 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-10 text-center text-muted-foreground"
                  >
                    No se encontraron registros.
                  </td>
                </tr>
              ) : (
                pageItems.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-border/50 transition-colors hover:bg-secondary/40"
                  >
                    <td className="px-3 py-3.5 font-medium">{r.name}</td>
                    <td className="px-3 py-3.5 text-muted-foreground">{r.email}</td>
                    <td className="px-3 py-3.5 text-muted-foreground">{r.phone}</td>
                    <td className="px-3 py-3.5">
                      <Badge variant="outline">{r.platform}</Badge>
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground">
                      {r.favoriteGenre}
                    </td>
                    <td className="px-3 py-3.5 text-muted-foreground">
                      {r.createdAt}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación visual (sobre datos MOCK) */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="size-4" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
            >
              Siguiente
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
