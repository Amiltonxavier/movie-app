import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/query-client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export function AppProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster expand={true} position="top-right" richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
