import { Toast } from '@base-ui/react/toast'

// Manager global: permite disparar toasts (p. ej. toast.add({...})) desde cualquier
// componente cliente sin necesidad del hook useToastManager.
export const toastManager = Toast.createToastManager()
