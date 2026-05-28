import { useEffect } from "react";

const PLAYLIST_ID = "6GBZNBRcta3DF6MCU5cVAP";
const COVER_URL = "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8464c9611ed07d1be704bb738d";
const PLAYER_URL = `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`;

interface Props {
  onClose: () => void;
}

export default function ReleasesPopup({ onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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
        <img
          className="releases-popup-cover"
          src={COVER_URL}
          alt="ROKKO! Releases Cover"
          loading="lazy"
          decoding="async"
        />
        <div className="releases-popup-title-wrap">
          <div className="releases-popup-title">ROKKO!</div>
          <div className="releases-popup-subtitle">Releases</div>
        </div>
        <iframe
          src={PLAYER_URL}
          title="Rokko! Records Spotify Playlist"
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="releases-popup-player"
        />
      </div>
    </div>
  );
}
