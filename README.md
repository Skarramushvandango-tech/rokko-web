# Rokko! Records — Regeln für Entwickler

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

## Deployment (auf den Server laden)

### Was du brauchst

- `dist.zip` (die Datei, die ich dir gebe)
- Einen FTP-Client (z.B. FileZilla) oder WinSCP
- Zugangsdaten zu deinem Netcup-Server

### Schritt-für-Schritt

1. **dist.zip entpacken** auf deinem Computer
   - Die ZIP enthält einen Ordner namens `dist/`
   - Der `dist/` Ordner hat diese Struktur:
     ```
     dist/
     ├── index.html          <- Die Startseite
     ├── favicon.png         <- Browser-Icon
     ├── favicon.svg         <- Browser-Icon (SVG)
     ├── opengraph.jpg       <- Bild für Social Media
     ├── robots.txt          <- Für Google
     ├── sitemap.xml         <- Für Google
     └── assets/
         ├── index-XXXXXX.js   <- JavaScript (komprimiert)
         ├── index-XXXXXX.css  <- CSS (komprimiert)
         ├── videos/
         │   └── header.mp4  <- Header-Video
         ├── artist-images/     <- 8 Artist-Bilder
         ├── banners/           <- 7 Banner-Bilder
         ├── coverartwork/      <- 8 Cover-Bilder
         └── wallpaper/         <- 6 Wallpaper-Bilder
     ```

2. **Mit dem Server verbinden**
   - FTP-Client öffnen (FileZilla, WinSCP, oder WebFTP von Netcup)
   - Server-Adresse, Benutzername, Passwort eingeben
   - Verbinden

3. **Dateien hochladen**
   - **ALLE** Dateien und Ordner aus dem `dist/` Ordner hochladen
   - **Wichtig**: Nicht nur die index.html — alle Unterordner (`assets/videos/`, `assets/artist-images/`, etc.) müssen mit hoch
   - Ziel: Das Hauptverzeichnis (root) deiner Webseite

4. **Fertig**
   - Die Seite ist sofort live
   - Browser-Cache leeren (Strg+Shift+R oder Cmd+Shift+R) und neu laden

### WICHTIG

- **NIE** die `src/` oder `node_modules/` Ordner hochladen — nur der `dist/` Ordner
- **NIE** die ZIP-Datei selbst auf den Server laden — nur den entpackten Inhalt
- **NIE** die Dateien aus dem falschen Ordner laden — es muss der `dist/` Ordner sein
