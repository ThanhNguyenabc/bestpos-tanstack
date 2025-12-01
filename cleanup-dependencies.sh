#!/bin/bash

# Dependency Cleanup Script
# This script removes unused dependencies identified in the audit

echo "🔍 Starting dependency cleanup..."
echo ""

# Remove unused dependencies
echo "📦 Removing unused dependencies..."
npm uninstall i18next-http-backend motion next-themes web-vitals

# Remove unused file
echo "🗑️  Removing unused webVitals file..."
rm -f src/utils/webVitals.ts

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Summary:"
echo "  - Removed: i18next-http-backend"
echo "  - Removed: motion"
echo "  - Removed: next-themes"
echo "  - Removed: web-vitals"
echo "  - Deleted: src/utils/webVitals.ts"
echo ""
echo "💾 Estimated savings: ~96 KB minified (~31 KB gzipped)"
echo ""
echo "🔧 Next steps:"
echo "  1. Run 'npm install' to update lock file"
echo "  2. Run 'npm run build' to verify build still works"
echo "  3. Consider replacing axios with fetch (see DEPENDENCY_AUDIT.md)"
echo ""
