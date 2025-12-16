# Bundle Optimization Strategy

## Problem

The vendor.js bundle was too large, impacting mobile performance and initial load time.

## Solution: Smart Code Splitting

### New Chunk Strategy

#### Core React (react-vendor)

- `react`
- `react-dom`
- `@radix-ui/react-slot` (required by React context)

**Why together**: These must share the same React context to avoid "multiple React instances" errors.

#### Radix UI Components (Split by Usage)

1. **radix-dialog** - Dialog/Modal components
   - Only loaded when dialogs are used
2. **radix-dropdown** - Dropdown menus
   - Only loaded when dropdowns are used
3. **radix-accordion** - Accordion/Tabs
   - `@radix-ui/react-accordion`
   - `@radix-ui/react-tabs`
   - Grouped because they're similar components
4. **radix-forms** - Form-related components
   - `@radix-ui/react-select`
   - `@radix-ui/react-label`
   - Only loaded on pages with forms
5. **radix-core** - Other Radix UI components
   - Fallback for any other Radix components

**Why split**: Each Radix component is independent and can be lazy-loaded based on page requirements.

#### TanStack Libraries (Split)

1. **router** - `@tanstack/react-router`
   - Routing logic
2. **query** - `@tanstack/react-query`
   - Data fetching and caching

**Why split**: Router is needed immediately, but Query can be loaded slightly later.

#### Other Vendors

1. **i18n** - Internationalization
   - `i18next`
   - `react-i18next`
   - `i18next-browser-languagedetector`
2. **icons** - `lucide-react`
   - Large icon library, split separately
3. **http** - `axios`
   - HTTP client
4. **forms** - Form libraries
   - `react-hook-form`
   - `zod`
   - `@hookform`
5. **utils** - Utility libraries
   - `class-variance-authority`
   - `clsx`
   - `tailwind-merge`
6. **vendor** - Everything else

## Benefits

### Before

- Single large vendor.js (~300-500KB)
- All code loaded upfront
- Slow initial page load

### After

- Multiple smaller chunks (20-80KB each)
- Code loaded on-demand
- Faster initial page load
- Better caching (unchanged chunks stay cached)

## Bundle Size Targets

| Chunk          | Target Size | Priority   |
| -------------- | ----------- | ---------- |
| react-vendor   | ~150KB      | Critical   |
| router         | ~80KB       | Critical   |
| query          | ~60KB       | High       |
| radix-core     | ~40KB       | Medium     |
| radix-dialog   | ~30KB       | Low (lazy) |
| radix-dropdown | ~25KB       | Medium     |
| radix-forms    | ~30KB       | Low (lazy) |
| i18n           | ~50KB       | High       |
| icons          | ~100KB      | Low (lazy) |
| utils          | ~20KB       | High       |

## How Radix UI Still Works

Radix UI components work correctly because:

1. **Shared React Context**: All Radix components use the same React instance from `react-vendor`
2. **Independent Components**: Each Radix component is self-contained
3. **No Cross-Dependencies**: Radix components don't depend on each other
4. **Context Providers**: React context providers work across chunk boundaries

## Testing

```bash
# Build and analyze bundle
yarn build:analyze

# This will:
# 1. Build the production bundle
# 2. Generate stats.html
# 3. Open visualization in browser
```

## Monitoring

Check these metrics after deployment:

- Initial bundle size (should be < 200KB gzipped)
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

## Further Optimizations

If bundles are still too large:

1. **Dynamic Imports**: Convert more components to lazy loading
2. **Tree Shaking**: Ensure unused code is eliminated
3. **Compression**: Enable Brotli compression on server
4. **CDN**: Serve chunks from CDN with long cache times
5. **Preload**: Add `<link rel="preload">` for critical chunks
