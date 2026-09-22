import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/projects";

export function ProjectGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const isOpen = openAt !== null;

  const show = useCallback(
    (delta: number) =>
      setOpenAt((cur) => (cur === null ? cur : (cur + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
      if (e.key === "Escape") setOpenAt(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, show]);

  const active = openAt !== null ? images[openAt] : null;

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setOpenAt(i)}
              aria-label={`Open screenshot: ${image.caption}`}
              className="group block w-full overflow-hidden rounded text-left transition-all"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <img
                  src={image.src}
                  alt={image.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ filter: "saturate(0.9)" }}
                />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "rgba(0,229,195,0.06)" }}
                />
              </div>
              <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
                <span className="mono-label text-foreground/50 group-hover:text-foreground/80 transition-colors">
                  {image.caption}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      {isOpen && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(8,12,16,0.92)", backdropFilter: "blur(12px)" }}
          onClick={() => setOpenAt(null)}
        >
          {/* Corner decorations on the panel */}
          <div
            className="relative max-w-5xl w-full overflow-hidden rounded-lg"
            style={{ border: "1px solid rgba(0,229,195,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cyan glow top line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: "linear-gradient(to right, transparent, var(--cyan), transparent)",
              }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpenAt(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-white/10"
              style={{ border: "1px solid var(--border)" }}
              aria-label="Close"
            >
              <X className="h-4 w-4 text-foreground/60" />
            </button>

            <img
              src={active.src}
              alt={active.caption}
              className="max-h-[78vh] w-full object-contain"
              style={{ background: "var(--card)" }}
            />

            <div
              className="flex items-center justify-between gap-4 px-5 py-4"
              style={{ borderTop: "1px solid var(--border)", background: "var(--card)" }}
            >
              <span className="mono-label text-foreground/60">{active.caption}</span>
              <span className="mono-label">
                {(openAt ?? 0) + 1} / {images.length}
              </span>
            </div>

            {images.length > 1 && (
              <>
                <NavBtn side="left" onClick={() => show(-1)} />
                <NavBtn side="right" onClick={() => show(1)} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function NavBtn({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded transition-colors hover:bg-white/10 ${
        side === "left" ? "left-3" : "right-3"
      }`}
      style={{ border: "1px solid var(--border)" }}
    >
      <Icon className="h-5 w-5 text-foreground/70" />
    </button>
  );
}
