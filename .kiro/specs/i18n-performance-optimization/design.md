# Design Document

## Overview

This design addresses the performance bottleneck in the BestPOS TanStack application where i18n locale loading causes slow first requests. The current implementation uses `i18next-http-backend` to fetch translation files over HTTP, introducing network latency during application initialization.

The solution replaces HTTP-based loading with build-time bundling using `i18next-resources-to-backend` combined with Vite's dynamic imports. This approach:

- Bundles the default language (English) with the main application
- Lazy-loads additional languages on-demand using code splitting
- Eliminates HTTP requests for translation files
- Enables offline functionality
- Improves Time to Interactive (TTI) by 200-500ms

## Architecture

### Current Architecture (Problematic)

```
Application Start
    ↓
i18n Init (with HttpApi backend)
    ↓
HTTP Request → /locales/en/common.json
HTTP Request → /locales/en/home.json
    ↓ (network latency)
Translations Loaded
    ↓
React Render
```

### New Architecture (Optimized)

```
Application Start
    ↓
i18n Init (with resources-to-backend)
    ↓
Import bundled EN translations (synchronous)
    ↓
React Render (immediate)
    ↓
User switches to ES (if needed)
    ↓
Dynamic import ES chunk (async, cached)
```

### Component Integration

```
__root.tsx
    ↓
imports locales/index.ts (i18n initialization)
    ↓
RootDocument
    ↓
I18nProvider (wraps app)
    ↓
App Components (use translations)
```

## Components and Interfaces

### 1. Translation Resource Loader

**Purpose**: Dynamically load translation files using Vite's import system

**Interface**:

```typescript
type TranslationLoader = (
  language: string,
  namespace: string,
) => Promise<Record<string, string>>
```

**Implementation Strategy**:

- Use `i18next-resources-to-backend` with dynamic imports
- Leverage Vite's glob import for automatic file discovery
- Generate separate chunks per language for optimal code splitting

### 2. i18n Configuration Module

**Location**: `src/locales/index.ts`

**Responsibilities**:

- Initialize i18next with optimized backend
- Configure language detection
- Set up React integration
- Define supported languages and namespaces

**Key Changes**:

- Remove `i18next-http-backend` dependency
- Add `i18next-resources-to-backend` with dynamic imports
- Configure eager loading for default language
- Enable lazy loading for secondary languages

### 3. I18n Provider Component

**Location**: `src/locales/I18nProvider.tsx`

**Responsibilities**:

- Wrap application with i18next context
- Handle Suspense boundaries for async loading
- Provide fallback UI during language switches

**Enhancements**:

- Add error boundary for translation loading failures
- Implement loading state for language switches
- Optimize re-render behavior

### 4. Root Route Integration

**Location**: `src/routes/__root.tsx`

**Changes**:

- Uncomment locale import to enable i18n
- Ensure i18n initializes before React render
- Wrap application with I18nProvider

## Data Models

### Translation Resource Structure

```typescript
interface TranslationResource {
  [key: string]: string | TranslationResource
}

interface LanguageResources {
  [namespace: string]: TranslationResource
}

interface I18nResources {
  [language: string]: LanguageResources
}
```

### i18n Configuration

```typescript
interface I18nConfig {
  fallbackLng: string
  supportedLngs: string[]
  defaultNS: string
  ns: string[]
  interpolation: {
    escapeValue: boolean
  }
  react: {
    useSuspense: boolean
  }
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Dynamic import usage for namespaces

_For any_ non-default translation namespace that is requested, the i18n System should load it using dynamic imports rather than synchronous requires.

**Validates: Requirements 2.2**

### Property 2: Asynchronous language loading

_For any_ language switch operation to a non-default language, the i18n System should load the new language bundle asynchronously without blocking the main thread.

**Validates: Requirements 2.4**

### Property 3: Language preference persistence

_For any_ user-selected language preference, after setting the language, subsequent application loads should restore that language preference from browser storage.

**Validates: Requirements 3.4**

### Property 4: Cached language network avoidance

_For any_ language that has been previously loaded and cached, subsequent requests for that language should not trigger network requests.

**Validates: Requirements 3.5**

### Property 5: No HTTP backend usage

_For any_ translation loading operation, the i18n System should not use i18next-http-backend or make HTTP requests to fetch translation files.

**Validates: Requirements 4.1, 4.2**

### Property 6: Offline translation access

_For any_ previously loaded language, when the application is offline, all translations for that language should remain accessible without network requests.

**Validates: Requirements 4.3**

### Property 7: i18n initialization before component mount

_For any_ React component that uses translations, the i18n System should have completed initialization before that component mounts.

**Validates: Requirements 5.1**

### Property 8: Suspense boundary activation

_For any_ asynchronous translation loading operation, React Suspense boundaries should activate to handle loading states appropriately.

**Validates: Requirements 5.2**

### Property 9: Synchronous translation access

_For any_ translation key in a loaded language, components should be able to access translations synchronously without additional loading delays.

**Validates: Requirements 5.4**

## Error Handling

### Translation Loading Failures

**Scenario**: Dynamic import fails for a language bundle

**Handling**:

1. Log error to console with language and namespace details
2. Fall back to default language (English)
3. Display user-friendly message if in development mode
4. Continue application execution without blocking

### Missing Translation Keys

**Scenario**: Translation key doesn't exist in loaded resources

**Handling**:

1. Return fallback language value (English)
2. Log warning in development mode
3. Display key name as fallback in UI

### Language Detection Failures

**Scenario**: Browser language detection returns unsupported language

**Handling**:

1. Fall back to default language (English)
2. Allow manual language selection via UI
3. Persist user's manual selection

### Initialization Errors

**Scenario**: i18n fails to initialize

**Handling**:

1. Catch initialization error
2. Log detailed error information
3. Render error boundary with recovery option
4. Provide fallback to English-only mode

## Implementation Notes

### Vite Configuration

Add manual chunk configuration for i18n resources:

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('/locales/es/')) {
          return 'i18n-es'
        }
        // English bundled with main app
      }
    }
  }
}
```

### Dynamic Import Pattern

Use Vite's glob import for automatic translation discovery:

```typescript
const translations = import.meta.glob('/public/locales/**/*.json')

const loadTranslation = (lng: string, ns: string) => {
  const path = `/public/locales/${lng}/${ns}.json`
  return translations[path]?.() as Promise<{ default: any }>
}
```

### Migration Path

1. Install `i18next-resources-to-backend` (already in dependencies)
2. Update `src/locales/index.ts` to use new backend
3. Remove `i18next-http-backend` usage
4. Test with both languages
5. Uncomment import in `__root.tsx`
6. Verify performance improvement

### Backward Compatibility

- Maintain existing translation file structure in `/public/locales/`
- Keep same namespace and language codes
- Preserve existing translation keys
- No changes required to components using translations
