'use client'

import { Toast } from '@base-ui/react/toast'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { toastManager } from '@/lib/toast'

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
} as const

function ToastList() {
  const { toasts } = Toast.useToastManager()

  return toasts.map((toast) => {
    const Icon = ICONS[toast.type as keyof typeof ICONS] ?? Info

    return (
      <Toast.Root
        key={toast.id}
        toast={toast}
        className={cn(
          'pointer-events-auto relative flex w-full items-start gap-3 rounded-2xl border bg-card p-4 text-card-foreground shadow-2xl shadow-primary/10 transition-all duration-200',
          'data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0',
          'data-[ending-style]:translate-y-2 data-[ending-style]:opacity-0',
          'data-[type=success]:border-accent/30 data-[type=success]:bg-accent/10 data-[type=success]:text-accent',
          'data-[type=error]:border-destructive/30 data-[type=error]:bg-destructive/10 data-[type=error]:text-destructive',
        )}
      >
        <Icon className="mt-0.5 size-5 shrink-0" />
        <Toast.Content className="flex-1">
          <Toast.Title className="text-sm font-semibold" />
          <Toast.Description className="mt-0.5 text-sm opacity-90" />
        </Toast.Content>
        <Toast.Close
          aria-label="Cerrar"
          className="shrink-0 rounded-md p-1 opacity-70 transition-opacity outline-none hover:opacity-100 focus-visible:opacity-100"
        >
          <X className="size-4" />
        </Toast.Close>
      </Toast.Root>
    )
  })
}

export function Toaster() {
  return (
    <Toast.Provider toastManager={toastManager}>
      <Toast.Portal>
        <Toast.Viewport className="fixed inset-x-0 bottom-0 z-50 flex w-full flex-col gap-2 p-4 sm:right-4 sm:left-auto sm:w-full sm:max-w-sm">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  )
}
