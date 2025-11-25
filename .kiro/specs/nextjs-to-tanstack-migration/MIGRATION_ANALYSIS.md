# Legacy Application Analysis

## Route Inventory

### Total Pages: 45

#### Static Pages (22)

1. `/` - Home page
2. `/404` - Not found page
3. `/500` - Server error page
4. `/about-us` - About page
5. `/advertiser-disclosure` - Advertiser disclosure
6. `/bars-and-night-clubs` - Business type page
7. `/cash-advance` - Service page
8. `/cash-discount-program` - Service page
9. `/cash-signing-bonus-calculator` - Calculator
10. `/check-services` - Service page
11. `/cloudbeds` - Integration page
12. `/clover-app-market` - Integration page
13. `/contact-us` - Contact form
14. `/credit-card-processing-calculator` - Calculator
15. `/customer-loyalty-programs-and-rewards` - Service page
16. `/faqs` - FAQ page
17. `/full-service-restaurants` - Business type page
18. `/get-pricing` - Pricing calculator (multi-step form)
19. `/gift-card-program` - Service page
20. `/how-we-rate` - Information page
21. `/invoicing` - Service page
22. `/mobile-order-pay` - Service page
23. `/online-analytics` - Service page
24. `/partner` - Partner page
25. `/payment-processing` - Service page
26. `/pizzerias` - Business type page
27. `/point-of-sale-systems` - POS systems listing
28. `/privacy-policy` - Privacy policy
29. `/quick-service-restaurants` - Business type page
30. `/quickbooks-plugin` - Integration page
31. `/referral-program` - Program page
32. `/request-demo-pos` - Demo request form
33. `/retail` - Business type page
34. `/same-day-funding` - Service page
35. `/small-business` - Business type page
36. `/suggest-pos` - Suggestion form
37. `/term-conditions` - Terms and conditions
38. `/terms-of-service` - Terms of service
39. `/thanks-you` - Thank you page

#### Dynamic Routes (6)

1. `/blogs` - Blog listing
2. `/blogs/[blogId]` - Individual blog post
3. `/pos-systems` - POS systems listing
4. `/pos-systems/[slug]` - Individual POS system detail
5. `/product/[pos]` - Product detail (alternative route)
6. `/solutions/[slug]` - Solution detail page

## Component Structure

### UI Library Usage

**Ant Design Components:**

- Form, Input, Button, Select
- Modal, Drawer
- Table, Card
- Row, Col (Grid system)
- Message, Notification

**HeroUI Components:**

- Custom components from @heroui/react
- Theme system integration

### Component Organization

```
components/
├── common/          # Shared utilities
├── elements/        # Feature-specific components
│   ├── header/
│   ├── home/
│   └── ...
└── ui/             # Base UI components

ui/
├── atoms/          # Basic building blocks
├── organisms/      # Complex composed components
│   ├── footer/
│   ├── unique-value/
│   ├── work-with-the-best/
│   └── all-businesses/
├── templates/      # Page-level templates
│   ├── home/
│   ├── blogs/
│   ├── business-types/
│   ├── get-pricing/
│   ├── products/
│   ├── secondary/
│   └── solutions/
└── util-components/ # Utility components
    └── SeoTag
```

## Data Fetching Patterns

### getStaticProps Usage

- Used extensively for SSG
- Fetches data from Airtable and MongoDB
- Includes translation data via next-i18next

### API Routes

Located in `pages/api/`:

- Email sending endpoints
- Form submission handlers
- Data fetching proxies

### API Services (`apis/`)

- `blogs.ts` - Blog data fetching
- `product.ts` - Product data fetching
- `index.ts` - Main API functions (Airtable, MongoDB)
- `fetcher.ts` - SWR fetcher utility

## State Management

### Zustand Stores (`store/`)

1. `product_store.ts` - Product state management
2. `request_demo_store.ts` - Demo request form state

## Internationalization

