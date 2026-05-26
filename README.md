
# Rokko! Records — Website

Offizielle Website von **Rokko! Records**. Gebaut mit React + Vite, deployed via GitHub Pages.

---

## Technischer Stack

- **Framework:** React 19 + TypeScript
- **Build-Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Routing:** Wouter
- **Deploy:** GitHub Pages (automatisch via GitHub Actions)

---

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Die Seite läuft dann unter `http://localhost:3000`.

---

## Produktions-Build

```bash
BASE_PATH=/rokko-web/ NODE_ENV=production npm run build
```

Output landet in `dist/public/` — genau das lädt GitHub Actions hoch.

---

## Deployment (GitHub Pages)

Der Deploy läuft automatisch bei jedem Push auf `main`.

**Kritische Einstellungen in `.github/workflows/static.yml`:**

```yaml
env:
  BASE_PATH: /rokko-web/
  NODE_ENV: production
```

> `BASE_PATH` **muss** exakt `/rokko-web/` sein — mit führendem und abschließendem Slash.
> Alle Asset-Pfade im Code verwenden die `asset()`-Hilfsfunktion aus `src/utils/asset.ts`, die diesen Prefix automatisch voranstellt.

---

## Wichtige Konventionen

### Asset-Pfade

Alle Bild- und Medienpfade **müssen** über die `asset()`-Funktion aufgelöst werden:

```ts
import { asset } from "../utils/asset";

// Richtig:
const url = asset("/assets/banners/beispiel.png");

// Falsch — bricht auf GitHub Pages:
const url = "/assets/banners/beispiel.png";
```

### Neue Künstler hinzufügen

1. Künstlerbild in `public/assets/artist-images/` legen (Format: `name-pop.png`)
2. Cover-Artwork in `public/assets/coverartwork/` legen (Format: `name-cover.png`)
3. Eintrag in `src/data/artists.ts` ergänzen

### Video-Header

Das Header-Video liegt unter `public/assets/videos/header.mp4`.
Es startet automatisch stumm. Der Ton-Button unten rechts im Video schaltet den Ton um.

---

## Projektstruktur

```
rokko-web/
├── public/
│   └── assets/
│       ├── artist-images/     Künstler-Fotos (PNG)
│       ├── banners/           Banner & UI-Grafiken (PNG)
│       ├── coverartwork/      Album-Cover (PNG)
│       ├── videos/            Header-Video (MP4)
│       └── wallpaper/         Downloadbare Wallpapers (PNG)
├── src/
│   ├── components/
│   │   ├── ArtistDropdown.tsx  Künstler-Klappmenu (Fallback-Komponent)
│   │   └── WallpaperPopup.tsx  Wallpaper-Download-Popup
│   ├── data/
│   │   └── artists.ts          Alle Künstler-Daten (hier pflegen)
│   ├── pages/
│   │   └── Home.tsx            Hauptseite
│   ├── utils/
│   │   └── asset.ts            Asset-Pfad-Hilfsfunktion (nicht anfassen)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               Alle Styles
├── .github/
│   └── workflows/
│       └── static.yml          GitHub Actions Deploy-Konfiguration
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Bekannte Einschränkungen

- Die Seite ist für mobile Hochformat ausgelegt (max. 480px Breite).
- Im Querformat / auf Desktop wird die Breite auf `min(520px, 67dvh)` begrenzt.
- Das Header-Video pausiert automatisch am Ende (kein Loop).
