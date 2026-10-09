"use client";

import { useEffect, useRef, useState } from "react";


const EVENT_DATE = new Date("2026-12-20T15:00:00");

const EVENT_INFO = {
  date: "20 DE DICIEMBRE DE 2026",
  day: "DOMINGO",
  time: "3:00 PM",
  locationName: "Salón de eventos",
  address: "Av. Ejemplo 123, Huancayo",

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Huancayo",

  whatsapp: "51999999999",
};

/* =========================================================
   COMPONENTE PARA ANIMACIONES AL HACER SCROLL
========================================================= */

function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("is-visible");
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${className}`}
      style={
        {
          "--reveal-delay": `${delay}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [opened, setOpened] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  /* =======================================================
     CONTADOR
  ======================================================= */

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const target = EVENT_DATE.getTime();

      const difference = target - now;

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown();

    const interval = setInterval(
      updateCountdown,
      1000
    );

    return () => clearInterval(interval);
  }, []);

  /* =======================================================
     AUDIO
  ======================================================= */

  const toggleAudio = () => {
    const audio = document.getElementById(
      "baby-shower-audio"
    ) as HTMLAudioElement | null;

    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  /* =======================================================
     WHATSAPP
  ======================================================= */

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      "¡Hola! 💛 Quiero confirmar mi asistencia al Baby Shower de Liam Leo. 🐝🍯"
    );

    window.open(
      `https://wa.me/${EVENT_INFO.whatsapp}?text=${message}`,
      "_blank"
    );
  };

  return (
    <main
      className={`invitation ${
        opened ? "invitation-opened" : ""
      }`}
    >
      {/* =================================================
          TEXTURA
      ================================================= */}

      <div className="paper-texture" />

      {/* =================================================
          DECORACIÓN PORTADA
      ================================================= */}

      <img
        src="/baby-shower/flowers-foliage.png"
        alt=""
        className="flowers flowers-left"
      />

      <img
        src="/baby-shower/flowers-foliage.png"
        alt=""
        className="flowers flowers-right"
      />

      <img
        src="/baby-shower/honeycomb.png"
        alt=""
        className="honeycomb honeycomb-top"
      />

      <img
        src="/baby-shower/honeycomb.png"
        alt=""
        className="honeycomb honeycomb-bottom"
      />

      <img
        src="/baby-shower/bee.png"
        alt=""
        className="bee bee-one"
      />

      <img
        src="/baby-shower/bee.png"
        alt=""
        className="bee bee-two"
      />

      {/* =================================================
          PORTADA
      ================================================= */}

      <section className="cover-content">

        <header className="header">

          <p className="small-title">
            UNA DULCE AVENTURA
          </p>

          <h1>
            Mi Baby
            <br />
            <span>Shower</span>
          </h1>

          <div className="decor-line">
            <span />
            <img
              src="/baby-shower/honey-drop.png"
              alt=""
            />
            <span />
          </div>

          <p className="subtitle">
            está por comenzar...
          </p>

        </header>

        {/* OSITO */}

        <div className="character">

          <div className="character-glow" />

          <img
            src="/baby-shower/bear-honey.png"
            className="bear"
            alt="Osito con miel"
          />

        </div>

        {/* NOMBRE */}

        <section className="name">

          <p>
            Con mucho amor esperamos a
          </p>

          <h2>
            Liam Leo
          </h2>

          <div className="name-line" />

        </section>

        {/* SOBRE */}

        <div className="envelope">

          <img
            src="/baby-shower/envelope-ultrasound.png"
            alt="Sobre con ecografía"
          />

        </div>

        {/* BOTÓN */}

        <button type="button" className="open-button" onClick={() => setOpened(true)} onTouchEnd={() => setOpened(true)} aria-label="Abrir invitación del baby shower" > <span className="button-pulse" aria-hidden="true" /> <img src="/baby-shower/honey-seal.png" alt="" draggable={false} /> <span> TOCA <br /> PARA ABRIR </span> </button>

        <div className="bottom-text">

          <span>🍯</span>

          <p>
            Una invitación hecha con mucho amor
          </p>

          <span>🍯</span>

        </div>

      </section>

      {/* =================================================
          SEGUNDA VISTA
      ================================================= */}

      <section
        className={`welcome ${
          opened ? "show" : ""
        }`}
      >

        {/* DECORACIONES FLOTANTES */}

        <div className="floating-decoration floating-bee-1">
          🐝
        </div>

        <div className="floating-decoration floating-bee-2">
          🐝
        </div>

        <div className="floating-decoration floating-flower-1">
          🌼
        </div>

        <div className="floating-decoration floating-flower-2">
          🌿
        </div>

        <div className="floating-decoration floating-star-1">
          ✦
        </div>

        <div className="floating-decoration floating-star-2">
          ✦
        </div>

        <div className="floating-decoration floating-honey-1">
          🍯
        </div>

        <div className="floating-decoration floating-honey-2">
          🍯
        </div>

        {/* BOTÓN CERRAR */}

        <button
          className="close-invitation"
          onClick={() => setOpened(false)}
          aria-label="Cerrar invitación"
        >
          ×
        </button>

        <div className="welcome-content">

          {/* =================================================
              INTRODUCCIÓN
          ================================================= */}

          <ScrollReveal className="welcome-intro">

            <p className="welcome-small">
              BIENVENIDOS
            </p>

            <h2>
              La dulce aventura
            </h2>

            <div className="intro-name">
              de <span>Liam Leo</span>
            </div>

            <div className="little-honey-line">
              <span>🐝</span>
              <i />
              <span>🍯</span>
              <i />
              <span>🐝</span>
            </div>

            <img
              src="/baby-shower/bear-honey.png"
              className="welcome-bear"
              alt="Osito"
            />

            <p className="welcome-text">
              Prepárate para compartir con
              nosotros un momento lleno de
              amor, dulzura y mucha alegría.
              <br />
              <br />
              ¡Nuestro pequeño Liam Leo está
              por llegar! 💛
            </p>

          </ScrollReveal>

          {/* =================================================
              AUDIO
          ================================================= */}

          <ScrollReveal
            className="audio-section"
            delay={100}
          >

            <div className="music-note-left">
              ♪
            </div>

            <div className="music-note-right">
              ♫
            </div>

            <p className="section-kicker">
              UNA MELODÍA ESPECIAL
            </p>

            <h3 className="organic-title">
              Escucha nuestra canción
            </h3>

            <audio
              id="baby-shower-audio"
              src="/baby-shower/audio.mp3"
              loop
            />
            <img
              src="/baby-shower/pooh-music.gif"
              alt="winne"
              className="gif-bee"
            />
            <button
              className={`audio-button ${
                isPlaying ? "playing" : ""
              }`}
              onClick={toggleAudio}
            >

              <span className="audio-button-icon">
                {isPlaying ? "❚❚" : "▶"}
              </span>

              <span>
                {isPlaying
                  ? "PAUSAR MÚSICA"
                  : "REPRODUCIR MÚSICA"}
              </span>

            </button>

          </ScrollReveal>

          {/* =================================================
              SEPARADOR
          ================================================= */}

          <div className="story-divider">
            <span>🌼</span>
            <div />
            <span>🐝</span>
            <div />
            <span>🌼</span>
          </div>

          {/* =================================================
              MIS PAPITOS
          ================================================= */}

          <ScrollReveal
            className="parents-section"
            delay={100}
          >

            <div className="paper-tape tape-left" />
            <div className="paper-tape tape-right" />

            <p className="section-kicker">
              CON MUCHO AMOR
            </p>

            <h3 className="organic-title">
              Mis papitos
            </h3>

            <div className="parents-photo">

              <img
                src="/baby-shower/mis-papitos.jpg"
                alt="Mis papitos"
              />

            </div>

            <p className="parents-message">
              Ellos esperan con mucha ilusión
              la llegada de su pequeño y quieren
              compartir contigo esta celebración
              tan especial.
            </p>

            <div className="tiny-hearts">
              ♥ ♥ ♥
            </div>

          </ScrollReveal>

          {/* =================================================
              FECHA
          ================================================= */}

          <ScrollReveal
            className="date-section"
            delay={100}
          >

            <div className="sun-rays">
              ✦
            </div>

            <p className="section-kicker">
              GUARDA ESTA FECHA
            </p>

            <h3 className="organic-title">
              El gran día
            </h3>

            <div className="calendar-shape">

              <div className="calendar-top">
                <span />
                <span />
              </div>

              <div className="calendar-content">

                <p className="calendar-day">
                  {EVENT_INFO.day}
                </p>

                <strong>
                  20
                </strong>

                <p className="calendar-month">
                  DICIEMBRE
                </p>

                <div className="calendar-line" />

                <p className="calendar-year">
                  2026
                </p>

              </div>

            </div>

            <div className="event-time">

              <span>🕒</span>

              <strong>
                {EVENT_INFO.time}
              </strong>

            </div>

          </ScrollReveal>

          {/* =================================================
              CONTADOR
          ================================================= */}

          <ScrollReveal
            className="countdown-section"
            delay={100}
          >

            <div className="cloud cloud-one" />
            <div className="cloud cloud-two" />

            <p className="section-kicker">
              LA CUENTA REGRESIVA
            </p>

            <h3 className="organic-title">
              Cada vez falta menos
            </h3>

            <div className="countdown">

              <div className="count-bubble">

                <strong>
                  {countdown.days}
                </strong>

                <span>
                  DÍAS
                </span>

              </div>

              <div className="count-bubble">

                <strong>
                  {countdown.hours}
                </strong>

                <span>
                  HORAS
                </span>

              </div>

              <div className="count-bubble">

                <strong>
                  {countdown.minutes}
                </strong>

                <span>
                  MIN
                </span>

              </div>

              <div className="count-bubble">

                <strong>
                  {countdown.seconds}
                </strong>

                <span>
                  SEG
                </span>

              </div>

            </div>

            <div className="countdown-bee">
              🐝
            </div>

          </ScrollReveal>

          {/* =================================================
              CAMINO / UBICACIÓN
          ================================================= */}

          <ScrollReveal
            className="location-section"
            delay={100}
          >

            <p className="section-kicker">
              SIGUE EL CAMINITO
            </p>

            <h3 className="organic-title">
              ¿Dónde será?
            </h3>

            <div className="location-scene">

              <div className="location-cloud cloud-a" />
              <div className="location-cloud cloud-b" />

              <div className="little-tree tree-left">
                🌳
              </div>

              <div className="little-tree tree-right">
                🌳
              </div>

              <div className="location-pin">
                📍
              </div>

              <div className="location-house">
                🏡
              </div>

            </div>

            <div className="location-info">

              <h4>
                {EVENT_INFO.locationName}
              </h4>

              <p>
                {EVENT_INFO.address}
              </p>

              <div className="location-time-small">
                🕒 {EVENT_INFO.time}
              </div>

            </div>

            <a
              href={EVENT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="maps-button"
            >

              <span>
                📍
              </span>

              LLEVAME AL LUGAR

            </a>

          </ScrollReveal>

          {/* =================================================
              CONFIRMACIÓN
          ================================================= */}

          <ScrollReveal
            className="confirmation-section"
            delay={100}
          >

            <div className="confirmation-bees">
              🐝
              <span>💛</span>
              🐝
            </div>

            <p className="section-kicker">
              Y LO MÁS IMPORTANTE...
            </p>

            <h3 className="organic-title">
              ¿Nos acompañas?
            </h3>

            <p className="confirmation-text">
              Tu presencia hará que este día
              sea todavía más especial.
              <br />
              <br />
              Confirma tu asistencia con
              nuestros papitos.
            </p>

            <button
              className="whatsapp-button"
              onClick={confirmAttendance}
            >

              <span className="whatsapp-icon">
                ☎
              </span>

              <span>
                CONFIRMAR POR WHATSAPP
              </span>

            </button>

            <p className="confirmation-small">
              ¡Te esperamos con mucho amor!
            </p>

          </ScrollReveal>

          {/* =================================================
              FINAL
          ================================================= */}

          <ScrollReveal
            className="welcome-footer"
            delay={100}
          >

            <div className="footer-decoration">
              🐝
              🍯
              🐝
            </div>

            <img
              src="/baby-shower/bear-honey.png"
              alt=""
              className="footer-bear"
            />

            <p>
              Con mucho amor,
            </p>

            <strong>
              Los papitos de Liam Leo
            </strong>

            <div className="footer-hearts">
              ♥ ♥ ♥
            </div>

          </ScrollReveal>

        </div>

      </section>

    </main>
  );
}