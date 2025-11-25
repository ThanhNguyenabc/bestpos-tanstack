# Design Document

## Overview

This design document outlines the architecture and implementation strategy for migrating a Next.js-based POS comparison website to TanStack Router with shadcn/ui. The migration will preserve all existing functionality while modernizing the tech stack and improving type safety, performance, and developer experience.

The legacy application is a marketing website with approximately 40+ pages including home, product listings, blog posts, pricing calculators, and various business-type landing pages. It uses Next.js Pages Router, Ant Design, HeroUI, SCSS modules, and next-i18next for internationalization.

## Architecture

### High-Level Architecture

The target application will follow a modern React architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    TanStack Router                       │
│  (File-based routing with type-safe navigation)         │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼────────┐ ┌─────▼──────┐ ┌───────▼────────┐
│  Route Loaders │ │   Layouts  │ │  Error Bounds  │
│  (Data Fetch)  │ │            │ │                │
└───────┬────────┘ └─────┬──────┘ └───────┬────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
┌───────▼────────┐              ┌──────────▼─────────┐
│  TanStack Query│              │   Zustand Stores   │
│  (Data Cache)  │              │   (Global State)   │
└───────┬────────┘              └──────────┬─────────┘
        │                                   │
        └─────────────────┬─────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
┌───────▼────────┐              ┌──────────▼─────────┐
│   Components   │              │    Services        │
│  (shadcn/ui)   │              │  (API, i18n, etc)  │
└────────────────┘              └────────────────────┘
```

### Directory Structure

```
src/
├── routes/                    # TanStack Router routes
│   ├── __root.tsx            # Root layout with Header/Footer
│   ├── index.tsx             # Home page
│   ├── pos-systems/
│   │   ├── index.tsx         # POS systems listing
│   │   └── $slug.tsx         # Dynamic POS system detail
│   ├── blogs/
│   │   ├── index.tsx         # Blog listing
│   │   └── $blogId.tsx       # Blog detail
│   ├── get-pricing/
│   │   └── index.tsx         # Pricing calculator
│   └── ...                   # Other routes
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── templates/            # Page-level templates
│   ├── organisms/            # Complex composed components
│   └── atoms/                # Basic building blocks
├── lib/
│   ├── api/                  # API client functions
│   ├── i18n/                 # Internationalization setup
│   └── utils/                # Utility functions
├── hooks/                    # Custom React hooks
├── stores/                   # Zustand state stores
├── models/                   # TypeScript types/interfaces
└── styles/                   # Global styles and Tailwind config
```

## Components and Interfaces

### Route Structure

Each route file will follow this pattern:

```typescript
// src/routes/example.tsx
import { createFileRoute } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

// Define query options for data fetching
export const exampleQueryOptions = () =>
  queryOptions({
    queryKey: ['example'],
    queryFn: async () => {
      // Fetch data
      return data
    },
  })

// Route definition with loader
export const Route = createFileRoute('/example')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(exampleQueryOptions())
  },
  component: ExamplePage,
})

// Page component
function ExamplePage() {
  const data = useSuspenseQuery(exampleQueryOptions())
  return <div>{/* Render page */}</div>
}
```

### Component Migration Mapping

| Legacy (Ant Design/HeroUI) | Target (shadcn/ui)   | Notes               |
| -------------------------- | -------------------- | ------------------- |
| `<Form>`                   | `<Form>` from shadcn | Use react-hook-form |
| `<Input>`                  | `<Input>`            | Direct replacement  |
| `<Button>`                 | `<Button>`           | Direct replacement  |
| `<Modal>`                  | `<Dialog>`           | Different API       |
| `<Drawer>`                 | `<Sheet>`            | Different API       |
| `<Select>`                 | `<Select>`           | Direct replacement  |
| `<Table>`                  | `<Table>`            | Direct replacement  |
| `<Card>`                   | `<Card>`             | Direct replacement  |
| `<Row>/<Col>`              | Tailwind Grid/Flex   | Use utility classes |
| HeroUI components          | Custom or shadcn     | Case-by-case basis  |

### Layout Component

```typescript
// src/routes/__root.tsx
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

### Internationalization Integration

```typescript
// src/lib/i18n/config.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require('@/locales/en/common.json'),
    },
    es: {
      translation: require('@/locales/es/common.json'),
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
```

### Data Fetching Service

```typescript
// src/lib/api/client.ts
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// src/lib/api/products.ts
export async function fetchProductList(params: {
  limit?: number
  type?: string
}) {
  const response = await apiClient.get('/products', { params })
  return response.data
}
```

## Data Models

The existing TypeScript models will be preserved and migrated as-is:

```typescript
// src/models/product.model.ts
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  features: string[]
  pricing: PricingInfo
  rating: number
  // ... other fields
}

export interface PricingInfo {
  monthly: number
  annual: number
  setup: number
}
```

All existing models from the legacy application will be copied to maintain type safety.

## Error Handling

### Error Boundaries

```typescript
// src/components/ErrorBoundary.tsx
import { useRouteError } from '@tanstack/react-router'

export function ErrorBoundary() {
  const error = useRouteError()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p className="mt-4">Something went wrong</p>
        <pre className="mt-4 text-sm">{error.message}</pre>
      </div>
    </div>
  )
}
```

