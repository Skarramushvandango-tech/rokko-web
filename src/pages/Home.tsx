import { useState, useRef, useCallback, useEffect } from "react";
import { ARTISTS } from "../data/artists";
import type { Artist } from "../data/artists";
import WallpaperPopup from "../components/WallpaperPopup";
import DSEModal from "../components/DSEModal";
import ImpressumModal from "../components/ImpressumModal";
import { asset } from "../utils/asset";

function IconApple() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function IconSpotify() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

function IconAmazon() {
  return (
    <svg width="12" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.958 10.09c0 1.232.029 2.256-.59 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.698-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.047-.872-1.234-1.276-1.813-2.106-1.733 1.767-2.96 2.295-5.206 2.295-2.658 0-4.725-1.641-4.725-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.761 4.11-.895 5.944-1.104v-.41c0-.754.06-1.644-.384-2.295-.385-.581-1.128-.82-1.784-.82-1.214 0-2.292.622-2.556 1.913-.054.285-.265.567-.556.58l-3.117-.335c-.263-.06-.555-.271-.48-.672C5.494 2.026 8.27 1 10.769 1c1.275 0 2.945.341 3.952 1.307C15.94 3.571 15.74 5.29 15.74 7.153v4.187c0 1.259.521 1.812 1.012 2.492.173.24.211.529-.009.708l-1.599 1.255zm3.56 2.375c-2.578 1.758-6.318 2.692-9.537 2.692-4.512 0-8.572-1.668-11.642-4.441-.241-.218-.026-.515.264-.346 3.312 1.928 7.404 3.087 11.632 3.087 2.851 0 5.987-.592 8.876-1.818.436-.185.801.285.407.826zm1.01-1.151c-.33-.422-2.178-.2-3.01-.101-.252.031-.291-.189-.064-.347 1.474-.104 3.896-.295 4.369.332.475.629-.123 2.993-.454 4.158-.066.229-.25.322-.441.162-.479-.413-.963-1.326-1.4-1.204z"/>
    </svg>
  );
}

