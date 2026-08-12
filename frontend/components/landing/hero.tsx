'use client'

import { Gamepad2, Sparkles, Users, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-border/60 bg-grid"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-accent/15 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8 lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <Badge variant="outline" className="gap-1.5 py-1 pl-1.5">
            <span className="flex size-4 items-center justify-center rounded-full bg-primary/20">
              <Sparkles className="size-2.5 text-primary" />
            </span>
            Nueva temporada disponible
          </Badge>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Tu próxima aventura <span className="text-gradient">comienza aquí</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
            Únete a una comunidad creada para quienes viven los videojuegos.
            Descubre lanzamientos, beneficios exclusivos y una red de jugadores
            como tú.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="h-12 px-6 text-base" onClick={() => scrollTo('registro')}>
              <Zap className="size-4" />
              Unirme ahora
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 text-base"
              onClick={() => scrollTo('comunidad')}
            >
              Conocer más
            </Button>
          </div>

          <dl className="mt-4 flex items-center gap-8">
            <div>
              <dt className="text-sm text-muted-foreground">Jugadores</dt>
              <dd className="font-display text-2xl font-bold">50K+</dd>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <dt className="text-sm text-muted-foreground">Juegos</dt>
              <dd className="font-display text-2xl font-bold">1.2K</dd>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <dt className="text-sm text-muted-foreground">Plataformas</dt>
              <dd className="font-display text-2xl font-bold">4</dd>
            </div>
          </dl>
        </div>

        {/* Visual: stacked gaming cards */}
        <div className="relative hidden lg:block" aria-hidden="true">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 rounded-3xl border border-border/70 bg-gradient-to-br from-card to-secondary/30 p-6 shadow-2xl shadow-primary/10">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
                    <Gamepad2 className="size-6 text-primary-foreground" />
                  </div>
                  <Badge>En vivo</Badge>
                </div>

                <div className="space-y-3">
                  <div className="h-2.5 w-3/4 rounded-full bg-secondary" />
                  <div className="h-2.5 w-1/2 rounded-full bg-secondary" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border/70 bg-secondary/40 p-4">
                    <Users className="mb-2 size-5 text-primary" />
                    <div className="h-2 w-2/3 rounded-full bg-secondary" />
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-secondary/40 p-4">
                    <Zap className="mb-2 size-5 text-accent" />
                    <div className="h-2 w-2/3 rounded-full bg-secondary" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-44 rounded-2xl border border-border/70 bg-card/90 p-4 shadow-xl backdrop-blur">
              <div className="mb-2 flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent" />
                <span className="text-xs font-medium text-muted-foreground">
                  Nuevo lanzamiento
                </span>
              </div>
              <div className="font-display text-sm font-semibold">
                Nexus Chronicles
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