### API Error Handling

```typescript
// src/lib/api/errorHandler.ts
export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message
    toast.error(message)
    return message
  }
  toast.error('An unexpected error occurred')
  return 'Unknown error'
}
```

## Testing Strategy

### Unit Testing

Unit tests will cover:

- Individual component rendering and behavior
- Utility functions and helpers
- API client functions
- State management stores
- Form validation logic

Testing framework: Vitest with React Testing Library

Example:

```typescript
// src/components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

### Property-Based Testing

Property-based testing will be implemented using fast-check library to verify universal properties across the application. Each property-based test will run a minimum of 100 iterations.

Property-based tests will be tagged with comments explicitly referencing the correctness property from this design document using the format: `**Feature: nextjs-to-tanstack-migration, Property {number}: {property_text}**`

Each correctness property will be implemented by a single property-based test.

## Migration Strategy

### Phase 1: Foundation Setup

- Set up TanStack Router project structure
- Configure Vite, TypeScript, ESLint, Prettier
- Install and configure shadcn/ui
- Set up Tailwind CSS with existing configuration
- Configure path aliases

### Phase 2: Core Infrastructure

- Migrate layout components (Header, Footer)
- Set up i18n with react-i18next
- Configure TanStack Query
- Migrate Zustand stores
- Set up API client

### Phase 3: Component Library Migration

- Migrate shadcn/ui base components
- Create custom components for HeroUI replacements
- Migrate atomic components
- Migrate organism components
- Migrate template components

### Phase 4: Route Migration (Incremental)

- Migrate home page
- Migrate static pages (about, contact, etc.)
- Migrate dynamic routes (products, blogs)
- Migrate form pages (pricing calculator, contact forms)
- Migrate API routes to backend services

### Phase 5: Testing and Validation

- Write unit tests for critical components
- Write property-based tests for core functionality
- Perform visual regression testing
- Test all user flows
- Performance testing and optimization

### Phase 6: Polish and Deployment

- Fix any remaining issues
- Optimize bundle size
- Set up CI/CD pipeline
- Deploy to staging
- Final QA and production deployment

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Route completeness

_For any_ route path that exists in the legacy Next.js pages directory, there should exist a corresponding route file in the TanStack Router routes directory with equivalent functionality.

**Validates: Requirements 1.1, 2.1**

### Property 2: Dynamic route parameter extraction

_For any_ dynamic route with parameters (e.g., /pos-systems/[slug]), accessing the route should correctly extract and provide the parameter values to the component.

**Validates: Requirements 2.2**

### Property 3: Navigation link functionality

_For any_ Link component in the application, clicking it should navigate to the correct route without page reload and update the browser URL.

**Validates: Requirements 2.5**

### Property 4: Form validation consistency

_For any_ form with validation rules, submitting invalid data should prevent submission and display appropriate error messages, while valid data should be accepted.

**Validates: Requirements 3.1, 4.2**

### Property 5: Interactive component behavior

_For any_ interactive component (modal, drawer, dropdown), triggering the open action should display the component, and triggering the close action should hide it.

**Validates: Requirements 3.3**

### Property 6: Data display rendering

_For any_ data collection passed to a display component (table, list, card grid), all items in the collection should be rendered in the output.

**Validates: Requirements 3.4**

### Property 7: API integration preservation

_For any_ API function that existed in the legacy application, calling it in the migrated application should return data in the same format and structure.

**Validates: Requirements 4.3**

### Property 8: Analytics event tracking

_For any_ user action that should trigger an analytics event, performing that action should result in the tracking function being called with the correct event parameters.

**Validates: Requirements 4.5**

### Property 9: Translation key preservation

_For any_ translation key that exists in the legacy translation files, the same key should exist in the migrated translation files with equivalent translations for all supported languages.

**Validates: Requirements 5.2**

### Property 10: Language switching

_For any_ supported language, switching to that language should update all translated text on the page to display in the selected language.

**Validates: Requirements 5.1, 5.3, 5.4**

### Property 11: Data loader functionality

_For any_ route with a loader function, navigating to that route should execute the loader and provide the loaded data to the component before rendering.

**Validates: Requirements 6.1, 6.2**

### Property 12: Loading state indication

_For any_ data fetching operation, while the operation is in progress, a loading indicator should be visible to the user.

**Validates: Requirements 6.3**

### Property 13: Error boundary activation

_For any_ component that throws an error during rendering, the error should be caught by an error boundary and display an error UI instead of crashing the application.

**Validates: Requirements 6.4**

### Property 14: Store action state updates

_For any_ Zustand store action that modifies state, calling the action should update the store state and trigger re-renders in components using that state.

**Validates: Requirements 8.1, 8.2**

### Property 15: State persistence

_For any_ store configured with persistence, updating the state should save it to storage, and reloading the application should restore the saved state.

**Validates: Requirements 8.4**

### Property 16: State side effects

_For any_ state change that should trigger a side effect (e.g., API call, navigation), the state change should execute the expected side effect.

**Validates: Requirements 8.5**
