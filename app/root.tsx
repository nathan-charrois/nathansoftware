import { Outlet } from 'react-router'

import '@mantine/core/styles.css'
import './app.css'

import { DietThemeProvider } from './routes/Diet/components/DietThemeContext'
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
    <DietThemeProvider>
      <Outlet />
    </DietThemeProvider>
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
