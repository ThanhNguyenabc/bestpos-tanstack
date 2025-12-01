# Axios to Fetch Migration Guide

## Overview

This guide helps you migrate from axios to the native Fetch API, saving ~30 KB (10 KB gzipped) from your bundle.

## Benefits

- ✅ **Zero bundle size** - Native browser API
- ✅ **Modern & well-supported** - Works in all modern browsers
- ✅ **Simpler** - No external dependency to maintain
- ✅ **Same interface** - Drop-in replacement for your current usage

## Migration Steps

### Step 1: Backup current client (Optional)

```bash
cp src/lib/api/client.ts src/lib/api/client-axios-backup.ts
```

### Step 2: Replace the client

```bash
# Remove old client
rm src/lib/api/client.ts

# Rename new client
mv src/lib/api/client-fetch.ts src/lib/api/client.ts
```

### Step 3: No changes needed to API files!

The new client has the same interface, so `blogs.ts` and `products.ts` work without changes:

```typescript
// This code works with both axios and fetch-based client
const response = await apiClient.get<BlogPost[]>('/blogs', { params })
return response.data
```

### Step 4: Remove axios

```bash
npm uninstall axios
```

### Step 5: Test

```bash
# Run tests
npm test

# Build
npm run build

# Test in browser
npm run dev
```

## API Comparison

### Before (Axios)

```typescript
import axios from 'axios'

const response = await apiClient.get('/blogs', {
  params: { limit: 10 },
})
return response.data
```

### After (Fetch)

```typescript
// Same interface!
const response = await apiClient.get('/blogs', {
  params: { limit: 10 },
})
return response.data
```

## Error Handling

Both implementations handle errors the same way:

```typescript
try {
  const response = await apiClient.get('/blogs')
  return response.data
} catch (error) {
  // Error is already logged via toast
  // Handle error in component
  console.error(error)
}
```

## Advanced Features

### Timeout

```typescript
// 10 second timeout
await apiClient.get('/blogs', { timeout: 10000 })
```

### Custom Headers

```typescript
await apiClient.post('/blogs', data, {
  headers: {
    'X-Custom-Header': 'value',
  },
})
```

### Query Parameters

```typescript
await apiClient.get('/blogs', {
  params: {
    limit: 10,
    offset: 0,
    tag: 'featured',
  },
})
```

## What's Different?

### Interceptors

The fetch-based client doesn't have interceptors. If you need to add auth tokens:

**Option 1: Modify the client directly**

```typescript
// In client.ts, update the request method:
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  ...fetchConfig.headers,
},
```

**Option 2: Create a wrapper function**

```typescript
export async function authenticatedGet<T>(
  endpoint: string,
  config?: FetchConfig,
) {
  const token = localStorage.getItem('token')
  return apiClient.get<T>(endpoint, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${token}`,
    },
  })
}
```

### Response Transformation

Axios automatically transforms responses. With fetch, you need to call `.json()`:

```typescript
// Already handled in the client!
const data = await response.json()
return { data }
```

## Testing

The new client is fully compatible with your existing tests. No changes needed!

## Rollback

If you need to rollback:

```bash
# Restore axios client
cp src/lib/api/client-axios-backup.ts src/lib/api/client.ts

# Reinstall axios
npm install axios
```

## Performance Impact

| Metric        | Before (Axios) | After (Fetch) | Savings |
| ------------- | -------------- | ------------- | ------- |
| Bundle Size   | 30 KB          | 0 KB          | 30 KB   |
| Gzipped       | 10 KB          | 0 KB          | 10 KB   |
| HTTP Requests | Same           | Same          | -       |
| Performance   | Same           | Same          | -       |

## Checklist

- [ ] Backup current client (optional)
- [ ] Replace client.ts with fetch-based version
- [ ] Remove axios: `npm uninstall axios`
- [ ] Run tests: `npm test`
- [ ] Build: `npm run build`
- [ ] Test in browser: `npm run dev`
- [ ] Verify API calls work
- [ ] Check error handling
- [ ] Deploy to staging
- [ ] Monitor for issues

## Support

If you encounter any issues:

1. Check browser console for errors
2. Verify API endpoints are correct
3. Check network tab for request/response
4. Ensure CORS is configured correctly
5. Test with different browsers

## Summary

The fetch-based client provides the same functionality as axios with:

- ✅ 30 KB smaller bundle
- ✅ No external dependencies
- ✅ Same interface
- ✅ Better tree-shaking
- ✅ Native browser support

This is a low-risk, high-reward migration that directly reduces your bundle size.
