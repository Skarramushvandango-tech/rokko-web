import { useEffect, useRef } from "react";
import type { Artist } from "../data/artists";

interface ArtistDropdownProps {
  artist: Artist;
  onClose: () => void;
  isVisible: boolean;
}

export default function ArtistDropdown({ artist, onClose, isVisible }: ArtistDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isVisible, artist.id]);

  if (!isVisible) return null;

  const { links } = artist;

  return (
    <>
      {/* Semi-transparent overlay behind page content below dropdown */}
      <div
        className="dropdown-overlay"
        onClick={onClose}
        style={{ zIndex: 5 }}
        data-testid="dropdown-overlay"
      />

      <div
        ref={ref}
        className="artist-dropdown dropdown-enter"
        style={{ position: "relative", zIndex: 10 }}
        data-testid={`dropdown-${artist.id}`}
      >
        <div className="dropdown-content">
          {/* Top row: artist image + name + right panel */}
          <div
            style={{ display: "flex", position: "relative", padding: "12px 12px 8px" }}
          >
            {/* Left: artist image + headline */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", flex: 1, minWidth: 0, paddingRight: "38%" }}>
              <div className="dropdown-artist-img" data-testid={`dropdown-img-${artist.id}`}>
                <img src={artist.image} alt={artist.name} />
              </div>
              <div className="dropdown-headline">
                <h3>{artist.nameH3}</h3>
                {artist.nameH1 && <h1>{artist.nameH1}</h1>}
              </div>
            </div>

            {/* Right panel: cover art + title + social icons */}
            <div className="dropdown-right-panel">
              {/* Background design element */}
              <div
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "6px",
                  bottom: "6px",
                  width: "39%",
                  border: "2px solid #580C03",
                  borderRadius: "8px",
                  background: "#000000",
                  zIndex: -1,
                }}
              />

              <div className="dropdown-cover-title">{artist.albumTitle}</div>

              <div className="dropdown-cover-wrapper">
                <img src={artist.cover} alt={`${artist.name} – ${artist.albumTitle}`} />
              </div>

              {/* Social media icons */}
              <div className="dropdown-social-icons">
                <div style={{ display: "flex", gap: "6px", alignItems: "center", justifyContent: "center" }}>
                  {/* Apple Music */}
                  {links.appleMusic ? (
                    <a
                      href={links.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-apple-${artist.id}`}
                      title="Apple Music"
                    >
                      <img
                        src="/assets/banners/socialmedia-icons.png"
                        alt="Apple Music"
                        style={{
                          width: "34px",
                          height: "34px",
                          objectFit: "cover",
                          objectPosition: "0% 50%",
                          borderRadius: "4px",
                        }}
                      />
                    </a>
                  ) : (
                    <div
                      title="Apple Music (nicht verfügbar)"
                      style={{
                        width: "34px",
                        height: "34px",
                        background: "#555",
                        borderRadius: "4px",
                        opacity: 0.4,
                      }}
                    />
                  )}

                  {/* Spotify */}
                  {links.spotify ? (
                    <a
                      href={links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-spotify-${artist.id}`}
                      title="Spotify"
                    >
                      <img
                        src="/assets/banners/socialmedia-icons.png"
                        alt="Spotify"
                        style={{
                          width: "34px",
                          height: "34px",
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                          borderRadius: "4px",
                        }}
                      />
                    </a>
                  ) : (
                    <div
                      title="Spotify (nicht verfügbar)"
                      style={{
                        width: "34px",
                        height: "34px",
                        background: "#555",
                        borderRadius: "4px",
                        opacity: 0.4,
                      }}
                    />
                  )}

                  {/* Amazon Music */}
                  {links.amazon ? (
                    <a
                      href={links.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-amazon-${artist.id}`}
                      title="Amazon Music"
                    >
                      <img
                        src="/assets/banners/socialmedia-icons.png"
                        alt="Amazon Music"
                        style={{
                          width: "34px",
                          height: "34px",
                          objectFit: "cover",
                          objectPosition: "100% 50%",
                          borderRadius: "4px",
                        }}
                      />
                    </a>
                  ) : (
                    <div
                      title="Amazon Music (nicht verfügbar)"
                      style={{
                        width: "34px",
                        height: "34px",
                        background: "#555",
                        borderRadius: "4px",
                        opacity: 0.4,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="dropdown-bio-section">
            {artist.bio}
          </div>

          {/* Close bar */}
          <button
            className="dropdown-close-bar"
            onClick={onClose}
            data-testid="dropdown-close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M4 14L10 6L16 14"
                stroke="#B81C09"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="dropdown-close-text">Dropdown Menü zuklappen</span>
          </button>
        </div>
      </div>
    </>
  );
}
