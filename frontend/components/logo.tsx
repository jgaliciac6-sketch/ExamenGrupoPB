import { Hexagon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
        <Hexagon className="size-5 text-primary-foreground" strokeWidth={2.5} />
      </span>
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          Nexus <span className="text-gradient">Gaming</span>
        </span>
      )}
    </span>
  )
}
