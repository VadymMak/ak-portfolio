#!/bin/bash
# update-dark-mode.sh
# Run from project root: bash update-dark-mode.sh

echo "🌓 Updating CSS files for dark mode support..."

# ========== 1. Fix variables.css — remove color conflicts with theme ==========
echo "📝 Updating variables.css..."
cat > src/styles/variables.css << 'VAREOF'
/* ============================================
   AK Portfolio v2 — Design Tokens
   Non-color tokens: fonts, spacing, layout, etc.
   Colors are defined in globals.css theme variables.
   ============================================ */
:root {
  /* Typography */
  --font-heading: 'Cormorant Garamond', 'Georgia', serif;
  --font-body: 'Montserrat', 'Helvetica Neue', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;
  --font-size-5xl: 3.5rem;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  --space-5xl: 8rem;

  /* Layout */
  --max-width-portfolio: 1400px;
  --max-width-blog-list: 960px;
  --max-width-blog-post: 760px;
  --header-height: 80px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

  /* Z-index scale */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-chat: 500;
  --z-toast: 600;

  /* Legacy aliases (for compatibility) */
  --color-error: #C53030;
  --color-success: #2F855A;
}
VAREOF

# ========== 2. Fix globals.css transition bug ==========
echo "📝 Fixing globals.css..."

# Fix garbled transition characters
sed -i.bak 's/transition:å/transition:/g' src/styles/globals.css
sed -i.bak 's/color 0.35s ease,å/color 0.35s ease,/g' src/styles/globals.css
sed -i.bak 's/border-color 0.35s ease;åç/border-color 0.35s ease;/g' src/styles/globals.css

# Fix body background
sed -i.bak 's/background-color: #2d4a43;/background-color: var(--color-bg);/g' src/styles/globals.css

# Fix heading colors
sed -i.bak 's/color: var(--color-dark-green);/color: var(--color-theme);/g' src/styles/globals.css

# Fix link colors
sed -i.bak 's/color: var(--color-soft-green);/color: var(--color-theme-light);/g' src/styles/globals.css

# Fix scrollbar
sed -i.bak 's/background: var(--color-warm-beige);/background: var(--color-bg);/g' src/styles/globals.css

# Fix selection
sed -i.bak 's/background-color: var(--color-soft-green);/background-color: var(--color-theme-light);/g' src/styles/globals.css
sed -i.bak 's/color: var(--color-white);/color: var(--color-text-inverse);/g' src/styles/globals.css

# ========== 3. Update ALL CSS module files ==========
echo "📝 Updating CSS module files..."

# List of all CSS files to update
CSS_FILES=$(find src -name "*.module.css" -type f)

