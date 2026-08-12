'use client'

import { useState } from 'react'

import { DashboardHeader } from '@/components/admin/dashboard-header'
import { RegistrationsTable } from '@/components/admin/registrations-table'
import { Sidebar } from '@/components/admin/sidebar'
import { StatsCards } from '@/components/admin/stats-cards'

export default function AdminPage() {
  const [view, setView] = useState<'dashboard' | 'registros'>('dashboard')

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar activeView={view} onNavigate={setView} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            {view === 'dashboard' ? (
              <>
                <DashboardHeader
                  title="Dashboard"
                  subtitle="Resumen general de la comunidad Nexus Gaming."
                />
                <StatsCards />
                <RegistrationsTable />
              </>
            ) : (
              <>
                <DashboardHeader
                  title="Registros"
                  subtitle="Listado completo de miembros registrados."
                />
                <RegistrationsTable />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
