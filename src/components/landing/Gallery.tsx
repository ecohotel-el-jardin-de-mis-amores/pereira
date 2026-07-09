import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryProps = {
  images: string[];
  alt: string;
  className?: string;
  aspect?: string;
};

export function Gallery({ images, alt, className = "", aspect = "aspect-[4/3]" }: GalleryProps) {
  const [i, setI] = useState(0);
  const total = images.length;
  const go = (n: number) => setI((n + total) % total);

  return (
    <div className={`group relative overflow-hidden ${aspect} ${className}`}>
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`${alt} - imagen ${idx + 1}`}
          loading="lazy"
          width={1280}
          height={960}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            idx === i ? "opacity-100 scale-100 group-hover:scale-105" : "opacity-0 scale-105"
          }`}
        />
      ))}

      {total > 1 && (
        <>
          {/* Flecha izquierda: siempre visible en móvil, aparece en hover en desktop */}
          <button
            type="button"
            aria-label="Anterior"
            onClick={(e) => { e.preventDefault(); go(i - 1); }}
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground shadow-card backdrop-blur transition
              opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Flecha derecha: siempre visible en móvil, aparece en hover en desktop */}
          <button
            type="button"
            aria-label="Siguiente"
            onClick={(e) => { e.preventDefault(); go(i + 1); }}
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground shadow-card backdrop-blur transition
              opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Ir a imagen ${idx + 1}`}
                onClick={(e) => { e.preventDefault(); setI(idx); }}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
