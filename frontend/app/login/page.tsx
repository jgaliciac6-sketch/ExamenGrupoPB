import type { Metadata } from 'next'

import { LoginForm } from '@/components/auth/login-form'
import { Logo } from '@/components/logo'

export const metadata: Metadata = {
  title: 'Iniciar sesión — Nexus Gaming',
  description: 'Accede al panel administrativo de Nexus Gaming.',
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-grid px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
