'use client'

import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction } from '@/lib/actions/auth'
import { saveSession } from '@/lib/utils/token'

export function LoginForm() {
  const router = useRouter()
  const [empId, setEmpId] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const result = await loginAction({
      empId: Number(empId),
      empPassword: password,
    })

    if (!result.success || !result.data) {
      setError(result.message)
      setLoading(false)
      return
    }

    saveSession(result.data.token, {
      empId: result.data.empId,
      empNombre: result.data.empNombre,
    })

    router.push('/dashboard')
  }

  return (
    <Card className="border-border/80 shadow-2xl shadow-primary/5">
      <CardHeader className="items-center text-center">
        <CardTitle className="font-display text-2xl">Bienvenido nuevamente</CardTitle>
        <CardDescription>Accede al panel administrativo.</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 size-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="empId">ID de empleado</Label>
            <Input
              id="empId"
              name="empId"
              type="number"
              inputMode="numeric"
              autoComplete="username"
              placeholder="1234"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <Checkbox
              name="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={loading}
            />
            <span>Recordarme</span>
          </label>

          <Button type="submit" className="h-11 w-full text-base" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Ingresando...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </Button>
        </form>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver al inicio
        </Link>
      </CardContent>
    </Card>
  )
}
