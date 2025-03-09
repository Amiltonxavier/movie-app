import { Toaster } from 'sonner'
import App from '../App'

export function AppProvider() {
  return (
    <>
        <Toaster expand={true} position="top-right" richColors />
        <App />
    </>
  )
}
