#!/usr/bin/env bash
set -e

echo ""
echo "══════════════════════════════════════"
echo "  Rokko! Records — Release Script"
echo "══════════════════════════════════════"
echo ""

echo "▶  Wallpaper-Manifest wird generiert..."
node scripts/generate-wallpapers.cjs

echo "▶  TypeScript wird geprueft..."
npx tsc --noEmit

echo "▶  Lokaler Build laeuft (dist/ bleibt LOKAL)..."
npm run build

echo ""
echo "✓  Build fertig — dist/ ist lokal aktuell."
echo ""
echo "  WICHTIG: dist/ ist in .gitignore — wird NICHT committed."
echo "  GitHub Pages baut bei jedem Push auf main automatisch neu."
echo "  Fuer manuelles FTP: dist/ direkt hochladen."
echo ""

# Nur Quellcode stagen
echo "▶  Quellcode-Aenderungen stagen..."
echo "  (KEIN dist/ — ist via .gitignore ausgeschlossen)"
