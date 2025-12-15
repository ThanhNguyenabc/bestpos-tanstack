# Language Prefix Routing - Final Implementation

## ✅ Fixed: SEO Tags Now Load in Production!

The issue was that `i18n.language` wasn't available during SSR. Now we detect language from the URL pathname instead.

## How It Works

### URL Structure

**English (Default - No Prefix):**

```
/                → Homepage (English)
/about           → About page (English)
/contact         → Contact page (English)
```

**Spanish (With `/es` Prefix):**

```
/es              → Homepage (Spanish)
/es/about        → About page (Spanish) - needs route file
/es/contact      → Contact page (Spanish) - needs route file
```

### Language Detection Flow

```
1. User visits / or /es
2. Loader runs: getCurrentLanguage(location.pathname)
3. Returns 'en' for / or 'es' for /es
4. Loader fetches SEO with detected language
5. SEO tags render correctly in production
6. useLanguageSync() syncs i18n with URL
```

## Files Structure

### Current Routes

```
src/routes/
├── index.tsx              # English homepage (/)
├── $lang/
│   └── index.tsx          # Language-prefixed homepage (/es, /en)
├── _lang.tsx              # Layout route (optional)
└── about.tsx              # English about page (/about)
```

### To Add Spanish Support for Other Pages

Create `src/routes/$lang/about.tsx`:

```typescript
import { createFileRoute, redirect } from '@tanstack/react-router'
import { createHead, createSEOQuery } from '@/lib/seo'
import { SUPPORTED_LANGUAGES } from '@/utils/language-routing'

export const Route = createFileRoute('/$lang/about')({
  beforeLoad: ({ params }) => {
    if (!SUPPORTED_LANGUAGES.includes(params.lang as any)) {
      throw redirect({ to: '/about' })
    }
  },
  loader: async ({ context, params }) => {
    const lang = params.lang as 'en' | 'es'
    const seoData = await context.queryClient.fetchQuery(
      createSEOQuery('about', lang)
    )
    return { seo: seoData, language: lang }
  },
  head: ({ loaderData }) => createHead({ seo: loaderData?.seo }),
  component: AboutPage,
})

function AboutPage() {
  return <div>About Page Content</div>
}
```

## Key Changes

### 1. `src/routes/index.tsx` - Fixed SEO Loading

**Before (Broken in Production):**

```typescript
export const homeQueryOptions = () => {
  const currentLang = i18n.language || 'en' // ❌ Not available in SSR
  return createSEOQuery('home', currentLang)
}
```

**After (Works in Production):**

```typescript
export const Route = createFileRoute('/')({
  loader: async ({ context, location }) => {
    const lang = getCurrentLanguage(location.pathname) // ✅ From URL
    const seoData = await context.queryClient.fetchQuery(
      createSEOQuery('home', lang),
    )
    return { seo: seoData, language: lang }
  },
})
```

### 2. `src/routes/$lang/index.tsx` - Language-Prefixed Route

Handles `/es`, `/en`, etc.:

```typescript
export const Route = createFileRoute('/$lang/')({
  beforeLoad: ({ params }) => {
    // Validate language
    if (!SUPPORTED_LANGUAGES.includes(params.lang as any)) {
      throw redirect({ to: '/' })
    }
  },
  loader: async ({ context, params }) => {
    const lang = params.lang as 'en' | 'es'
    const seoData = await context.queryClient.fetchQuery(
      createSEOQuery('home', lang),
    )
    return { seo: seoData, language: lang }
  },
})
```

### 3. `src/components/LanguageSelector.tsx` - URL Navigation

```typescript
const changeLanguage = async (langCode: SupportedLanguage) => {
  await i18n.changeLanguage(langCode)
  const newPath = switchLanguageInPath(location.pathname, langCode)
  navigate({ to: newPath as any })
}
```

### 4. `src/routes/__root.tsx` - Language Sync

```typescript
function RootContent({ children }: { children: React.ReactNode }) {
  useLanguageSync()  // Syncs URL language with i18n
  return <div>...</div>
}
```

## Testing

### Test in Production

