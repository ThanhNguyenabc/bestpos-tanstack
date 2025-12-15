import { createFileRoute, Outlet } from '@tanstack/react-router'

// This is a layout route that wraps all routes
// It doesn't add anything to the URL, just provides context
export const Route = createFileRoute('/_lang')({
  component: LanguageLayout,
})

function LanguageLayout() {
  // Just render children, language sync happens in root
  return <Outlet />
}
