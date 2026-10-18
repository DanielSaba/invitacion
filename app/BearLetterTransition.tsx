"use client";

import { useEffect, useState } from "react";
import "./BearLetterTransition.css";

const confettiColors = ["#ff5c7c", "#ffd25a", "#7be0c3", "#8ab4ff", "#ffffff", "#ff9ec1"];

export default function BearLetterTransition() {
  const [confetti, setConfetti] = useState<Array<{
    id: number; left: number; delay: number; color: string; rotate: number;
  }>>([]);

  useEffect(() => {
    setConfetti(Array.from({ length: 70 }, (_, id) => ({
      id,
      left: Math.random() * 100,
      delay: Math.random() * 2.2,
      color: confettiColors[id % confettiColors.length],
      rotate: Math.random() * 360,
    })));
  }, []);

  return (
    <div className="bear-transition" role="status" aria-label="El osito está abriendo una carta mágica">
      <div className="bt-stars" aria-hidden="true">
        {Array.from({ length: 48 }, (_, i) => (
          <i key={i} style={{ left: `${(i * 37.7) % 100}%`, top: `${(i * 23.9) % 78}%`, animationDelay: `${(i % 9) * -0.31}s` }} />
        ))}
      </div>
      <div className="bt-moon" aria-hidden="true" />
      <div className="bt-confetti" aria-hidden="true">
        {confetti.map((piece) => (
          <i key={piece.id} style={{
            left: `${piece.left}%`,
            background: piece.color,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotate}deg)`,
          }} />
        ))}
      </div>
      <div className="bt-scene">
        <div className="bt-rays" aria-hidden="true">✦</div>
        <svg className="bt-bear" viewBox="0 0 400 520" role="img" aria-label="Un osito abre un sobre y revela una carta con un corazón">
          <defs>
            <radialGradient id="bt-fur" cx="40%" cy="30%" r="80%">
              <stop offset="0" stopColor="#f0b160" /><stop offset="1" stopColor="#c47d2e" />
            </radialGradient>
            <linearGradient id="bt-envelope" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fffdf6" /><stop offset="1" stopColor="#ecd9b4" />
            </linearGradient>
            <radialGradient id="bt-seal" cx="35%" cy="30%" r="75%">
              <stop offset="0" stopColor="#ff7d94" /><stop offset="1" stopColor="#c2283f" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="495" rx="150" ry="16" fill="#000" opacity=".23" />
          <g className="bt-body" stroke="#6b4220" strokeWidth="3" strokeLinejoin="round">
            <ellipse cx="130" cy="470" rx="45" ry="26" fill="url(#bt-fur)" />
            <ellipse cx="270" cy="470" rx="45" ry="26" fill="url(#bt-fur)" />
            <ellipse cx="130" cy="474" rx="22" ry="12" fill="#f6cf8e" stroke="none" />
            <ellipse cx="270" cy="474" rx="22" ry="12" fill="#f6cf8e" stroke="none" />
            <ellipse cx="200" cy="385" rx="118" ry="105" fill="url(#bt-fur)" />
            <ellipse cx="200" cy="410" rx="72" ry="72" fill="#f6cf8e" stroke="none" />
          </g>
          <g className="bt-head" stroke="#6b4220" strokeWidth="3" strokeLinejoin="round">
            <g className="bt-ear"><circle cx="107" cy="140" r="34" fill="url(#bt-fur)" /><circle cx="109" cy="144" r="18" fill="#f6cf8e" stroke="none" /></g>
            <g className="bt-ear bt-ear-right"><circle cx="293" cy="140" r="34" fill="url(#bt-fur)" /><circle cx="291" cy="144" r="18" fill="#f6cf8e" stroke="none" /></g>
            <ellipse cx="200" cy="215" rx="108" ry="92" fill="url(#bt-fur)" />
            <ellipse cx="200" cy="248" rx="48" ry="36" fill="#f6cf8e" />
            <ellipse cx="200" cy="232" rx="14" ry="10" fill="#6b4220" />
            <path d="M200 242v8 M176 256q24 20 48 0" fill="none" />
            <g className="bt-eyes"><ellipse cx="156" cy="196" rx="11" ry="13" fill="#6b4220" stroke="none" /><ellipse cx="244" cy="196" rx="11" ry="13" fill="#6b4220" stroke="none" /><circle cx="152" cy="191" r="4.5" fill="#fff" stroke="none" /><circle cx="240" cy="191" r="4.5" fill="#fff" stroke="none" /></g>
            <ellipse cx="128" cy="240" rx="16" ry="9" fill="#ff7a8a" opacity=".5" stroke="none" /><ellipse cx="272" cy="240" rx="16" ry="9" fill="#ff7a8a" opacity=".5" stroke="none" />
          </g>
          <g className="bt-envelope" stroke="#6b4220" strokeWidth="3" strokeLinejoin="round">
            <rect x="105" y="320" width="190" height="130" rx="9" fill="#ecd9b4" />
            <g className="bt-letter">
              <rect x="132" y="285" width="136" height="150" rx="7" fill="#fffdf6" />
              <path d="M142 300h116" stroke="#f3dca8" strokeWidth="2" fill="none" />
              <g fill="#7a3b52" stroke="none" textAnchor="middle" fontFamily="Georgia,serif">
                <text className="bt-line bt-line-one" x="200" y="330" fontSize="15" fontStyle="italic">Para ti</text>
                <text className="bt-line bt-line-two" x="200" y="353" fontSize="11.5">con mucho cariño,</text>
                <text className="bt-line bt-line-three" x="200" y="372" fontSize="11.5">un abrazo de oso</text>
              </g>
              <path className="bt-heart" d="M200 421c-24-17-32-32-19-42 9-6 17-2 19 6 2-8 10-12 19-6 13 10 5 25-19 42z" fill="#ff5c7c" stroke="none" />
            </g>
            <polygon points="105,450 105,320 200,392 295,320 295,450" fill="url(#bt-envelope)" />
            <path d="M105 450l78-62M295 450l-78-62" stroke="#ecd9b4" strokeWidth="2" fill="none" />
            <polygon className="bt-flap" points="105,320 295,320 200,402" fill="#fff7e6" />
            <g className="bt-seal">
              <path className="bt-seal-left" d="M200 372a27 27 0 0 0 0 54z" fill="url(#bt-seal)" />
              <path className="bt-seal-right" d="M200 372a27 27 0 0 1 0 54z" fill="url(#bt-seal)" />
              <path d="M200 389l4 7 8 1-6 5 2 8-8-4-8 4 2-8-6-5 8-1z" fill="#ffd9de" stroke="none" />
            </g>
          </g>
          <g className="bt-paw" stroke="#6b4220" strokeWidth="3">
            <ellipse cx="108" cy="400" rx="30" ry="26" fill="url(#bt-fur)" /><ellipse cx="108" cy="404" rx="12" ry="9" fill="#f6cf8e" stroke="none" />
          </g>
          <g className="bt-paw bt-paw-right" stroke="#6b4220" strokeWidth="3">
            <ellipse cx="292" cy="400" rx="30" ry="26" fill="url(#bt-fur)" /><ellipse cx="292" cy="404" rx="12" ry="9" fill="#f6cf8e" stroke="none" />
          </g>
        </svg>
        <p className="bt-caption">Una cartita hecha con mucho amor <span>♥</span></p>
      </div>
    </div>
  );
}
