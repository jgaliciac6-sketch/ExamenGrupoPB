import { Bell, Gift, Rocket, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
}

const BENEFITS: Benefit[] = [
  {
    icon: Bell,
    title: 'Recibe novedades',
    description: 'Noticias del mundo gamer directo a tu bandeja de entrada.',
  },
  {
    icon: Rocket,
    title: 'Nuevos lanzamientos',
    description: 'Sé el primero en conocer los títulos que están por llegar.',
  },
  {
    icon: Gift,
    title: 'Participa en promociones',
    description: 'Sorteos, descuentos y recompensas exclusivas para miembros.',
  },
  {
    icon: Target,
    title: 'Juegos a tu medida',
    description: 'Descubre juegos según tus preferencias y estilo de juego.',
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Beneficios
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Razones para unirte a Nexus Gaming
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              Registrarte es gratis y te abre la puerta a un ecosistema pensado
              para que disfrutes más de tus videojuegos favoritos.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 text-primary">
                  <benefit.icon className="size-5" />
                </span>
                <h3 className="font-display font-semibold">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
