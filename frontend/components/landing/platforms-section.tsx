import { Gamepad2, Joystick, Monitor, Tv } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface PlatformItem {
  name: string
  tagline: string
  icon: LucideIcon
}

const PLATFORMS: PlatformItem[] = [
  { name: 'PlayStation', tagline: 'Consola', icon: Gamepad2 },
  { name: 'Xbox', tagline: 'Consola', icon: Joystick },
  { name: 'Nintendo', tagline: 'Híbrida', icon: Tv },
  { name: 'PC', tagline: 'Escritorio', icon: Monitor },
]

export function PlatformsSection() {
  return (
    <section className="border-b border-border/60 py-20 lg:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Multiplataforma
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Juega donde quieras
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Sin importar tu plataforma favorita, en Nexus encuentras tu espacio.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PLATFORMS.map((platform) => (
            <div
              key={platform.name}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:border-accent/40"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary/60 text-foreground transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                <platform.icon className="size-7" />
              </span>
              <div>
                <div className="font-display text-lg font-semibold">
                  {platform.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {platform.tagline}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
