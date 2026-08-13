'use client'

import { LayoutDashboard, LogOut, Menu, Table2, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  icon: LucideIcon
  view: 'dashboard' | 'registros'
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
  { label: 'Registros', icon: Table2, view: 'registros' },
]

interface SidebarProps {
  activeView: 'dashboard' | 'registros'
  onNavigate: (view: 'dashboard' | 'registros') => void
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const [open, setOpen] = useState(false)

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.view
            return (
              <li key={item.view}>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(item.view)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-primary/15 text-sidebar-primary'
                      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="size-4.5" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          href="/login"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-4.5" />
          Cerrar sesión
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground hover:bg-sidebar-accent"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        {content}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-64 border-r border-sidebar-border bg-sidebar">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="absolute right-3 top-4 inline-flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-sidebar-accent"
            >
              <X className="size-5" />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  )
}
