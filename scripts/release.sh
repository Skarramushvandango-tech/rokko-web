#!/usr/bin/env bash
set -e

echo ""
echo "══════════════════════════════════════"
echo "  Rokko! Records — Release Script"
echo "══════════════════════════════════════"
echo ""

# 1. Wallpaper-Manifest aktualisieren
echo "▶  Wallpaper-Manifest wird generiert..."
node scripts/generate-wallpapers.cjs

# 2. TypeScript-Check (nur genutzte Dateien)
echo "▶  TypeScript wird geprüft..."
npx tsc --noEmit

# 3. Neu bauen
echo "▶  Build läuft..."
npm run build

# 4. Alles stagen
echo "▶  Änderungen werden gestaged..."
git add dist/ src/ index.html package.json tsconfig.json scripts/

# 5. Prüfen ob es überhaupt etwas zu committen gibt
if git diff --cached --quiet; then
  echo ""
  echo "✓  Nichts geändert – dist ist bereits aktuell."
  echo ""
  exit 0
fi

# 6. Commit mit Zeitstempel
DATUM=$(date "+%Y-%m-%d %H:%M")
git commit -m "build: release ${DATUM}"

echo ""
echo "✓  Fertig! Commit erstellt."
echo ""
echo "  Jetzt noch pushen und auf Netcup deployen:"
echo "  git push origin main"
echo ""
