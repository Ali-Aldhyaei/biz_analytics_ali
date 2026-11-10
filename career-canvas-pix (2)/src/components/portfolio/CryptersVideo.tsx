import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Volume2 } from "lucide-react";
import poster from "@/assets/crypters-poster.jpg";

const SRC = "/media/crypters-trailer.mp4";

/** Waits on the poster; one click starts it from the beginning with sound. */
export function CryptersVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);

  // Pause if the visitor scrolls far away (saves battery); the button returns.
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => {
      if (e && !e.isIntersecting && !v.paused) v.pause();
    }, { threshold: 0.1 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    if (ended) v.currentTime = 0;
    v.muted = false;
    v.volume = 1;
    void v.play().catch(() => {});
  };

  return (
    <div className="relative mt-8 rounded-[1.75rem] bg-[image:var(--gradient-neon)] p-[1.5px] shadow-[var(--shadow-glow)]">
      <div className="group relative overflow-hidden rounded-[1.7rem] bg-background">
        <video
          ref={ref}
          src={SRC}
          poster={poster}
          playsInline
          preload="metadata"
          controls={playing}
          onPlay={() => { setPlaying(true); setEnded(false); }}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setEnded(true); }}
          className="aspect-video w-full object-cover [transform:translateZ(0)]"
        />
        <button
          type="button"
          onClick={start}
          aria-label={ended ? "Replay trailer with sound" : "Play trailer with sound"}
          className={`absolute inset-0 flex items-center justify-center bg-background/20 transition-opacity duration-300 ${
            playing ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <span className="flex flex-col items-center gap-3 transition-transform duration-300 group-hover:scale-105">
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/60 bg-background/70 shadow-[var(--shadow-glow)] backdrop-blur">
              <span className="absolute inset-0 animate-ping rounded-full border border-primary/40 motion-reduce:animate-none" />
              {ended ? <RotateCcw className="h-8 w-8 text-primary" /> : <Play className="ml-1 h-8 w-8 fill-primary text-primary" />}
            </span>
            <span className="flex items-center gap-2 rounded-full border border-primary/50 bg-background/80 px-4 py-2 font-mono text-xs text-foreground shadow-[var(--shadow-glow)] backdrop-blur">
              <Volume2 className="h-3.5 w-3.5 text-primary" />
              {ended ? "Replay with sound" : "Play trailer · sound on"}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
