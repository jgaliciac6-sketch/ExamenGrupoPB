'use client'

import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { GENRES, PLATFORMS } from '@/lib/mock-data'
import type { RegistrationFormData } from '@/lib/types'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const INITIAL_DATA: RegistrationFormData = {
  name: '',
  email: '',
  phone: '',
  platform: '',
  favoriteGenre: '',
  message: '',
  acceptsNews: false,
}

export function RegistrationForm() {
  const [data, setData] = useState<RegistrationFormData>(INITIAL_DATA)
  // El estado permanece en 'idle': aún no se conecta ninguna API.
  const [status] = useState<FormStatus>('idle')

  function update<K extends keyof RegistrationFormData>(
    key: K,
    value: RegistrationFormData[K],
  ) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: Conectar aquí con la API (AWS API Gateway + Lambda).
    // Este botón todavía NO realiza ninguna llamada de red.
    // Ejemplo futuro:
    // setStatus('loading')
    // const res = await fetch(API_URL, { method: 'POST', body: JSON.stringify(data) })
    // setStatus(res.ok ? 'success' : 'error')
  }

  const isLoading = status === 'loading'

  return (
    <section id="registro" className="scroll-mt-16 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <Badge variant="accent" className="mb-4">
            Registro gratuito
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Únete a Nexus Gaming
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Completa el formulario y forma parte de la comunidad. Te contaremos
            todo lo que necesitas saber.
          </p>
        </div>

        <Card className="mt-10">
          <CardContent className="py-8">
            {/* Estados futuros (Loading / Success / Error) preparados para la integración */}
            {status === 'success' && (
              <div
                role="status"
                className="mb-6 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-accent"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                <p>¡Registro completado! Pronto recibirás noticias de Nexus.</p>
              </div>
            )}
            {status === 'error' && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
              >
                <AlertCircle className="mt-0.5 size-5 shrink-0" />
                <p>Ocurrió un error al enviar el registro. Intenta nuevamente.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    value={data.name}
                    onChange={(e) => update('name', e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@email.com"
                    value={data.email}
                    onChange={(e) => update('email', e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="5555-5555"
                    value={data.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="platform">Plataforma favorita</Label>
                  <Select
                    id="platform"
                    name="platform"
                    value={data.platform}
                    onChange={(e) =>
                      update('platform', e.target.value as RegistrationFormData['platform'])
                    }
                    disabled={isLoading}
                    required
                  >
                    <option value="" disabled>
                      Selecciona una plataforma
                    </option>
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="favoriteGenre">Género favorito</Label>
                <Select
                  id="favoriteGenre"
                  name="favoriteGenre"
                  value={data.favoriteGenre}
                  onChange={(e) =>
                    update(
                      'favoriteGenre',
                      e.target.value as RegistrationFormData['favoriteGenre'],
                    )
                  }
                  disabled={isLoading}
                  required
                >
                  <option value="" disabled>
                    Selecciona un género
                  </option>
                  {GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Mensaje o comentario</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Cuéntanos qué juegos te gustan..."
                  value={data.message}
                  onChange={(e) => update('message', e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <Checkbox
                  className="mt-0.5"
                  name="acceptsNews"
                  checked={data.acceptsNews}
                  onChange={(e) => update('acceptsNews', e.target.checked)}
                  disabled={isLoading}
                />
                <span>Acepto recibir novedades y promociones.</span>
              </label>

              <Button type="submit" className="h-12 w-full text-base" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Registrarme'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
