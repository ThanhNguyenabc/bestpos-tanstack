# Vendor Bundle Optimization Strategies

## Current Strategy: Keep React + Radix UI Together

### Why?

Radix UI components import React hooks directly (`useState`, `useLayoutEffect`, etc.). Splitting them causes:

- "Invalid hook call" errors
- Multiple React instances
- Context not working across chunks

### Current Chunks:

1. **react-vendor** (~200-250KB) - React + React DOM + All Radix UI
2. **router** (~80KB) - TanStack Router
3. **query** (~60KB) - TanStack Query
4. **i18n** (~50KB) - i18next libraries
5. **icons** (~100KB) - Lucide React (lazy loaded)
6. **forms** (~80KB) - react-hook-form + zod (lazy loaded)
7. **utils** (~20KB) - Class utilities
8. **http** (~30KB) - Axios
9. **vendor** - Everything else

## Alternative Strategies to Reduce react-vendor

### Strategy 1: Remove Unused Radix Components

Check which Radix components you're actually using:

```bash
# Find all Radix imports
grep -r "@radix-ui" src/
```

Remove unused Radix packages from package.json:

```bash
yarn remove @radix-ui/react-[unused-component]
```

### Strategy 2: Replace Heavy Components

Replace Radix UI with lighter alternatives for simple components:

| Radix Component | Lighter Alternative      | Size Savings |
| --------------- | ------------------------ | ------------ |
| Dialog          | Native `<dialog>` + CSS  | ~15KB        |
| Dropdown        | Custom CSS dropdown      | ~10KB        |
| Select          | Native `<select>` styled | ~12KB        |
| Accordion       | Details/Summary          | ~8KB         |

### Strategy 3: Lazy Load Radix Components

Create lazy-loaded wrappers for heavy Radix components:

```typescript
// src/components/ui/dialog-lazy.tsx
import { lazy, Suspense } from 'react'

const Dialog = lazy(() => import('@radix-ui/react-dialog').then(m => ({
  default: m.Root
})))

export const LazyDialog = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Dialog {...props} />
  </Suspense>
)
```

### Strategy 4: Use React from CDN (Production Only)

Add to index.html:

```html
<script
  crossorigin
  src="https://unpkg.com/react@19/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"
></script>
```

Update vite.config.ts:

```typescript
build: {
  rollupOptions: {
    external: ['react', 'react-dom'],
    output: {
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    }
  }
}
```

**Pros**: Reduces bundle by ~150KB
**Cons**: Extra HTTP request, no tree-shaking, cache dependency

### Strategy 5: Code Splitting by Route

Split components by route instead of by library:

```typescript
// vite.config.ts
manualChunks(id) {
  // Home page components
  if (id.includes('/routes/index') || id.includes('/components/home/')) {
    return 'home'
  }

  // POS systems page
  if (id.includes('/routes/pos-systems') || id.includes('/components/pos/')) {
    return 'pos-systems'
  }

  // Shared components
  if (id.includes('/components/ui/')) {
    return 'ui-components'
  }
}
```

### Strategy 6: Dynamic Imports for Non-Critical UI

Convert non-critical components to dynamic imports:

```typescript
// Instead of:
import { Dialog } from '@/components/ui/dialog'

// Use:
const Dialog = lazy(() => import('@/components/ui/dialog'))
```

### Strategy 7: Tree-Shaking Optimization

Ensure proper tree-shaking:

```typescript
// Bad - imports entire library
import * as RadixDialog from '@radix-ui/react-dialog'

// Good - imports only what's needed
import { Root, Trigger, Content } from '@radix-ui/react-dialog'
```

### Strategy 8: Preact Alias (Advanced)

Replace React with Preact (smaller, compatible):

```typescript
// vite.config.ts
resolve: {
  alias: {
    'react': 'preact/compat',
    'react-dom': 'preact/compat'
  }
}
```

**Pros**: ~100KB smaller
**Cons**: Some compatibility issues, testing required

## Recommended Approach

### Phase 1: Quick Wins (Do Now)

1. ✅ Keep React + Radix together (current setup)
2. Remove unused Radix components
3. Lazy load Footer, Toaster, heavy components
4. Split TanStack Router and Query

### Phase 2: Medium Term

1. Audit Radix usage - replace simple components
2. Implement route-based code splitting
3. Dynamic imports for dialogs, modals
4. Optimize icon imports (use specific icons)

### Phase 3: Advanced (If Needed)

1. Consider Preact for production
2. Evaluate CDN for React
3. Custom implementations for simple UI

## Measuring Success

Target bundle sizes (gzipped):

| Chunk         | Current | Target | Status         |
| ------------- | ------- | ------ | -------------- |
| react-vendor  | 250KB   | 180KB  | 🟡 In Progress |
| router        | 80KB    | 80KB   | ✅ Good        |
| query         | 60KB    | 60KB   | ✅ Good        |
| i18n          | 50KB    | 50KB   | ✅ Good        |
| icons         | 100KB   | 80KB   | 🟡 Optimize    |
| Total Initial | 400KB   | 300KB  | 🎯 Goal        |

## Testing Checklist

After any optimization:

- [ ] All Radix components work correctly
- [ ] No "Invalid hook call" errors
- [ ] Context providers work
- [ ] Dialogs/Dropdowns open correctly
- [ ] Forms submit properly
- [ ] No console errors
- [ ] Mobile performance improved
- [ ] Lighthouse score increased

## Commands

```bash
# Analyze current bundle
yarn build:analyze

# Check bundle sizes
yarn build && ls -lh .output/public/assets/

# Test production build
yarn build && yarn serve
```
