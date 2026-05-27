import { useState, useCallback, useRef, useEffect } from "react";
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
  const filmstripRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    if (selected === null) return;
    const url = WALLPAPERS[selected];
    const a = document.createElement("a");
    a.href = url;
    a.download = `rokko-wallpaper-${String(selected + 1).padStart(2, "0")}.png`;
    a.click();
  }, [selected]);

  const handlePrev = useCallback(() => {
    setSelected((s) => (s !== null && s > 0 ? s - 1 : s));
  }, []);

  const handleNext = useCallback(() => {
    setSelected((s) => (s !== null && s < WALLPAPERS.length - 1 ? s + 1 : s));
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, handlePrev, handleNext]);

  useEffect(() => {
    if (selected === null || !filmstripRef.current) return;
    const thumb = filmstripRef.current.children[selected] as HTMLElement;
    if (thumb) thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selected]);

  return (
    <div
      className="wallpaper-popup-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="wallpaper-popup">
        <div className="wallpaper-popup-header">
          <span className="wallpaper-popup-title">Wallpaper</span>
          <button className="wallpaper-popup-close" onClick={onClose} aria-label="Schließen">✕</button>
        </div>

        {selected === null ? (
          <div className="wallpaper-grid-scroll">
            <div className="wallpaper-popup-grid">
              {WALLPAPERS.map((src, i) => (
                <div key={i} className="wallpaper-item" onClick={() => setSelected(i)}>
                  <img src={src} alt={`Wallpaper ${i + 1}`} loading="lazy" />
                  <span className="wallpaper-item-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="wallpaper-lightbox">
            <div className="wallpaper-lightbox-main">
              <button
                className="wallpaper-arrow wallpaper-arrow-left"
                onClick={handlePrev}
                disabled={selected === 0}
                aria-label="Zurück"
              >‹</button>
              <div className="wallpaper-lightbox-img-wrap">
                <img src={WALLPAPERS[selected]} alt={`Wallpaper ${selected + 1}`} />
              </div>
              <button
                className="wallpaper-arrow wallpaper-arrow-right"
                onClick={handleNext}
                disabled={selected === WALLPAPERS.length - 1}
                aria-label="Weiter"
              >›</button>
            </div>

            <div className="wallpaper-lightbox-meta">
              <button className="wallpaper-back-btn" onClick={() => setSelected(null)}>← Übersicht</button>
              <span className="wallpaper-counter">{selected + 1} / {WALLPAPERS.length}</span>
              <button className="wallpaper-download-btn" onClick={handleDownload}>↓ Download</button>
            </div>

            <div className="wallpaper-filmstrip" ref={filmstripRef}>
              {WALLPAPERS.map((src, i) => (
                <div
                  key={i}
                  className={`wallpaper-filmstrip-thumb${i === selected ? " active" : ""}`}
                  onClick={() => setSelected(i)}
                >
                  <img src={src} alt={`Wallpaper ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