```bash
npm run build
node .output/server/index.mjs
```

### Test SEO Tags

**1. English homepage:**

```bash
curl http://localhost:3000 | grep -A 10 "<head>"
```

Should show:

```html
<title>Your English Title</title>
<meta name="description" content="Your English description" />
```

**2. Spanish homepage:**

```bash
curl http://localhost:3000/es | grep -A 10 "<head>"
```

Should show:

```html
<title>Tu Título en Español</title>
<meta name="description" content="Tu descripción en español" />
```

### Test in Browser

1. Visit `http://localhost:3000`
2. View page source (Ctrl+U)
3. Check `<head>` section for SEO tags
4. Click language selector → "Español"
5. URL changes to `http://localhost:3000/es`
6. View page source again
7. SEO tags should be in Spanish

### Check Console Logs

```
[SEO] Fetching tags for page: home locale: en
[SEO] Tags loaded successfully: BestPOS - Find the Best POS System
```

When switching to Spanish:

```
[Language] Syncing from URL: es
[SEO] Fetching tags for page: home locale: es
[SEO] Tags loaded successfully: BestPOS - Encuentra el Mejor Sistema POS
```

## Benefits

✅ **SEO works in production** - Tags load correctly during SSR
✅ **Language in URL** - Shareable language-specific links
✅ **Bookmarkable** - Users can bookmark Spanish pages
✅ **Deep linking** - Direct access to `/es/about`
✅ **Search engine friendly** - Each language has unique URL
✅ **Browser history** - Back/forward buttons work correctly

## Next Steps

### 1. Create Language Routes for Other Pages

For each existing route, create a `/$lang/` version:

```
src/routes/about.tsx          → src/routes/$lang/about.tsx
src/routes/contact.tsx        → src/routes/$lang/contact.tsx
src/routes/products.tsx       → src/routes/$lang/products.tsx
```

### 2. Update Existing Routes

Update all routes to detect language from URL:

```typescript
loader: async ({ context, location }) => {
  const lang = getCurrentLanguage(location.pathname)
  const seoData = await context.queryClient.fetchQuery(
    createSEOQuery('page-name', lang),
  )
  return { seo: seoData }
}
```

### 3. Add hreflang Tags for SEO

In your head configuration:

```typescript
head: ({ loaderData, location }) => {
  const currentLang = getCurrentLanguage(location.pathname)
  const basePath = removeLanguagePrefix(location.pathname)

  return {
    ...createHead({ seo: loaderData?.seo }),
    links: [
      {
        rel: 'alternate',
        hreflang: 'en',
        href: `https://bestpos.com${basePath}`,
      },
      {
        rel: 'alternate',
        hreflang: 'es',
        href: `https://bestpos.com/es${basePath}`,
      },
    ],
  }
}
```

## Troubleshooting

### Issue: SEO tags not showing in production

**Check:**

1. Loader is using `getCurrentLanguage(location.pathname)`
2. Not using `i18n.language` in loader
3. SEO API is returning data

**Solution:**

```typescript
loader: async ({ context, location }) => {
  const lang = getCurrentLanguage(location.pathname) // ✅ Use this
  // NOT: const lang = i18n.language  // ❌ Don't use this
  const seoData = await context.queryClient.fetchQuery(
    createSEOQuery('page', lang),
  )
  return { seo: seoData }
}
```

### Issue: 404 on /es/about

**Cause:** Route file doesn't exist

**Solution:** Create `src/routes/$lang/about.tsx`

### Issue: Language doesn't persist

**Check:** `useLanguageSync()` is called in `RootContent`

## Summary

✅ SEO tags load correctly in production
✅ Language detected from URL pathname
✅ Works with SSR and client-side navigation
✅ `/es` prefix routes to Spanish content
✅ Language selector navigates correctly
✅ Build successful with no errors
✅ Production-ready! 🎉

**Current Status:**

- ✅ Homepage works: `/` (English) and `/es` (Spanish)
- ⏳ Other pages need `/$lang/` route files

**To complete:**
Create `/$lang/` versions of all routes for full Spanish support.
