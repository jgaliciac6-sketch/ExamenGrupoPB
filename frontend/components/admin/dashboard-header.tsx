import { User } from 'lucide-react'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2">
        <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
          <User className="size-4.5" />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-medium">Administrador</div>
          <div className="text-xs text-muted-foreground">admin@nexusgaming.com</div>
        </div>
      </div>
    </header>
  )
}
