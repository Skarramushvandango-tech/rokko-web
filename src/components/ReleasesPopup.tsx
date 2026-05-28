import { useEffect, useState } from "react";
import { ARTISTS } from "../data/artists";

const PLAYLIST_ID = "6GBZNBRcta3DF6MCU5cVAP";
const FALLBACK_COVER = "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8464c9611ed07d1be704bb738d";
const PLAYER_URL = `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`;
const RELEASES_JSON_URL =
  "https://raw.githubusercontent.com/Skarramushvandango-tech/rokko-web/main/data/releases.json";

interface Props {
  onClose: () => void;
  onSelectArtist?: (id: string) => void;
}

interface RemoteArtist {
  id: string;
  name: string;
  cover: string | null;
  spotifyUrl: string | null;
  latestTrack?: { id: string; name: string; url: string | null };
}

interface ReleasesData {
  updated: string;
  playlist: { id: string; name: string; cover: string | null; url: string | null };
  artistCount: number;
  trackCount: number;
  artists: RemoteArtist[];
}

// Map known Spotify artist IDs → local artist IDs so clicking opens the artist dropdown
const SPOTIFY_TO_LOCAL: Record<string, string> = {
  "0XabsS6hlubIfQTtJ5ZTkU": "sukram",
  "3TJ6OTJwduYPDW1MBwDnSd": "fleur-beunie",
};

function buildFallbackArtists(): RemoteArtist[] {
  return ARTISTS.map((a) => ({
    id: a.id,
    name: a.nameH3 || a.name,
    cover: a.cover,
    spotifyUrl: a.links.spotify || null,
  }));
}

export default function ReleasesPopup({ onClose, onSelectArtist }: Props) {
  const [data, setData] = useState<ReleasesData | null>(null);
  const [artists, setArtists] = useState<RemoteArtist[]>(buildFallbackArtists());

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    const url = `${RELEASES_JSON_URL}?t=${Math.floor(Date.now() / 60000)}`;
    fetch(url, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: ReleasesData | null) => {
        if (cancelled || !j || !Array.isArray(j.artists) || j.artists.length === 0) return;
        setData(j);
        setArtists(j.artists);
      })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);

  const handleArtistClick = (a: RemoteArtist) => {
    const localId = SPOTIFY_TO_LOCAL[a.id] || (ARTISTS.find((x) => x.id === a.id)?.id ?? null);
    if (localId && onSelectArtist) {
      onSelectArtist(localId);
      onClose();
      return;
    }
    if (a.spotifyUrl) {
      window.open(a.spotifyUrl, "_blank", "noopener,noreferrer");
    }
  };

  const cover = data?.playlist.cover || FALLBACK_COVER;

  return (
    <div
      className="releases-popup-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="ROKKO! Releases Playlist"
      data-testid="releases-popup-overlay"
    >
      <div className="releases-popup" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="releases-popup-close"
          onClick={onClose}
          aria-label="Popup schließen"
          data-testid="button-releases-close"
        >
          ✕
        </button>
        <div className="releases-popup-title-wrap">
          <div className="releases-popup-title">ROKKO!</div>
          <div className="releases-popup-subtitle">Releases</div>
        </div>
        <iframe
          src={PLAYER_URL}
          title="Rokko! Records Spotify Playlist"
          width="100%"
          height="420"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="releases-popup-player"
        />

        <div className="releases-popup-divider">
          <span>Künstler ({artists.length})</span>
        </div>

        <div className="releases-popup-artist-scroll" data-testid="releases-artist-scroll">
          <div className="releases-popup-artist-grid">
            {artists.map((a) => (
              <button
                key={a.id}
                type="button"
                className="releases-popup-artist"
                onClick={() => handleArtistClick(a)}
                data-testid={`releases-artist-${a.id}`}
                aria-label={`${a.name} öffnen`}
              >
                {a.cover ? (
                  <img src={a.cover} alt={a.name} loading="lazy" decoding="async" />
                ) : (
                  <div className="releases-popup-artist-placeholder">{a.name.charAt(0)}</div>
                )}
                <div className="releases-popup-artist-name">{a.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
