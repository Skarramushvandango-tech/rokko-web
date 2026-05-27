import { useState, useCallback } from "react";
  import { asset } from "../utils/asset";
  import wallpaperFiles from "../data/wallpapers.json";

  const WALLPAPERS = (wallpaperFiles as string[]).map(
    (f) => asset(`/assets/wallpaper/${f}`)
  );

  interface WallpaperPopupProps {
    onClose: () => void;
  }

  export default function WallpaperPopup({ onClose }: WallpaperPopupProps) {
    const [selected, setSelected] = useState<number | null>(null);

    const handleDownload = useCallback(() => {
      if (selected === null) return;
      const url = WALLPAPERS[selected];
      const a = document.createElement("a");
      a.href = url;
      a.download = `rokko-wallpaper-${String(selected + 1).padStart(2, "0")}.png`;
      a.click();
    }, [selected]);

    const handlePrev = useCallback(() => {
      if (selected === null) return;
      setSelected((s) => (s! > 0 ? s! - 1 : s));
    }, [selected]);

    const handleNext = useCallback(() => {
      if (selected === null) return;
      setSelected((s) => (s! < WALLPAPERS.length - 1 ? s! + 1 : s));
    }, [selected]);

    return (
      <div
        className="wallpaper-popup-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="wallpaper-popup">
          <button
            className="wallpaper-popup-close"
            onClick={onClose}
            data-testid="wallpaper-close"
            aria-label="Schließen"
          >
            ✕
          </button>

          {selected === null ? (
            <>
              <p
                style={{
                  color: "#B81C09",
                  fontFamily: "Tahoma, sans-serif",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginBottom: "8px",
                  marginTop: "4px",
                }}
              >
                Wallpaper
              </p>
              <div className="wallpaper-popup-grid">
                {WALLPAPERS.map((src, i) => (
                  <div
                    key={i}
                    className="wallpaper-item"
                    onClick={() => setSelected(i)}
                    data-testid={`wallpaper-thumb-${i}`}
                  >
                    <img src={src} alt={`Wallpaper ${i + 1}`} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <img
                src={WALLPAPERS[selected]}
                alt={`Wallpaper ${selected + 1}`}
                style={{
                  maxWidth: "70vw",
                  maxHeight: "65vh",
                  objectFit: "contain",
                  border: "1px solid #580C03",
                  borderRadius: "6px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <div className="wallpaper-nav">
                <button
                  className="wallpaper-nav-btn"
                  onClick={handlePrev}
                  disabled={selected === 0}
                  data-testid="wallpaper-prev"
                >
                  ‹
                </button>
                <span
                  style={{ color: "#aaa", fontFamily: "Tahoma, sans-serif", fontSize: "13px" }}
                >
                  {selected + 1} / {WALLPAPERS.length}
                </span>
                <button
                  className="wallpaper-nav-btn"
                  onClick={handleNext}
                  disabled={selected === WALLPAPERS.length - 1}
                  data-testid="wallpaper-next"
                >
                  ›
                </button>
              </div>
              <button
                className="wallpaper-download-btn"
                onClick={handleDownload}
                data-testid="wallpaper-download"
              >
                Download
              </button>
              <div style={{ marginTop: "8px" }}>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#888",
                    fontFamily: "Tahoma, sans-serif",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelected(null)}
                >
                  ← Zurück zur Übersicht
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  