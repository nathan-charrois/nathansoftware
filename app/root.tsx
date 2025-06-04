import { Outlet } from 'react-router'
import { MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'
import './app.css'

import { theme } from './utils/theme'
import RootErrorBoundary from '~/components/ErrorBoundary/ErrorBoundary'
import RootLayout from '~/components/Layout/Layout'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout(props: LayoutProps) {
  return (
    <RootLayout {...props} />
  )
}

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Outlet />
    </MantineProvider>
  )
}

interface ErrorBoundaryProps {
  error: Error
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <RootErrorBoundary {...props} />
  )
}
