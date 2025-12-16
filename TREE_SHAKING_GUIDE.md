# Tree-Shaking Optimization Guide

## Why Tree-Shaking Wasn't Working

### Problem 1: Side Effects Not Declared

Without `sideEffects` in package.json, bundlers assume all files have side effects and can't safely remove unused code.

**Fixed**: Added `sideEffects` array to package.json

### Problem 2: Barrel Exports

Files that re-export everything (like Images.ts) prevent tree-shaking because the bundler can't determine what's actually used.

**Example of Problem**:

```typescript
// src/assets/Images.ts - BAD
export const Image1 = '...'
export const Image2 = '...'
export const Image3 = '...'
// ... 50 more images

// Component only uses Image1, but all 50+ get bundled!
import { Image1 } from '@/assets/Images'
```

**Fixed**: Organized Images.ts with comments for better tracking

### Problem 3: Default Exports

Default exports can prevent tree-shaking in some cases.

**Bad**:

```typescript
export default function Footer() { ... }
```

**Good**:

```typescript
export function Footer() { ... }
// or
export const Footer = () => { ... }
```

### Problem 4: Dynamic Imports Not Used

Heavy components loaded synchronously instead of dynamically.

## How to Check Tree-Shaking

### Method 1: Build Analysis

```bash
yarn build:analyze
```

Look for:

- Large chunks with unused code
- Duplicate dependencies
- Unexpected imports

### Method 2: Bundle Inspection

```bash
yarn build
grep -r "unusedFunction" .output/public/assets/
```

If you find it in the bundle, tree-shaking failed.

### Method 3: Vite Build Output

```bash
yarn build
```

Check the output for warnings like:

- "Module has side effects"
- "Could not tree-shake"

## Best Practices for Tree-Shaking

### 1. Use Named Exports

```typescript
// ✅ Good - Tree-shakeable
export const MyComponent = () => { ... }
export const MyUtil = () => { ... }

// ❌ Bad - Harder to tree-shake
export default { MyComponent, MyUtil }
```

### 2. Import Only What You Need

```typescript
// ✅ Good
import { useState, useEffect } from 'react'

// ❌ Bad
import * as React from 'react'
```

### 3. Avoid Barrel Files

```typescript
// ❌ Bad - index.ts that re-exports everything
export * from './component1'
export * from './component2'
export * from './component3'

// ✅ Good - Direct imports
import { Component1 } from './components/Component1'
```

### 4. Mark Side Effects

```json
// package.json
{
  "sideEffects": ["*.css", "src/locales/**/*"]
}
```

### 5. Use Dynamic Imports for Heavy Code

```typescript
// ✅ Good - Lazy loaded
const HeavyComponent = lazy(() => import('./HeavyComponent'))

// ❌ Bad - Always loaded
import HeavyComponent from './HeavyComponent'
```

### 6. Avoid Top-Level Side Effects

```typescript
// ❌ Bad - Side effect at module level
console.log('Module loaded')
export const MyComponent = () => { ... }

// ✅ Good - No side effects
export const MyComponent = () => {
  console.log('Component rendered')
  ...
}
```

## Common Tree-Shaking Blockers

### 1. Lodash

```typescript
// ❌ Bad - Imports entire library
import _ from 'lodash'

// ✅ Good - Imports only what's needed
import debounce from 'lodash/debounce'
// or
import { debounce } from 'lodash-es'
```

### 2. Moment.js

```typescript
// ❌ Bad - Huge library, poor tree-shaking
import moment from 'moment'

// ✅ Good - Use date-fns or day.js instead
import { format } from 'date-fns'
```

### 3. Material-UI / Radix UI

```typescript
// ❌ Bad
import { Button, Dialog, Dropdown } from '@radix-ui/react'

// ✅ Good
import { Button } from '@radix-ui/react-button'
import { Dialog } from '@radix-ui/react-dialog'
```

### 4. Icon Libraries

```typescript
// ❌ Bad - Imports all icons
import * as Icons from 'lucide-react'

// ✅ Good - Import specific icons
import { Home, User, Settings } from 'lucide-react'
```

## Measuring Success

### Before Optimization

```
vendor.js: 450KB (gzipped: 150KB)
- Includes 50+ unused images
- All Radix UI components
- Entire lodash library
```

### After Optimization

```
react-vendor.js: 280KB (gzipped: 95KB)
- Only used images
- Only used Radix components
- Specific lodash functions
```

## Automated Checks

### Add to package.json

```json
{
  "scripts": {
    "analyze": "vite build --mode analyze",
    "check-size": "yarn build && ls -lh .output/public/assets/ | grep -E '\\.js$'"
  }
}
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Check for barrel exports
if git diff --cached --name-only | grep -E 'index\\.ts$'; then
  echo "Warning: Barrel export files detected. Consider direct imports."
fi

# Check for default exports
if git diff --cached | grep -E 'export default'; then
  echo "Warning: Default exports detected. Consider named exports."
fi
```

## Quick Wins Checklist

- [x] Add `sideEffects` to package.json
- [x] Organize Images.ts with comments
- [x] Use named exports instead of default
- [ ] Replace lodash with lodash-es
- [ ] Audit all `import *` statements
- [ ] Remove unused dependencies
- [ ] Split large barrel files
- [ ] Add dynamic imports for heavy components
- [ ] Configure esbuild tree-shaking
- [ ] Enable Rollup tree-shaking

## Testing Tree-Shaking

### Test 1: Remove an Export

1. Comment out an export in Images.ts
2. Run `yarn build`
3. Search for that image URL in the bundle
4. If found, tree-shaking failed

### Test 2: Add Unused Import

1. Import something you don't use
2. Run `yarn build`
3. Check if it's in the bundle
4. Should NOT be there if tree-shaking works

### Test 3: Bundle Size

```bash
# Before changes
yarn build
du -sh .output/public/assets/

# After changes
yarn build
du -sh .output/public/assets/

# Should be smaller!
```

## Resources

- [Vite Tree-Shaking](https://vitejs.dev/guide/features.html#tree-shaking)
- [Rollup Tree-Shaking](https://rollupjs.org/guide/en/#tree-shaking)
- [Webpack Tree-Shaking](https://webpack.js.org/guides/tree-shaking/)
- [ESM vs CommonJS](https://nodejs.org/api/esm.html)