for file in $CSS_FILES; do
  echo "  → $file"

  # ---- GREEN BACKGROUNDS ----
  # Dark green backgrounds
  sed -i.bak 's/background-color: #2D4A43/background-color: var(--color-theme)/gi' "$file"
  sed -i.bak 's/background-color: #2d4a43/background-color: var(--color-theme)/g' "$file"
  sed -i.bak 's/background: #2D4A43/background: var(--color-theme)/gi' "$file"
  sed -i.bak 's/background: #2d4a43/background: var(--color-theme)/g' "$file"

  # Soft green backgrounds
  sed -i.bak 's/background-color: #5A7A70/background-color: var(--color-theme-light)/gi' "$file"
  sed -i.bak 's/background: #5A7A70/background: var(--color-theme-light)/gi' "$file"

  # ---- BEIGE BACKGROUNDS ----
  sed -i.bak 's/background-color: #F5EFE6/background-color: var(--color-bg)/gi' "$file"
  sed -i.bak 's/background-color: #f5efe6/background-color: var(--color-bg)/g' "$file"
  sed -i.bak 's/background: #F5EFE6/background: var(--color-bg)/gi' "$file"
  sed -i.bak 's/background: #f5efe6/background: var(--color-bg)/g' "$file"

  sed -i.bak 's/background-color: #F9F6F0/background-color: var(--color-bg)/gi' "$file"
  sed -i.bak 's/background-color: #f9f6f0/background-color: var(--color-bg)/g' "$file"
  sed -i.bak 's/background: #F9F6F0/background: var(--color-bg)/gi' "$file"
  sed -i.bak 's/background: #f9f6f0/background: var(--color-bg)/g' "$file"

  sed -i.bak 's/background-color: #FEFCF8/background-color: var(--color-bg-alt)/gi' "$file"
  sed -i.bak 's/background-color: #fefcf8/background-color: var(--color-bg-alt)/g' "$file"
  sed -i.bak 's/background: #FEFCF8/background: var(--color-bg-alt)/gi' "$file"
  sed -i.bak 's/background: #fefcf8/background: var(--color-bg-alt)/g' "$file"

  # White backgrounds
  sed -i.bak 's/background-color: #FFFFFF/background-color: var(--color-surface)/gi' "$file"
  sed -i.bak 's/background-color: #ffffff/background-color: var(--color-surface)/g' "$file"
  sed -i.bak 's/background-color: #fff/background-color: var(--color-surface)/g' "$file"
  sed -i.bak 's/background: #FFFFFF/background: var(--color-surface)/gi' "$file"
  sed -i.bak 's/background: #fff;/background: var(--color-surface);/g' "$file"
  sed -i.bak 's/background: white/background: var(--color-surface)/g' "$file"

  # ---- TEXT COLORS ----
  # Dark green text
  sed -i.bak 's/color: #2D4A43/color: var(--color-theme)/gi' "$file"
  sed -i.bak 's/color: #2d4a43/color: var(--color-theme)/g' "$file"

  # Soft green text
  sed -i.bak 's/color: #5A7A70/color: var(--color-theme-light)/gi' "$file"
  sed -i.bak 's/color: #5a7a70/color: var(--color-theme-light)/g' "$file"

  # Brown text (header title, logo)
  sed -i.bak 's/color: #8b5a3c/color: var(--color-theme)/g' "$file"
  sed -i.bak 's/color: #8B5A3C/color: var(--color-theme)/gi' "$file"

  # Dark text
  sed -i.bak 's/color: #3a3a3a/color: var(--color-text)/g' "$file"
  sed -i.bak 's/color: #333/color: var(--color-text)/g' "$file"

  # Light/beige text on dark backgrounds
  sed -i.bak 's/color: #F9F6F0/color: var(--color-text-inverse)/gi' "$file"
  sed -i.bak 's/color: #f9f6f0/color: var(--color-text-inverse)/g' "$file"
  sed -i.bak 's/color: #F5EFE6/color: var(--color-text-inverse)/gi' "$file"
  sed -i.bak 's/color: #f5efe6/color: var(--color-text-inverse)/g' "$file"

  # Muted text
  sed -i.bak 's/color: #999/color: var(--color-text-muted)/g' "$file"
  sed -i.bak 's/color: #666/color: var(--color-text-secondary)/g' "$file"
  sed -i.bak 's/color: #888/color: var(--color-text-muted)/g' "$file"
  sed -i.bak 's/color: #777/color: var(--color-text-secondary)/g' "$file"

  # ---- BORDERS ----
  sed -i.bak 's/border-color: #D4DCD8/border-color: var(--color-border)/gi' "$file"
  sed -i.bak 's/border-color: #d4dcd8/border-color: var(--color-border)/g' "$file"

  sed -i.bak 's/border: 1px solid rgba(212, 196, 168, 0.5)/border: 1px solid var(--color-border)/g' "$file"
  sed -i.bak 's/border: 1px solid rgba(212, 196, 168, 0.3)/border: 1px solid var(--color-border)/g' "$file"

  sed -i.bak 's/border-bottom: 1px solid rgba(212, 196, 168, 0.5)/border-bottom: 1px solid var(--color-border)/g' "$file"
  sed -i.bak 's/border-bottom: 1px solid rgba(212, 196, 168, 0.3)/border-bottom: 1px solid var(--color-border)/g' "$file"

  # ---- LEGACY VAR REFERENCES ----
  sed -i.bak 's/var(--color-dark-green)/var(--color-theme)/g' "$file"
  sed -i.bak 's/var(--color-soft-green)/var(--color-theme-light)/g' "$file"
  sed -i.bak 's/var(--color-warm-beige)/var(--color-bg)/g' "$file"
  sed -i.bak 's/var(--color-light-beige)/var(--color-bg-alt)/g' "$file"
  sed -i.bak 's/var(--color-white)/var(--color-surface)/g' "$file"
  sed -i.bak 's/var(--color-accent)/var(--color-theme)/g' "$file"
  sed -i.bak 's/var(--color-text-light)/var(--color-theme-light)/g' "$file"

  # ---- BOX SHADOWS (update legacy) ----
  sed -i.bak 's/var(--shadow-sm)/var(--shadow-sm)/g' "$file"

done

# ========== 4. Also fix globals.css legacy vars ==========
sed -i.bak 's/var(--color-dark-green)/var(--color-theme)/g' src/styles/globals.css
sed -i.bak 's/var(--color-soft-green)/var(--color-theme-light)/g' src/styles/globals.css
sed -i.bak 's/var(--color-warm-beige)/var(--color-bg)/g' src/styles/globals.css
sed -i.bak 's/var(--color-light-beige)/var(--color-bg-alt)/g' src/styles/globals.css
sed -i.bak 's/var(--color-white)/var(--color-surface)/g' src/styles/globals.css

# ========== 5. Clean up .bak files ==========
echo "🧹 Cleaning up backup files..."
find src -name "*.bak" -delete

echo ""
echo "✅ Dark mode CSS update complete!"
echo "📋 Updated files:"
echo "$CSS_FILES" | while read f; do echo "   ✓ $f"; done
echo "   ✓ src/styles/variables.css"
echo "   ✓ src/styles/globals.css"
echo ""
echo "🔍 Next: run 'pnpm dev' and test the toggle!"