### next-i18next Configuration

- Supports English (en) and Spanish (es)
- Translation files in `public/locales/`
- Namespaces: home, pos_systems, testimonials, how_it_work, pos-detail, calculator, request-demo-pos

## Key Features to Migrate

### 1. Multi-Step Forms

- **Get Pricing Calculator** (`/get-pricing`)
  - BusinessList step
  - ProcessBar (progress indicator)
  - AdditionalInfo form
  - FinishContent (results)
  - Form validation with react-hook-form

### 2. Calculators

- Cash signing bonus calculator
- Credit card processing calculator
- Interactive calculations with real-time updates

### 3. Dynamic Content Pages

- POS system details with dynamic data
- Blog posts with rich content
- Solutions pages

### 4. Forms

- Contact form
- Demo request form
- POS suggestion form
- Email integration with nodemailer

### 5. SEO Components

- SeoTag component for meta tags
- Dynamic meta tags per page
- Sitemap generation

## Dependencies to Migrate

### Keep (Already Compatible)

- `react-hook-form` - Form handling
- `zod` - Validation schemas
- `zustand` - State management
- `axios` - HTTP client
- `dayjs` - Date utilities
- `lodash` - Utility functions
- `tailwindcss` - Styling
- `mongodb` - Database
- `airtable` - CMS
- `nodemailer` - Email sending

### Replace

- `next` → Vite + TanStack Router
- `next-i18next` → `react-i18next`
- `antd` → `shadcn/ui`
- `@heroui/react` → `shadcn/ui` or custom
- `swr` → `@tanstack/react-query`

### Add

- `@tanstack/react-router` - Routing
- `@tanstack/react-query` - Data fetching
- `vite` - Build tool
- `vitest` - Testing
- `fast-check` - Property-based testing

## Migration Priority

### Phase 1: Foundation (Tasks 2-4)

- Vite setup
- TypeScript configuration
- shadcn/ui installation
- TanStack Router setup

### Phase 2: Core Infrastructure (Tasks 5-7)

- TanStack Query setup
- i18n migration
- Zustand stores migration
- API client setup

### Phase 3: Layout & Navigation (Task 8)

- Header component
- Footer component
- Navigation links

### Phase 4: Content Pages (Tasks 10-18)

- Home page
- POS systems pages
- Blog pages
- Static pages
- Business type pages
- Solutions pages
- Calculator pages

### Phase 5: Forms (Tasks 13-14)

- Pricing calculator
- Contact forms
- Demo request forms

### Phase 6: Polish (Tasks 21-24)

- API integrations
- Analytics
- Utility components
- Performance optimization

## Technical Challenges

### 1. SSG to Client-Side Rendering

- Next.js getStaticProps → TanStack Router loaders
- Need to handle data fetching on client side
- Consider implementing ISR-like behavior with TanStack Query

### 2. Component Library Migration

- Ant Design Grid → Tailwind CSS Grid/Flex
- Modal/Drawer → Dialog/Sheet (different APIs)
- Form components → shadcn/ui forms with react-hook-form

### 3. i18n Integration

- next-i18next server-side → react-i18next client-side
- Translation loading strategy
- Language switching without page reload

### 4. SEO Considerations

- Meta tags management without Next.js Head
- Consider using @tanstack/react-router's meta feature
- Sitemap generation strategy

### 5. API Routes

- Next.js API routes → Separate backend or serverless functions
- Need to deploy API endpoints separately
- Consider using Vercel serverless functions or similar

## Recommendations

1. **Start with core pages** - Home, POS systems, blogs
2. **Migrate components incrementally** - One template at a time
3. **Test thoroughly** - Property-based tests for critical functionality
4. **Maintain feature parity** - Ensure no functionality is lost
5. **Document differences** - Keep track of API changes and workarounds
6. **Performance monitoring** - Compare bundle sizes and load times
7. **Gradual rollout** - Consider feature flags for gradual migration
