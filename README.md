# Rokko! Records — Regeln für Entwickler

---

## ⛔ FÜR KI-AGENTEN (Replit Agent, Claude, GPT, etc.)

**NIEMALS `dist/` direkt bearbeiten, neu bauen oder committen.**

`dist/` steht in `.gitignore` — es wird NICHT in git getrackt.
GitHub Pages baut bei jedem Push auf `main` automatisch neu (mit `BASE_PATH=/rokko-web/`).
Ein manueller Build ohne diese Variable erzeugt eine kaputte Seite mit 404-Fehlern.

### Was du als Agent NICHT tun darfst:
- `npm run build` / `pnpm run build` ausführen und das Ergebnis committen
- Dateien in `dist/` direkt bearbeiten oder löschen
- `.gitignore` ändern um `dist/` wieder zu tracken

### Was du stattdessen tust:
- Nur `src/`, `index.html`, `public/`, `scripts/`, `package.json`, `tsconfig.json` bearbeiten
- Änderungen committen — GitHub Actions übernimmt Build + Deploy automatisch

---

## Absolute Verbote (niemals ändern)

1. **::before Pseudo-Elemente**
   - NIE `::before` oder `::after` auf `.artists-section` oder `.artist-grid` hinzufügen.
   - Diese erzeugen rote/schwarze Balken.

2. **wirsindrokko.png Abstand**
   - NIE den Abstand unter `wirsindrokko.png` entfernen oder verändern.
   - `padding-bottom: var(--section-gap)` (15dvh) auf `.wirsindrokko-img` MUSS erhalten bleiben.

3. **Video-Header**
   - NIE Loop, Controls oder Play-Button zum Video-Header hinzufügen.
   - Kein `controls`, kein `loop`, kein `muted` entfernen.

4. **Artist-Popups**
   - NUR Spotify, Apple Music, Amazon in den Streaming-Links.
   - KEINE SoundCloud, Beatport, YouTube, TikTok, Facebook Links.

---

## Deployment

### GitHub Pages (automatisch)

Bei jedem Push auf `main` baut GitHub Actions die Seite neu und deployed sie automatisch.
URL: https://skarramushvandango-tech.github.io/rokko-web/

### FTP-Deployment (Netcup) — SO GEHT ES RICHTIG

**Häufigster Fehler (führt zu weißer Seite):** Es wird der **Quellcode** hochgeladen
statt des **gebauten `dist/`-Ordners**. Wenn auf dem Server eine `index.html` mit
`<script src="/src/main.tsx">` landet, sieht der Browser nur eine weiße Seite —
denn `.tsx` kann der Browser nicht laden. Es MÜSSEN die gebauten Dateien hoch.

**Richtiger Weg (empfohlen — kein lokaler Build nötig):**
1. Auf GitHub unter *Releases* → **"Aktueller Build (Netcup)"** die `dist.zip` herunterladen.
   (Wird bei jedem Push auf `main` automatisch mit **relativen Pfaden** neu gebaut.)
2. ZIP entpacken.
3. **Den INHALT** des entpackten Ordners (`index.html`, `assets/`, `favicon.png` …)
   per FTP ins Webroot von Netcup laden — NICHT die ZIP selbst, NICHT den `src/`-Ordner.
4. Browser-Cache leeren (Strg+Shift+R).

**Wichtig — RELATIVE Pfade:** Die Netcup-ZIP wird mit `BASE_PATH=./` gebaut, die
`index.html` referenziert `./assets/...`. Damit läuft die Seite im Webroot UND in
jedem Unterordner. Niemals mit `BASE_PATH=/` für Netcup bauen (absolute Pfade brechen
in Unterordnern).

### WICHTIG

- `dist/` ist in `.gitignore` — NIEMALS in git committen
- Nur `src/`, Configs und `public/` gehören in git
- `node_modules/` ebenfalls NICHT in git
