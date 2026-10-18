"use client"; // necesario en App Router (usa estado y audio)

import { useRef, useState } from "react";

// Archivos dentro de la carpeta /public/musica/
const CANCIONES = ["/musica/audio1.mp3", "/musica/cancion2.mp3"];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [i, setI] = useState(0);
  const [sonando, setSonando] = useState(false);
  const [like, setLike] = useState(false);
  const [fav, setFav] = useState(false);

  const alternar = () => {
    const a = audioRef.current;
    a.paused ? a.play().catch(() => {}) : a.pause();
  };

  const cambiar = (d, forzar = false) => {
    const n = (i + d + CANCIONES.length) % CANCIONES.length;
    setI(n);
    const a = audioRef.current;
    a.src = CANCIONES[n];
    if (sonando || forzar) a.play().catch(() => {});
  };

  return (
    <div className="mp-wrap">
      <div className="mp-hint">
        <span>Dale play y continúa deslizando</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5l7 7 7-7M5 12l7 7 7-7" /></svg>
      </div>

      <div className="mp-player">
        <button className={`mp-circ mp-heart ${like ? "mp-on" : ""}`} onClick={() => setLike(!like)} aria-label="Me gusta">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"><path d="M12 21s-8-5.3-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.7-8 11-8 11z" /></svg>
        </button>

        <div className="mp-controls">
          <button onClick={() => cambiar(-1)} aria-label="Anterior">
            <svg width="34" height="28" viewBox="0 0 34 28" fill="currentColor" stroke="#2b2320" strokeWidth="2.5" strokeLinejoin="round"><path d="M16 3v22L3 14zM31 3v22L18 14z" /></svg>
          </button>

          <button className="mp-big" onClick={alternar} aria-label={sonando ? "Pausar" : "Reproducir"}>
            {sonando ? (
              <svg viewBox="0 0 40 40" fill="currentColor" stroke="#2b2320" strokeWidth="2.5"><rect x="6" y="3" width="10" height="34" rx="5" /><rect x="24" y="3" width="10" height="34" rx="5" /></svg>
            ) : (
              <svg viewBox="0 0 40 40" fill="currentColor" stroke="#2b2320" strokeWidth="2.5" strokeLinejoin="round"><path d="M8 4v32l28-16z" /></svg>
            )}
          </button>

          <button onClick={() => cambiar(1)} aria-label="Siguiente">
            <svg width="34" height="28" viewBox="0 0 34 28" fill="currentColor" stroke="#2b2320" strokeWidth="2.5" strokeLinejoin="round"><path d="M18 3v22l13-11zM3 3v22l13-11z" /></svg>
          </button>
        </div>

        <button className={`mp-circ mp-star ${fav ? "mp-on" : ""}`} onClick={() => setFav(!fav)} aria-label="Favorito">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="#2b2320" strokeWidth="2" strokeLinejoin="round"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.1 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" /></svg>
        </button>
      </div>

      <audio
        ref={audioRef}
        src={CANCIONES[0]}
        preload="none"
        onPlay={() => setSonando(true)}
        onPause={() => setSonando(false)}
        onEnded={() => cambiar(1, true)}
      />
    </div>
  );
}
