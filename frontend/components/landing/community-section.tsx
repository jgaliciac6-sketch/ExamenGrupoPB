import { Newspaper, Trophy, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: Users,
    title: 'Comunidad Gamer',
    description:
      'Conecta con miles de jugadores, forma equipos y comparte tus mejores momentos dentro y fuera del juego.',
  },
  {
    icon: Newspaper,
    title: 'Novedades y lanzamientos',
    description:
      'Mantente al día con las últimas noticias, tráilers y fechas de lanzamiento de los títulos más esperados.',
  },
  {
    icon: Trophy,
    title: 'Beneficios exclusivos',
    description:
      'Accede a promociones, sorteos y recompensas pensadas exclusivamente para los miembros de Nexus.',
  },
]

export function CommunitySection() {
  return (
    <section id="comunidad" className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Qué ofrecemos
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Todo lo que un gamer necesita en un solo lugar
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Nexus Gaming reúne comunidad, información y beneficios para llevar tu
            experiencia al siguiente nivel.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="group transition-colors hover:border-primary/40"
            >
              <CardContent className="flex flex-col gap-4 py-8">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary transition-colors group-hover:bg-primary/20">
                  <feature.icon className="size-6" />
                </span>
                <h3 className="font-display text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
