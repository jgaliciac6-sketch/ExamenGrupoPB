import { Gamepad2, TrendingUp, UserPlus, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { MOCK_STATS } from '@/lib/mock-data'

const ICONS: LucideIcon[] = [Users, UserPlus, Gamepad2, TrendingUp]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {MOCK_STATS.map((stat, index) => {
        const Icon = ICONS[index % ICONS.length]
        return (
          <Card key={stat.label}>
            <CardContent className="flex items-start justify-between gap-4 py-5">
              <div className="min-w-0">
                <p className="truncate text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Icon className="size-5" />
              </span>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
