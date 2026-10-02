import { useEffect, useRef, useState } from "react";
import AiOverlay from "./AiOverlay";

function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute bottom-3 left-3 rounded bg-black/35 px-2 py-1 font-mono text-[9px] tracking-widest text-white/90 backdrop-blur-sm" aria-hidden="true">
      CAM 01 · {t}
    </div>
  );
}

/**
 * Glass-framed media slot. Renders the poster always; if a video file exists at
 * `media.video` it fades in over the poster (muted loop). AI overlays run on top.
 */
export default function VideoFrame({
  media,
  boxes = [],
  scan = true,
  badge = "LIVE",
  clock = true,
  playOnHover = false,
  className = "",
  innerClassName = "aspect-[4/3]",
}) {
  const [videoOk, setVideoOk] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef(null);

  const play = () => { if (playOnHover) videoRef.current?.play?.().catch(() => {}); };
  const pause = () => { if (playOnHover && videoRef.current) videoRef.current.pause(); };

  return (
    <div className={`glass rounded-3xl p-1.5 ${className}`} data-cursor>
      <div
        className={`relative overflow-hidden rounded-[18px] bg-tint ${innerClassName}`}
        onMouseEnter={play}
        onMouseLeave={pause}
      >
        <img src={media.poster} alt={media.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        {!videoFailed && (
          <video
            ref={videoRef}
            src={media.video}
            poster={media.poster}
            autoPlay={!playOnHover}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoOk(true)}
            onError={() => setVideoFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoOk ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/10" />
        <AiOverlay boxes={boxes} scan={scan} badge={badge} />
        {clock && <LiveClock />}
      </div>
    </div>
  );
}