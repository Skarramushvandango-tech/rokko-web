import { useState, useRef, useCallback, useEffect } from "react";
import { ARTISTS } from "../data/artists";
import type { Artist } from "../data/artists";
import WallpaperPopup from "../components/WallpaperPopup";
import DSEModal from "../components/DSEModal";
import ImpressumModal from "../components/ImpressumModal";
import { asset } from "../utils/asset";

export default function Home() {
  const [openArtist, setOpenArtist] = useState<string | null>(null);
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [showDSE, setShowDSE] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [dropdownTop, setDropdownTop] = useState<number>(0);

  const selectedArtist: Artist | undefined = openArtist
    ? ARTISTS.find((a) => a.id === openArtist)
    : undefined;

  const handleArtistClick = useCallback(
    (id: string) => {
      if (openArtist === id) {
        setOpenArtist(null);
        return;
      }
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setDropdownTop(rect.bottom);
      }
      setOpenArtist(id);
    },
    [openArtist],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="rokko-page">

      {/* HEADER VIDEO */}
      <div className="video-header-container" data-testid="header-video">
        <video
          ref={videoRef}
          src={asset("/assets/videos/header.mp4")}
          autoPlay
          playsInline
          muted
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          onEnded={(e) => { (e.target as HTMLVideoElement).pause(); }}
        />
        <div className="video-overlay" />
      </div>

      {/* ARTISTS SECTION */}
      <div className="artists-section">
        <div className="artists-label" data-testid="text-artists-label">artists</div>
        <div className="artist-grid" ref={gridRef} data-testid="artist-grid">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className={`artist-tile${openArtist === artist.id ? " active" : ""}`}
              onClick={() => handleArtistClick(artist.id)}
              data-testid={`artist-tile-${artist.id}`}
              role="button"
              tabIndex={0}
              aria-label={`Artist: ${artist.name}`}
              onKeyDown={(e) => e.key === "Enter" && handleArtistClick(artist.id)}
            >
              <img src={artist.image} alt={artist.name} loading="lazy" decoding="async" />
              <div className="artist-tile-label">
                {artist.nameH1
                  ? <><span className="tile-sub">{artist.nameH3.toUpperCase()}</span><span className="tile-main">{artist.nameH1.toUpperCase()}</span></>
                  : <span className="tile-main">{artist.nameH3.toUpperCase()}</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WIR SIND ROKKO BANNER */}
      <div className="wirsindrokko-wrap">
        <img
          src={asset("/assets/banners/wirsindrokko.png")}
          alt="Wir sind Rokko!"
          data-testid="img-wirsindrokko"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* DARK SECTION: Merch + Social */}
      <div className="dark-section">
        <div className="merch-wallpaper-row">
          <a
            href="https://rokko-records-klumpatsch.myspreadshop.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="merch-link"
            data-testid="link-merch"
          >
            <img src={asset("/assets/banners/merchbutton.png")} alt="Rokko! Merchandise – Shop Now" loading="lazy" decoding="async" />
          </a>
          <div className="wallpaper-link-wrap">
            <img
              src={asset("/assets/banners/wallpaperlinks.png")}
              alt="Wallpaper"
              onClick={() => setShowWallpaper(true)}
              data-testid="button-wallpaper"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="social-bar-container" data-testid="social-bar">
          <img src={asset("/assets/banners/bigsocialbar.png")} alt="Rokko! Social Media" loading="lazy" decoding="async" />
          <div className="social-bar-links">
            <a href="https://www.instagram.com/rokko_records?igsh=MTdlbWhxbmtxdmVxeA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" data-testid="link-instagram" aria-label="Instagram" />
            <a href="https://www.facebook.com/share/1Ee1dBz3bM/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" data-testid="link-facebook" aria-label="Facebook" />
            <div style={{ flex: 1 }} />
            <a href="https://www.tiktok.com/@rokkorecords" target="_blank" rel="noopener noreferrer" data-testid="link-tiktok" aria-label="TikTok" />
            <a href="https://on.soundcloud.com/1Q1ox485CwP763IkLs" target="_blank" rel="noopener noreferrer" data-testid="link-soundcloud" aria-label="SoundCloud" />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="site-footer">
        <button className="footer-link" onClick={() => setShowDSE(true)}>Datenschutz</button>
        <span className="footer-sep">·</span>
        <button className="footer-link" onClick={() => setShowImpressum(true)}>Impressum</button>
      </div>

      {/* DROPDOWN OVERLAY */}
      {selectedArtist && (
        <>
          <div
            className="dropdown-overlay"
            style={{ top: `${dropdownTop}px` }}
            onClick={() => setOpenArtist(null)}
            data-testid="dropdown-overlay"
          />
          <div
            className="dropdown-fixed"
            style={{ top: `${dropdownTop}px` }}
            data-testid={`dropdown-${selectedArtist.id}`}
          >
            <div className="dropdown-inner">
              {/* LEFT COLUMN: artist image + headline + bio */}
              <div className="dd-col-left">
                <div className="dd-top-row">
                  <div className="dd-artist-img">
                    <img src={selectedArtist.image} alt={selectedArtist.name} loading="lazy" decoding="async" />
                  </div>
                  <div className="dd-headline">
                    <div className="dd-h3">{selectedArtist.nameH3}</div>
                    {selectedArtist.nameH1 && <div className="dd-h1">{selectedArtist.nameH1}</div>}
                  </div>
                </div>
                <div className="dd-bio">{selectedArtist.bio}</div>
              </div>

              {/* RIGHT COLUMN: cover + social */}
              <div className="dd-right">
                <div className="dd-bg-frame" />
                <div className="dd-cover-title">{selectedArtist.albumTitle}</div>
                <div className="dd-cover-img">
                  <img src={selectedArtist.cover} alt={selectedArtist.albumTitle} loading="lazy" decoding="async" />
                </div>
                <div className="dd-social-row">
                  {selectedArtist.links.appleMusic
                    ? <a href={selectedArtist.links.appleMusic} target="_blank" rel="noopener noreferrer" data-testid={`link-apple-${selectedArtist.id}`} className="dd-social-icon"><img src={asset("/assets/banners/socialmedia-icons.png")} alt="Apple Music" className="dd-icon-slice dd-icon-apple" /></a>
                    : <span className="dd-social-icon dd-icon-inactive" />
                  }
                  {selectedArtist.links.spotify
                    ? <a href={selectedArtist.links.spotify} target="_blank" rel="noopener noreferrer" data-testid={`link-spotify-${selectedArtist.id}`} className="dd-social-icon"><img src={asset("/assets/banners/socialmedia-icons.png")} alt="Spotify" className="dd-icon-slice dd-icon-spotify" /></a>
                    : <span className="dd-social-icon dd-icon-inactive" />
                  }
                  {selectedArtist.links.amazon
                    ? <a href={selectedArtist.links.amazon} target="_blank" rel="noopener noreferrer" data-testid={`link-amazon-${selectedArtist.id}`} className="dd-social-icon"><img src={asset("/assets/banners/socialmedia-icons.png")} alt="Amazon Music" className="dd-icon-slice dd-icon-amazon" /></a>
                    : <span className="dd-social-icon dd-icon-inactive" />
                  }
                </div>
              </div>
            </div>

            <button className="dd-close-bar" onClick={() => setOpenArtist(null)} data-testid="dropdown-close">
              <span className="dd-close-tab">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M4 14L10 6L16 14" stroke="#B81C09" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>zuklappen</span>
              </span>
            </button>
          </div>
        </>
      )}

      {showWallpaper && <WallpaperPopup onClose={() => setShowWallpaper(false)} />}
      {showDSE && <DSEModal onClose={() => setShowDSE(false)} />}
      {showImpressum && <ImpressumModal onClose={() => setShowImpressum(false)} />}
    </div>
  );
}
