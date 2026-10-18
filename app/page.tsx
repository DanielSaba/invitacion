"use client";

import { useEffect, useRef, useState } from "react";
import BearLetterTransition from "./BearLetterTransition";



const EVENT_DATE = new Date("2026-11-07T15:30:00");

const EVENT_INFO = {
  date: "07 DE NOVIEMBRE DE 2026",
  day: "SABADO",
  time: "3:30 PM",
  locationName: "Salón de eventos",
  address: "Av. Catalina Huanca 158 - El tambo - Ref. Grifo Ciudad Universitaria",

  mapsUrl:
    "https://maps.app.goo.gl/3pg9XJTC5XNM9nKb6",

  whatsapp: "51999999999",
  whatsapp_man: "51914238160",
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


function CircularVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("No se pudo reproducir el video:", error);
      }
    } else {
      video.pause();
    }
  };

  return (
  <div className="video-player-container">
    <div className="video-circle">
      <video
        ref={videoRef}
        className="invitation-video"
        src="/baby-shower/video.mp4"
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {!isPlaying && (
        <button
          type="button"
          className="video-play-button"
          onClick={toggleVideo}
          aria-label="Reproducir video"
        >
          <span>▶</span>
        </button>
      )}
    </div>

    <button
      type="button"
      className="video-control-below"
      onClick={toggleVideo}
    >
      {isPlaying ? "Ⅱ Pausar video" : "▶ Continuar video"}
    </button>
  </div>
);
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const [isOpening, setIsOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showBearTransition, setShowBearTransition] = useState(false);

  const openInvitation = () => {
  if (opened || showBearTransition) return;

  setShowBearTransition(true);

  window.setTimeout(() => {
    setShowBearTransition(false);
    setOpened(true);
    setIsOpening(false);
  }, 9000);
};

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
      "¡Hola! Lucia💛 Quiero confirmar mi asistencia al Baby Shower de Leonardo. 🐝🍯"
    );

    window.open(
      `https://wa.me/${EVENT_INFO.whatsapp}?text=${message}`,
      "_blank"
    );
  };

  const confirmAttendance_man = () => {
    const message = encodeURIComponent(
      "¡Hola! Omar 💛 Quiero confirmar mi asistencia al Baby Shower de Leonardo. 🐝🍯"
    );

    window.open(
      `https://wa.me/${EVENT_INFO.whatsapp_man}?text=${message}`,
      "_blank"
    );
  };

  return (
    <main
      className={`invitation ${
        opened ? "invitation-opened" : ""
      }`}
    >


      <div className="corner-honey-scene" aria-hidden="true">
        <img
          src="/baby-shower/panal_s.png"
          alt=""
          className="corner-honeycomb"
        />

        <img
          src="/baby-shower/bee.png"
          alt=""
          className="corner-bee"
        />
      </div>




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
            Leonardo Vega Andrade
          </h2>

          <div className="name-line" />

        </section>

        {/* SOBRE */}

        

        {/* BOTÓN */}

        
    <button
      type="button"
      className={`open-button ${isOpening ? "is-opening" : ""}`}
      onClick={() => {
        if (showBearTransition || isOpening) return;

        setIsOpening(true);

        window.setTimeout(() => {
          openInvitation();
        }, 750);
      }}
      disabled={showBearTransition || isOpening}
      aria-label="Toca el sello para abrir la invitación del baby shower"
    >
      <span className="envelope-back" aria-hidden="true" />

      <span className="envelope-flap" aria-hidden="true" />

      <span className="envelope-pocket" aria-hidden="true" />

      <span className="envelope-seal" aria-hidden="true">
        <span className="button-pulse" />
        <img
          src="/baby-shower/honey-seal.png"
          alt=""
          draggable={false}
        />
      </span>

      <span className="open-label">
        <span className="open-arrow">↓</span>
        TOCA EL SELLO
        <span className="open-subtitle">PARA ABRIR</span>
      </span>
    </button>

<p className="bottom-text">
  Una pequeña sorpresa te espera
</p>


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
          type="button"
          className="close-invitation"
          onClick={() => {
            setOpened(false);
            setIsOpening(false);
            setShowBearTransition(false);
          }}
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
              de <span>Leonardo Vega Andrade</span>
            </div>

            <div className="little-honey-line">
              <span>🐝</span>
              <i />
              <span>🍯</span>
              <i />
              <span>🐝</span>
            </div>

            <img
              src="/baby-shower/pooh_party.gif"
              className="welcome-bear"
              alt="Osito"
            />

            <p className="welcome-text">
              
              <br />
              <br />
              ¡Nuestro pequeño Leonardo está
              por llegar! 💛
            </p>

          </ScrollReveal>

          {/* =================================================
              AUDIO
          ================================================= */}

          <ScrollReveal className="audio-section" delay={100}>
            <p className="section-kicker"></p>
            <h3 className="organic-title">¡Hola! ¿Quieres conocerme?</h3>
            <CircularVideo />
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

            <h4 className="organic-title2">
              Omar Y Lucia
            </h4>

            <div className="parents-photo">

              <img
                src="/baby-shower/mis-papitos.jpeg"
                alt="Mis papitos"
              />

            </div>

            <p className="parents-message">
              
            </p>

            <div className="tiny-hearts">
              ♥ ♥ ♥
            </div>

          </ScrollReveal>

          {/* =================================================
              FECHA
          ================================================= */}
          <div className="fecha2">
            <div>
              <img
              src="/baby-shower/bear_t.gif"
              className="welcome-bear"
              alt="Osito"
            />
            </div>
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
                  07
                </strong>

                <p className="calendar-month">
                  NOVIEMBRE
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
            
            

          </div>
          

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
        <div className="donde">
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
          <div>
            <img
              src="/baby-shower/winn.gif"
              className="welcome-bear"
              alt="Osito"
            />
          </div>
        </div>
          

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

             <div className="buttons_father">
              <div>
                <div>
                  <button
                    className="whatsapp-button"
                    onClick={confirmAttendance}
                  >
                    <span className="whatsapp-icon">
                      👩
                    </span>
                    <span>
                      CONFIRMAR A MAMÁ
                    </span>

                  </button>
                </div>
                <div>
                  <button
                    className="whatsapp-button_man"
                    onClick={confirmAttendance_man}
                  >
                    <span className="whatsapp-icon">
                      👨
                    </span>
                    <span>
                      CONFIRMAR A PAPÁ
                    </span>

                  </button>
                </div>
              </div>
              <div>
                <img
                  src="/baby-shower/pooh_corazones.gif"
                  className="welcome-bear"
                  alt="Osito"
                />
              </div>
            </div> 

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
              Los papitos de Leonardo
            </strong>

            <div className="footer-hearts">
              ♥ ♥ ♥
            </div>

          </ScrollReveal>

        </div>

      </section>

      {showBearTransition && <BearLetterTransition />}

    </main>
  );
}