export default function Home() {
  const [openArtist, setOpenArtist] = useState<string | null>(null);
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [showDSE, setShowDSE] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [dropdownTop, setDropdownTop] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoFullscreen, setShowVideoFullscreen] = useState(false);
  const videoNewsRef = useRef<HTMLVideoElement>(null);

  const selectedArtist: Artist | undefined = openArtist
    ? ARTISTS.find((a) => a.id === openArtist)
    : undefined;

  const handleArtistClick = useCallback(
    (id: string) => {
      if (openArtist === id) { setOpenArtist(null); return; }
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setDropdownTop(rect.bottom);
      }
      setOpenArtist(id);
    },
    [openArtist],
  );

  const handleMuteToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.muted = false;
      video.currentTime = 0;
      video.play().catch(() => {});
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (openArtist || showWallpaper) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [openArtist, showWallpaper]);

  return (
    <div className="rokko-page">

      {/* SEO: Für Google lesbar, visuell versteckt */}
      <div className="seo-only">
        <h1>Rokko! Records – Unabhängiges Musiklabel</h1>
        <p>Rokko! Records ist ein unabhängiges Musiklabel aus Deutschland mit Künstlern aus den Bereichen Indie, Rock, Electronic, Pop und House.</p>
        <section>
          <h2>Unsere Künstler</h2>
          {ARTISTS.map((artist) => (
            <article key={artist.id}>
              <h3>{artist.name}</h3>
              <p>{artist.bio}</p>
              <p>Aktuelles Release: {artist.albumTitle}</p>
            </article>
          ))}
        </section>
      </div>

      {/*
        HEADER VIDEO — NICHT AENDERN — DAUERHAFT FESTGELEGT:
        1. Video laeuft EINMAL durch und stoppt (onEnded pause) — kein loop
        2. KEIN Play-Button, KEIN Stop-Button, KEINE controls
        3. loop-Attribut wird NIE hinzugefuegt
        4. controls-Attribut wird NIE hinzugefuegt
        5. unmute-Button ist KEIN Play-Button — bleibt unveraendert
      */}
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
        <button
          className="unmute-btn"
          onClick={handleMuteToggle}
          data-testid="button-unmute"
          aria-label={isMuted ? "Ton einschalten" : "Ton ausschalten"}
        >
          {isMuted ? "🔇 Ton an" : "🔊 Ton aus"}
        </button>
      </div>

      {/* ARTISTS SECTION */}
      <div className="artists-section">
        <img
          src={asset("/assets/banners/artists.png")}
          alt="artists"
          className="artists-label-img"
          loading="eager"
          decoding="async"
          data-testid="text-artists-label"
        />
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
              <img src={artist.image} alt={artist.name} loading="lazy" decoding="async" style={{ objectPosition: artist.imgPosition }} />
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

      {/* WIR SIND ROKKO */}
      <div className="wirsindrokko-wrap">
        <img
          src={asset("/assets/banners/wirsindrokko.png")}
          alt="Wir sind Rokko!"
          data-testid="img-wirsindrokko"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* SHOP STRIP: DIGITAL + VINYL */}
      <div className="shop-strip">
        <a
          href="https://open.spotify.com/playlist/6GBZNBRcta3DF6MCU5cVAP"
          target="_blank"
          rel="noopener noreferrer"
          className="shop-strip-item"
          data-testid="link-digitalshop"
        >
          <img src={asset("/assets/banners/digitalshop.png")} alt="Digital Releases" loading="lazy" decoding="async" />
        </a>
        <div className="shop-strip-item">
          <img src={asset("/assets/banners/vinylshop.png")} alt="Vinyl Shop – kommt bald" loading="lazy" decoding="async" />
        </div>
      </div>

      {/* NEWS SECTION */}
      <div className="news-section">
        <span className="news-section-label">News</span>
        <div className="news-content-row">
          <div className="news-video-wrap">
            <div className="news-frame-b" />
            <div className="news-frame-f">
              <video
                ref={videoNewsRef}
                src={asset("/assets/videos/musicvideos/sukram_i_am_war.mp4")}
                className="news-video-el"
                playsInline
                preload="metadata"
                onEnded={() => setIsVideoPlaying(false)}
              />
              <div className="news-video-ctrl">
                <button
                  className="news-ctrl-btn"
                  aria-label={isVideoPlaying ? "Stop" : "Play"}
                  onClick={() => {
                    const v = videoNewsRef.current;
                    if (!v) return;
                    if (isVideoPlaying) { v.pause(); v.currentTime = 0; setIsVideoPlaying(false); }
                    else { v.play().catch(() => {}); setIsVideoPlaying(true); }
                  }}
                >{isVideoPlaying ? "⏹" : "▶"}</button>
                <button className="news-ctrl-btn" aria-label="Vollbild" onClick={() => setShowVideoFullscreen(true)}>⛶</button>
              </div>
            </div>
          </div>
          <div className="news-cover-wrap">
            <div className="news-date-label">JUNE|13</div>
            <img src={asset("/assets/coverartwork/sukram-cover.png")} alt="Sukram – I Am War" className="news-cover-img" loading="lazy" decoding="async" />
            <div className="news-streaming">
              <a href="https://open.spotify.com/playlist/6GBZNBRcta3DF6MCU5cVAP" target="_blank" rel="noopener noreferrer" className="news-stream-link">Spotify</a>
              <span className="news-stream-sep">|</span>
              <a href="#" target="_blank" rel="noopener noreferrer" className="news-stream-link">Apple Music</a>
              <span className="news-stream-sep">|</span>
              <a href="#" target="_blank" rel="noopener noreferrer" className="news-stream-link">Amazon Music</a>
            </div>
          </div>
        </div>
      </div>

      {/* MERCH + WALLPAPER */}
      <div className="merch-wall-strip">
        <a
          href="https://rokko-records-klumpatsch.myspreadshop.de/"
          target="_blank"
          rel="noopener noreferrer"
          className="merch-wall-item"
          data-testid="link-merch"
        >
          <img src={asset("/assets/banners/merchbutton.png")} alt="Rokko! Merchandise" loading="lazy" decoding="async" />
        </a>
        <div className="merch-wall-item" onClick={() => setShowWallpaper(true)} style={{ cursor: "pointer" }} data-testid="button-wallpaper">
          <img src={asset("/assets/banners/wallpaperlinks.png")} alt="Wallpaper" loading="lazy" decoding="async" />
        </div>
      </div>

      {/* BIGSOCIALBAR */}
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

      {/* FOOTER */}
      <div className="site-footer">
        <button className="footer-link" onClick={() => setShowDSE(true)}>Datenschutz</button>
        <span className="footer-sep">·</span>
        <button className="footer-link" onClick={() => setShowImpressum(true)}>Impressum</button>
      </div>

      {/* DROPDOWN */}
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
            {/* HERO */}
            <div className="dd-hero">
              <img className="dd-hero-bg" src={selectedArtist.image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <div className="dd-hero-gradient" />
              <button className="dd-close-x" onClick={() => setOpenArtist(null)} data-testid="dropdown-close" aria-label="Schließen">✕</button>
              <div className="dd-hero-bottom">
                <div className="dd-hero-name">
                  <span className="dd-hero-name-top">{selectedArtist.nameH3}</span>
                  {selectedArtist.nameH1 && <span className="dd-hero-name-main">{selectedArtist.nameH1}</span>}
                </div>
                <div className="dd-hero-cover">
                  <img src={selectedArtist.cover} alt={selectedArtist.albumTitle} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>

            {/* BIO */}
            <div className="dd-bio-section">
              <p className="dd-bio">{selectedArtist.bio}</p>
            </div>

            {/* STREAMING LINKS */}
            {(selectedArtist.links.appleMusic || selectedArtist.links.spotify || selectedArtist.links.amazon) && (
              <div className="dd-links-row">
                {selectedArtist.links.spotify && (
                  <a href={selectedArtist.links.spotify} target="_blank" rel="noopener noreferrer" className="dd-link-btn" data-testid={`link-spotify-${selectedArtist.id}`}>
                    <IconSpotify /><span>Spotify</span>
                  </a>
                )}
                {selectedArtist.links.appleMusic && (
                  <a href={selectedArtist.links.appleMusic} target="_blank" rel="noopener noreferrer" className="dd-link-btn" data-testid={`link-apple-${selectedArtist.id}`}>
                    <IconApple /><span>Apple Music</span>
                  </a>
                )}
                {selectedArtist.links.amazon && (
                  <a href={selectedArtist.links.amazon} target="_blank" rel="noopener noreferrer" className="dd-link-btn" data-testid={`link-amazon-${selectedArtist.id}`}>
                    <IconAmazon /><span>Amazon Music</span>
                  </a>
                )}
              </div>
            )}

            {/* CLOSE BAR */}
            <button className="dd-close-bar" onClick={() => setOpenArtist(null)}>
              <span className="dd-close-tab">
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                  <path d="M4 14L10 6L16 14" stroke="#B81C09" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>zuklappen</span>
              </span>
            </button>
          </div>
        </>
      )}

      {showVideoFullscreen && (
        <div className="video-fs-overlay" onClick={() => setShowVideoFullscreen(false)}>
          <video
            src={asset("/assets/videos/musicvideos/sukram_i_am_war.mp4")}
            controls autoPlay playsInline className="video-fs-player"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="video-fs-close" onClick={() => setShowVideoFullscreen(false)}>✕</button>
        </div>
      )}
      {showWallpaper && <WallpaperPopup onClose={() => setShowWallpaper(false)} />}
      {showDSE && <DSEModal onClose={() => setShowDSE(false)} />}
      {showImpressum && <ImpressumModal onClose={() => setShowImpressum(false)} />}
    </div>
  );
}

