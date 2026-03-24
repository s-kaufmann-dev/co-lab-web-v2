import React, { useEffect, useRef } from 'react';

export default function DuesseldorfSkyline() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const leavesRef = useRef([]);
  const mouseRef = useRef({ x: -1, y: -1, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    resize();
    const cw = () => canvas.offsetWidth;
    const ch = () => canvas.offsetHeight;

    // ─── Accent colors ──────────────────────────────────
    const ACCENT = '#00ff66';
    const AD = 'rgba(0,255,102,';
    // Rhine water tones (dark blue-greens to sit on black bg but feel like water)
    const WATER_DARK = '#040810';
    const WATER_MID = '#06101a';
    const WATER_HIGHLIGHT = 'rgba(60,130,200,';  // blue reflection highlight
    const WATER_LINE = 'rgba(80,160,220,';

    // ─── Hover interaction ──────────────────────────────
    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
      // Spawn wind gust particles
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 40,
          y: mouseRef.current.y + (Math.random() - 0.5) * 20,
          size: Math.random() * 2.5 + 1,
          vx: 1.5 + Math.random() * 2,
          vy: -0.5 + Math.random() * 1,
          life: 1,
          decay: Math.random() * 0.012 + 0.006,
          type: 'wind',
        });
      }
      // Occasionally spawn a leaf/blossom
      if (Math.random() < 0.15) {
        leavesRef.current.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 100,
          y: mouseRef.current.y - 20 - Math.random() * 30,
          size: Math.random() * 4 + 2.5,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.06,
          vx: 0.8 + Math.random() * 1.5,
          vy: 0.5 + Math.random() * 1,
          life: 1,
          decay: Math.random() * 0.005 + 0.003,
          color: Math.random() > 0.4
            ? (Math.random() > 0.5 ? 'rgba(120,180,80,' : 'rgba(90,150,60,')  // green leaves
            : (Math.random() > 0.5 ? 'rgba(255,180,200,' : 'rgba(255,160,180,'), // pink blossoms
        });
      }
    };
    const handleLeave = () => { mouseRef.current.active = false; };
    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleLeave);
    window.addEventListener('resize', resize);

    // Wind lines (ambient, intensify on hover)
    const windLines = [];
    function initWind(W, H) {
      windLines.length = 0;
      for (let i = 0; i < 8; i++) {
        windLines.push({
          x: Math.random() * W * 1.3 - W * 0.15,
          y: H * 0.05 + Math.random() * H * 0.35,
          len: 60 + Math.random() * 100,
          speed: 0.8 + Math.random() * 1.5,
          amp: 1.5 + Math.random() * 3,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.03 + Math.random() * 0.04,
          thick: 0.3 + Math.random() * 0.5,
        });
      }
    }

    /* ══════════════════════════════════════════════════════
       PERSPECTIVE: Looking from Oberkassel south bank
       across the Rhine at Düsseldorf's skyline.
       
       Layout (left → right, matching reality):
       - Oberkasseler Brücke
       - Altstadt: Schlossturm + St. Lambertus spire
       - Tonhalle (round roof)
       - Rheinkniebrücke
       - RHEINTURM (dominant, tallest)
       - Landtag (low, modern)
       - Gehry/MedienHafen
       - Stadttor + right skyline
       
       Y layout:
       - Top 40%: Sky + skyline
       - Bottom 60%: Rhine river (clearly water)
       ══════════════════════════════════════════════════════ */

    const HORIZON = 0.42; // 42% from top = waterline

    function drawSky(W, H) {
      const g = ctx.createLinearGradient(0, 0, 0, H * HORIZON);
      g.addColorStop(0, '#000000');
      g.addColorStop(0.3, '#020406');
      g.addColorStop(0.7, '#04080c');
      g.addColorStop(1, '#060c12');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H * HORIZON + 2);
    }

    function drawStars(W, H, t) {
      for (let i = 0; i < 35; i++) {
        const sx = (Math.sin(i * 137.5) * 0.5 + 0.5) * W;
        const sy = (Math.cos(i * 83.7) * 0.5 + 0.5) * H * HORIZON * 0.7;
        const tw = Math.sin(t * 0.0012 + i * 2.1) * 0.25 + 0.3;
        ctx.fillStyle = `rgba(255,255,255,${tw * 0.2})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ── Oberkasseler Brücke (left, arch/beam bridge) ──
    function drawOberkasselerBruecke(W, H) {
      const y = H * HORIZON;
      const x1 = W * -0.02;
      const x2 = W * 0.14;

      ctx.strokeStyle = `${AD}0.3)`;
      ctx.lineWidth = 1.5;
      // Deck
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();
      // Arch
      ctx.strokeStyle = `${AD}0.4)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x1 + 5, y);
      ctx.quadraticCurveTo((x1 + x2) / 2, y - H * 0.08, x2 - 5, y);
      ctx.stroke();
      // Support pillars
      ctx.lineWidth = 1;
      ctx.strokeStyle = `${AD}0.25)`;
      for (let px = x1 + 15; px < x2 - 10; px += 20) {
        ctx.beginPath();
        ctx.moveTo(px, y);
        ctx.lineTo(px, y + H * 0.04);
        ctx.stroke();
      }
    }

    // ── Altstadt: Schlossturm + St. Lambertus ──
    function drawAltstadt(W, H) {
      const y = H * HORIZON;
      const cx = W * 0.20;

      // Altstadt buildings base (old town row)
      ctx.fillStyle = '#0a0e12';
      ctx.fillRect(cx - W * 0.06, y - H * 0.10, W * 0.12, H * 0.10);
      ctx.strokeStyle = `${AD}0.2)`;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(cx - W * 0.06, y - H * 0.10, W * 0.12, H * 0.10);

      // Individual old-town rooftops (varied heights)
      ctx.fillStyle = '#080c10';
      const roofs = [
        [-0.06, 0.025, 0.12], [-0.035, 0.02, 0.14], [-0.015, 0.03, 0.11],
        [0.015, 0.025, 0.13], [0.035, 0.02, 0.10], [0.05, 0.025, 0.12],
      ];
      for (const [ox, w, h] of roofs) {
        const rx = cx + W * ox;
        const rw = W * w;
        const rh = H * h;
        ctx.fillRect(rx, y - rh, rw, rh);
        // Triangular roof
        ctx.beginPath();
        ctx.moveTo(rx, y - rh);
        ctx.lineTo(rx + rw / 2, y - rh - H * 0.02);
        ctx.lineTo(rx + rw, y - rh);
        ctx.fillStyle = '#060a0e';
        ctx.fill();
        ctx.fillStyle = '#080c10';
      }

      // Schlossturm (castle tower - square, stocky)
      const stx = cx - W * 0.025;
      const stH = H * 0.18;
      ctx.fillStyle = '#0a0f14';
      ctx.fillRect(stx, y - stH, W * 0.018, stH);
      ctx.strokeStyle = `${AD}0.4)`;
      ctx.lineWidth = 0.8;
      ctx.strokeRect(stx, y - stH, W * 0.018, stH);
      // Tower cap (pointed)
      ctx.beginPath();
      ctx.moveTo(stx - 1, y - stH);
      ctx.lineTo(stx + W * 0.009, y - stH - H * 0.04);
      ctx.lineTo(stx + W * 0.019, y - stH);
      ctx.fillStyle = '#060a0e';
      ctx.fill();
      ctx.strokeStyle = `${AD}0.3)`;
      ctx.stroke();

      // St. Lambertus church spire (tall, thin, twisted tip)
      const lx = cx + W * 0.02;
      const lH = H * 0.24;
      ctx.strokeStyle = `${AD}0.5)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(lx, y - H * 0.08);
      ctx.lineTo(lx, y - lH);
      ctx.stroke();
      // Spire top (slightly curved / twisted)
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(lx - 4, y - lH + H * 0.04);
      ctx.quadraticCurveTo(lx, y - lH - H * 0.03, lx + 3, y - lH + H * 0.02);
      ctx.stroke();
      // Church body
      ctx.fillStyle = '#0a0f14';
      ctx.fillRect(lx - 8, y - H * 0.08, 16, H * 0.08);
      // Windows
      ctx.fillStyle = `${AD}0.06)`;
      for (let r = 0; r < 3; r++) {
        ctx.fillRect(stx + 3, y - stH + 8 + r * 12, 4, 3);
        ctx.fillRect(lx - 5, y - H * 0.06 + r * 8, 3, 2);
        ctx.fillRect(lx + 2, y - H * 0.06 + r * 8, 3, 2);
      }
    }

    // ── Tonhalle (round-roofed concert hall) ──
    function drawTonhalle(W, H) {
      const y = H * HORIZON;
      const cx = W * 0.30;
      const bW = W * 0.04;
      const bH = H * 0.08;

      ctx.fillStyle = '#0a0e12';
      ctx.fillRect(cx - bW / 2, y - bH, bW, bH);
      // Dome roof
      ctx.fillStyle = '#080c10';
      ctx.strokeStyle = `${AD}0.35)`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(cx, y - bH, bW / 2, Math.PI, 0, false);
      ctx.fill();
      ctx.stroke();
    }

    // ── Rheinkniebrücke (cable-stayed, prominent) ──
    function drawRheinkniekbruecke(W, H) {
      const y = H * HORIZON;
      const x1 = W * 0.34;
      const x2 = W * 0.48;
      const pylonX = W * 0.40;
      const pylonH = H * 0.22;

      // Deck
      ctx.strokeStyle = `${AD}0.35)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();

      // A-shaped pylon
      ctx.strokeStyle = `${AD}0.6)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pylonX - 2, y);
      ctx.lineTo(pylonX, y - pylonH);
      ctx.lineTo(pylonX + 2, y);
      ctx.stroke();

      // Stay cables (fan pattern)
      ctx.strokeStyle = `${AD}0.15)`;
      ctx.lineWidth = 0.4;
      for (let i = 1; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(pylonX, y - pylonH + i * 4);
        ctx.lineTo(pylonX - i * 5, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pylonX, y - pylonH + i * 4);
        ctx.lineTo(pylonX + i * 4.5, y);
        ctx.stroke();
      }

      // Pillars in water
      ctx.strokeStyle = `${AD}0.2)`;
      ctx.lineWidth = 1;
      for (let px = x1 + 20; px < x2; px += 30) {
        ctx.beginPath();
        ctx.moveTo(px, y);
        ctx.lineTo(px, y + H * 0.04);
        ctx.stroke();
      }
    }

    // ── RHEINTURM — realistic silhouette matching the real tower ──
    function drawRheinturm(W, H, t) {
      const y = H * HORIZON;
      const x = W * 0.52;
      const towerH = H * HORIZON * 0.95;
      const topY = y - towerH;

      // ── Concrete shaft — wider, tapered correctly ──
      // The real Rheinturm tapers progressively: wide base → medium at platform → thin above
      const baseHW = 7;     // half-width at base
      const midHW = 4.5;    // half-width at platform level
      const topHW = 2;      // half-width above restaurant
      const antHW = 0.8;    // antenna mast

      // Shaft fill
      ctx.fillStyle = '#0d1520';
      ctx.beginPath();
      ctx.moveTo(x - baseHW, y);
      // Base to just below platform
      ctx.lineTo(x - baseHW + 0.5, y - towerH * 0.35);
      ctx.lineTo(x - midHW - 1, y - towerH * 0.42); // widen slightly at platform base
      // Platform bottom edge
      ctx.lineTo(x - midHW - 1, y - towerH * 0.42);
      // Above platform, narrow
      ctx.lineTo(x - midHW + 1, y - towerH * 0.56);
      // Continue narrowing to restaurant
      ctx.lineTo(x - topHW - 0.5, y - towerH * 0.62);
      // Above restaurant
      ctx.lineTo(x - topHW + 0.5, y - towerH * 0.74);
      ctx.lineTo(x - antHW, topY);
      // Right side (mirror)
      ctx.lineTo(x + antHW, topY);
      ctx.lineTo(x + topHW - 0.5, y - towerH * 0.74);
      ctx.lineTo(x + topHW + 0.5, y - towerH * 0.62);
      ctx.lineTo(x + midHW - 1, y - towerH * 0.56);
      ctx.lineTo(x + midHW + 1, y - towerH * 0.42);
      ctx.lineTo(x + baseHW - 0.5, y - towerH * 0.35);
      ctx.lineTo(x + baseHW, y);
      ctx.closePath();
      ctx.fill();

      // Shaft outline — accent green
      ctx.strokeStyle = `${AD}0.65)`;
      ctx.lineWidth = 1.5;
      // Left outline
      ctx.beginPath();
      ctx.moveTo(x - baseHW, y);
      ctx.lineTo(x - baseHW + 0.5, y - towerH * 0.35);
      ctx.lineTo(x - midHW - 1, y - towerH * 0.42);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - midHW + 1, y - towerH * 0.56);
      ctx.lineTo(x - topHW - 0.5, y - towerH * 0.62);
      ctx.lineTo(x - topHW + 0.5, y - towerH * 0.74);
      ctx.lineTo(x - antHW, topY);
      ctx.stroke();
      // Right outline
      ctx.beginPath();
      ctx.moveTo(x + baseHW, y);
      ctx.lineTo(x + baseHW - 0.5, y - towerH * 0.35);
      ctx.lineTo(x + midHW + 1, y - towerH * 0.42);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + midHW - 1, y - towerH * 0.56);
      ctx.lineTo(x + topHW + 0.5, y - towerH * 0.62);
      ctx.lineTo(x + topHW - 0.5, y - towerH * 0.74);
      ctx.lineTo(x + antHW, topY);
      ctx.stroke();

      // ── MAIN OBSERVATION PLATFORM — flat cylindrical disc ──
      // This is the iconic shape: a wide, flat disc (like a UFO / stack of pancakes)
      const platY = y - towerH * 0.49; // center of platform
      const platW = 18;  // half-width (much wider than shaft)
      const platH = 14;  // total height of platform section
      const numRings = 5; // stacked rings

      ctx.fillStyle = '#10192a';
      // Draw as stacked horizontal rectangles (flat cylinder seen from side)
      for (let r = 0; r < numRings; r++) {
        const frac = r / (numRings - 1); // 0..1
        // Width: widest at middle, tapers at top and bottom
        const ringW = platW * (1 - Math.pow(frac * 2 - 1, 2) * 0.35);
        const ringY = platY - platH / 2 + r * (platH / (numRings - 1));
        const ringH = platH / numRings + 0.5;

        ctx.fillStyle = r === 2 ? '#0f1c2e' : '#0c1622'; // middle ring slightly lighter
        ctx.fillRect(x - ringW, ringY - ringH / 2, ringW * 2, ringH);

        // Ring outline
        ctx.strokeStyle = `${AD}${r === 2 ? 0.5 : 0.3})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(x - ringW, ringY - ringH / 2);
        ctx.lineTo(x + ringW, ringY - ringH / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - ringW, ringY + ringH / 2);
        ctx.lineTo(x + ringW, ringY + ringH / 2);
        ctx.stroke();
      }

      // Platform outer edge outlines (left + right vertical)
      ctx.strokeStyle = `${AD}0.5)`;
      ctx.lineWidth = 0.8;
      const platTop = platY - platH / 2;
      const platBot = platY + platH / 2;
      // Left edge curve
      ctx.beginPath();
      ctx.moveTo(x - platW * 0.65, platTop);
      ctx.quadraticCurveTo(x - platW * 1.05, platY, x - platW * 0.65, platBot);
      ctx.stroke();
      // Right edge curve
      ctx.beginPath();
      ctx.moveTo(x + platW * 0.65, platTop);
      ctx.quadraticCurveTo(x + platW * 1.05, platY, x + platW * 0.65, platBot);
      ctx.stroke();

      // Window band (illuminated strip around middle ring)
      ctx.fillStyle = `${AD}0.15)`;
      ctx.fillRect(x - platW + 2, platY - 1.5, (platW - 2) * 2, 3);

      // Decimal clock lights on the middle ring
      for (let i = 0; i < 16; i++) {
        const lx = x - platW + 3 + i * ((platW * 2 - 6) / 15);
        const on = Math.sin(t * 0.0018 + i * 0.6) > 0 ? 0.65 : 0.1;
        ctx.fillStyle = `${AD}${on})`;
        ctx.beginPath();
        ctx.arc(lx, platY, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── RESTAURANT SECTION — smaller flat cylinder above ──
      const restY = y - towerH * 0.64;
      const restW = 10;
      const restH = 8;
      const restRings = 3;

      for (let r = 0; r < restRings; r++) {
        const frac = r / (restRings - 1);
        const rW = restW * (1 - Math.pow(frac * 2 - 1, 2) * 0.3);
        const rY = restY - restH / 2 + r * (restH / (restRings - 1));
        const rH = restH / restRings + 0.3;

        ctx.fillStyle = '#0c1622';
        ctx.fillRect(x - rW, rY - rH / 2, rW * 2, rH);
        ctx.strokeStyle = `${AD}0.25)`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(x - rW, rY);
        ctx.lineTo(x + rW, rY);
        ctx.stroke();
      }

      // ── Decimal clock LEDs on shaft (Lichtzeitpegel) ──
      // The real tower has LED dots running down the shaft showing the time
      ctx.fillStyle = `${AD}0.12)`;
      const clockDots = [
        // Hours (2 dots)
        { y: y - towerH * 0.30, count: 2 },
        // Minutes (4 dots)
        { y: y - towerH * 0.25, count: 4 },
        // Seconds (4 dots)
        { y: y - towerH * 0.20, count: 4 },
      ];
      for (const cd of clockDots) {
        for (let d = 0; d < cd.count; d++) {
          const dotOn = Math.sin(t * 0.001 + d * 1.5 + cd.y * 0.1) > 0.3 ? 0.4 : 0.06;
          ctx.fillStyle = `${AD}${dotOn})`;
          ctx.beginPath();
          ctx.arc(x + (d - cd.count / 2 + 0.5) * 2.5, cd.y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Antenna mast ──
      ctx.strokeStyle = `${AD}0.5)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, topY - 28);
      ctx.stroke();

      // Antenna cross-arms (progressively shorter)
      ctx.lineWidth = 0.5;
      const armPositions = [
        { y: 6, w: 6 }, { y: 12, w: 4.5 }, { y: 18, w: 3 }, { y: 23, w: 2 },
      ];
      for (const arm of armPositions) {
        ctx.beginPath();
        ctx.moveTo(x - arm.w, topY - arm.y);
        ctx.lineTo(x + arm.w, topY - arm.y);
        ctx.stroke();
      }

      // ── BLINKING RED AVIATION LIGHT ──
      const blink = Math.sin(t * 0.005) > 0.2 ? 0.9 : 0.1;
      ctx.fillStyle = `rgba(255,25,25,${blink})`;
      ctx.beginPath();
      ctx.arc(x, topY - 28, 2.5, 0, Math.PI * 2);
      ctx.fill();
      // Red glow
      if (blink > 0.5) {
        const lg = ctx.createRadialGradient(x, topY - 28, 2, x, topY - 28, 15);
        lg.addColorStop(0, 'rgba(255,25,25,0.25)');
        lg.addColorStop(1, 'rgba(255,25,25,0)');
        ctx.fillStyle = lg;
        ctx.beginPath();
        ctx.arc(x, topY - 28, 15, 0, Math.PI * 2);
        ctx.fill();
      }

      // Secondary blinking lights on shaft (lower, alternating)
      const blink2 = Math.sin(t * 0.005 + 1.5) > 0.3 ? 0.5 : 0.05;
      ctx.fillStyle = `rgba(255,25,25,${blink2})`;
      ctx.beginPath();
      ctx.arc(x, y - towerH * 0.75, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // ── Base platform / building ──
      ctx.fillStyle = '#0a1018';
      ctx.fillRect(x - 14, y - 10, 28, 10);
      ctx.strokeStyle = `${AD}0.2)`;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x - 14, y - 10, 28, 10);
    }

    // ── Landtag (Parliament — low, modern, flat roof) ──
    function drawLandtag(W, H) {
      const y = H * HORIZON;
      const cx = W * 0.60;

      ctx.fillStyle = '#0a0e14';
      ctx.fillRect(cx - W * 0.03, y - H * 0.07, W * 0.06, H * 0.07);
      ctx.strokeStyle = `${AD}0.25)`;
      ctx.lineWidth = 0.6;
      ctx.strokeRect(cx - W * 0.03, y - H * 0.07, W * 0.06, H * 0.07);

      // Glass facade detail (horizontal lines)
      ctx.strokeStyle = `${AD}0.1)`;
      ctx.lineWidth = 0.3;
      for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(cx - W * 0.03, y - H * 0.07 + i * H * 0.013);
        ctx.lineTo(cx + W * 0.03, y - H * 0.07 + i * H * 0.013);
        ctx.stroke();
      }
    }

    // ── Gehry Buildings (MedienHafen) ──
    function drawGehry(W, H) {
      const y = H * HORIZON;
      const gx = W * 0.70;

      ctx.fillStyle = '#0b1016';
      ctx.strokeStyle = `${AD}0.45)`;
      ctx.lineWidth = 0.8;

      // Building A — warped left
      ctx.beginPath();
      ctx.moveTo(gx - 20, y);
      ctx.lineTo(gx - 24, y - H * 0.18);
      ctx.bezierCurveTo(gx - 18, y - H * 0.22, gx - 10, y - H * 0.20, gx - 6, y - H * 0.16);
      ctx.lineTo(gx - 4, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Building B — tallest, organic curve
      ctx.beginPath();
      ctx.moveTo(gx - 3, y);
      ctx.lineTo(gx - 4, y - H * 0.10);
      ctx.bezierCurveTo(gx - 5, y - H * 0.18, gx + 4, y - H * 0.24, gx + 3, y - H * 0.22);
      ctx.bezierCurveTo(gx + 10, y - H * 0.26, gx + 14, y - H * 0.18, gx + 12, y - H * 0.08);
      ctx.lineTo(gx + 14, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Building C — tilts right
      ctx.beginPath();
      ctx.moveTo(gx + 15, y);
      ctx.lineTo(gx + 16, y - H * 0.14);
      ctx.bezierCurveTo(gx + 18, y - H * 0.18, gx + 26, y - H * 0.16, gx + 28, y - H * 0.12);
      ctx.lineTo(gx + 30, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Windows on each
      ctx.fillStyle = `${AD}0.06)`;
      for (let b = 0; b < 3; b++) {
        const bx = gx - 18 + b * 18;
        for (let r = 0; r < 5; r++) {
          for (let c = 0; c < 2; c++) {
            ctx.fillRect(bx + c * 5, y - H * 0.04 - r * H * 0.025, 3, 1.5);
          }
        }
      }
    }

    // ── Stadttor + right skyline ──
    function drawRightSkyline(W, H, t) {
      const y = H * HORIZON;

      // Stadttor (twin towers with arch)
      const stx = W * 0.82;
      const stW = W * 0.015;
      const stH = H * 0.20;
      ctx.fillStyle = '#0a0e14';
      ctx.fillRect(stx - stW * 1.5, y - stH, stW, stH);
      ctx.fillRect(stx + stW * 0.5, y - stH, stW, stH);
      ctx.fillRect(stx - stW * 0.5, y - stH + 5, stW, 8);
      ctx.strokeStyle = `${AD}0.35)`;
      ctx.lineWidth = 0.6;
      ctx.strokeRect(stx - stW * 1.5, y - stH, stW, stH);
      ctx.strokeRect(stx + stW * 0.5, y - stH, stW, stH);
      // Arch
      ctx.beginPath();
      ctx.arc(stx, y, stW * 1.2, Math.PI, 0, false);
      ctx.strokeStyle = `${AD}0.2)`;
      ctx.stroke();

      // Generic right-side buildings
      ctx.fillStyle = '#080c12';
      const rBlds = [
        [0.88, 0.025, 0.16], [0.91, 0.02, 0.12], [0.93, 0.03, 0.18],
        [0.96, 0.02, 0.10], [0.98, 0.025, 0.14],
      ];
      for (const [xp, wp, hp] of rBlds) {
        ctx.fillRect(W * xp, y - H * hp, W * wp, H * hp);
        ctx.strokeStyle = `${AD}0.15)`;
        ctx.lineWidth = 0.4;
        ctx.strokeRect(W * xp, y - H * hp, W * wp, H * hp);
      }

      // Flickering windows across entire skyline
      ctx.fillStyle = `${AD}0.05)`;
      const winSpots = [
        [0.15, 0.06, 3, 4], [0.22, 0.08, 2, 4], [0.30, 0.05, 2, 3],
        [0.60, 0.05, 3, 3], [0.71, 0.06, 2, 4], [0.83, 0.12, 2, 6],
        [0.89, 0.10, 2, 4], [0.94, 0.12, 2, 5],
      ];
      for (const [xp, hp, cols, rows] of winSpots) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (Math.sin(t * 0.001 + xp * 80 + r * 4 + c * 6) > 0.2) {
              ctx.fillRect(W * xp + 2 + c * 5, y - H * hp + 3 + r * 5, 2.5, 1.5);
            }
          }
        }
      }
    }

    // ── Rhine river (clearly as water!) ──
    function drawRhine(W, H, t) {
      const ry = H * HORIZON;
      const rH = H - ry;

      // Water gradient — dark blue tones
      const wg = ctx.createLinearGradient(0, ry, 0, H);
      wg.addColorStop(0, '#060e18');   // dark navy at waterline
      wg.addColorStop(0.15, '#081220');
      wg.addColorStop(0.4, '#061018');
      wg.addColorStop(0.7, '#040c14');
      wg.addColorStop(1, '#030810');
      ctx.fillStyle = wg;
      ctx.fillRect(0, ry, W, rH);

      // Far shore line (subtle embankment)
      ctx.strokeStyle = `${WATER_LINE}0.15)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let px = 0; px < W; px += 3) {
        const py = ry + 1 + Math.sin(px * 0.02 + t * 0.001) * 0.5;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // ── Flowing water waves (many layers, blue-ish) ──
      for (let i = 0; i < 15; i++) {
        const ly = ry + 8 + i * (rH - 12) / 15;
        const speed = 0.5 + i * 0.08;
        const offset = t * speed * 0.02;
        const amplitude = 1.2 + i * 0.2;
        const opacity = Math.max(0.01, 0.10 - i * 0.005);

        // Alternate between blue and accent-tinted lines
        if (i % 3 === 0) {
          ctx.strokeStyle = `${WATER_LINE}${opacity})`;
        } else if (i % 3 === 1) {
          ctx.strokeStyle = `${WATER_HIGHLIGHT}${opacity * 0.6})`;
        } else {
          ctx.strokeStyle = `${AD}${opacity * 0.4})`;
        }
        ctx.lineWidth = 0.5 + (i < 4 ? 0.3 : 0);
        ctx.beginPath();
        for (let px = 0; px < W; px += 2) {
          const py = ly
            + Math.sin((px + offset) * 0.010) * amplitude
            + Math.sin((px + offset * 1.3) * 0.006) * amplitude * 0.6
            + Math.sin((px - offset * 0.7) * 0.018) * amplitude * 0.3;
          if (px === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // ── Skyline reflections in water ──
      ctx.globalAlpha = 0.5;

      // Rheinturm reflection (most prominent)
      for (let sy = 0; sy < rH * 0.45; sy += 2) {
        const shimmer = Math.sin(t * 0.003 + sy * 0.25) * 4;
        const fade = 1 - sy / (rH * 0.45);
        ctx.fillStyle = `${AD}${0.05 * fade})`;
        ctx.fillRect(W * 0.52 - 3 + shimmer, ry + 5 + sy, 6, 0.8);
      }

      // Rheinturm deck glow in water
      const deckReflY = ry + rH * 0.15;
      const glr = ctx.createRadialGradient(W * 0.52, deckReflY, 0, W * 0.52, deckReflY, 20);
      glr.addColorStop(0, `${AD}0.04)`);
      glr.addColorStop(1, `${AD}0)`);
      ctx.fillStyle = glr;
      ctx.beginPath();
      ctx.ellipse(W * 0.52, deckReflY, 20, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bridge reflection
      for (let sy = 0; sy < rH * 0.1; sy += 2) {
        const shimmer = Math.sin(t * 0.002 + sy * 0.4) * 5;
        const fade = 1 - sy / (rH * 0.1);
        ctx.fillStyle = `${AD}${0.03 * fade})`;
        ctx.fillRect(W * 0.34 + shimmer, ry + 4 + sy, W * 0.14, 0.5);
      }

      // Gehry reflection
      for (let sy = 0; sy < rH * 0.12; sy += 2) {
        const shimmer = Math.sin(t * 0.0025 + sy * 0.35) * 3;
        const fade = 1 - sy / (rH * 0.12);
        ctx.fillStyle = `${AD}${0.025 * fade})`;
        ctx.fillRect(W * 0.68 + shimmer, ry + 4 + sy, W * 0.08, 0.5);
      }

      // City-wide light scatter on water
      for (let i = 0; i < 20; i++) {
        const lx = (Math.sin(i * 73.7) * 0.5 + 0.5) * W;
        const ly = ry + rH * 0.1 + Math.sin(i * 41.3) * rH * 0.3;
        const shimmer = Math.sin(t * 0.002 + i * 1.3) * 3;
        const br = 0.015 + Math.sin(t * 0.003 + i) * 0.008;
        ctx.fillStyle = `${WATER_HIGHLIGHT}${br})`;
        ctx.fillRect(lx + shimmer, ly, 8, 0.5);
      }

      ctx.globalAlpha = 1;

      // Near-shore detail at very bottom (dark land strip)
      ctx.fillStyle = '#020408';
      ctx.fillRect(0, H - 3, W, 3);
    }

    // ── Wind effect ──
    function drawWind(W, H, t) {
      // Base wind speed, increases when mouse is active
      const activeMultiplier = mouseRef.current.active ? 2.5 : 1;

      for (const wl of windLines) {
        wl.x += wl.speed * activeMultiplier;
        if (wl.x > W + 50) {
          wl.x = -wl.len - 30;
          wl.y = H * 0.03 + Math.random() * H * (HORIZON - 0.05);
        }
        ctx.save();
        ctx.globalAlpha = wl.opacity * (mouseRef.current.active ? 2.5 : 1);
        ctx.strokeStyle = 'rgba(200,220,200,0.5)';
        ctx.lineWidth = wl.thick;
        ctx.lineCap = 'round';
        ctx.beginPath();
        for (let s = 0; s <= 8; s++) {
          const frac = s / 8;
          const px = wl.x + frac * wl.len;
          const py = wl.y + Math.sin(t * 0.004 + wl.phase + frac * 5) * wl.amp;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.restore();
      }

      // Extra gust lines when hovering
      if (mouseRef.current.active) {
        ctx.globalAlpha = 0.06;
        ctx.strokeStyle = ACCENT;
        ctx.lineWidth = 0.4;
        for (let i = 0; i < 4; i++) {
          const gy = mouseRef.current.y + (Math.random() - 0.5) * 60;
          const gx = mouseRef.current.x - 30;
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const px = gx + s * 15;
            const py = gy + Math.sin(t * 0.005 + s * 2 + i) * 4;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    }

    // ── Falling leaves / blossoms ──
    function drawLeaves(t) {
      leavesRef.current = leavesRef.current.filter(l => l.life > 0);
      for (const l of leavesRef.current) {
        l.x += l.vx + Math.sin(t * 0.003 + l.rotation) * 0.4;
        l.y += l.vy;
        l.rotation += l.rotSpeed;
        l.life -= l.decay;

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.rotation);
        ctx.globalAlpha = l.life * 0.8;

        // Leaf/petal shape
        ctx.fillStyle = l.color + (l.life * 0.85) + ')';
        ctx.beginPath();
        ctx.ellipse(0, 0, l.size, l.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Vein / petal center
        ctx.fillStyle = l.color + (l.life * 0.3) + ')';
        ctx.beginPath();
        ctx.ellipse(l.size * 0.15, 0, l.size * 0.4, l.size * 0.2, 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    // ── Wind gust particles ──
    function drawParticles(t) {
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy + Math.sin(t * 0.005 + p.x * 0.02) * 0.2;
        p.life -= p.decay;

        ctx.save();
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = `rgba(200,230,200,${p.life * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    // ── Mouse glow ──
    function drawMouseGlow() {
      if (!mouseRef.current.active) return;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const g = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
      g.addColorStop(0, `${AD}0.04)`);
      g.addColorStop(1, `${AD}0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mx, my, 60, 0, Math.PI * 2);
      ctx.fill();
    }

    // ─── Main render ─────────────────────────────────────
    let first = true;
    const render = (t) => {
      const W = cw();
      const H = ch();
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (first) { initWind(W, H); first = false; }

      drawSky(W, H);
      drawStars(W, H, t);

      // Draw skyline left to right (matching real Düsseldorf)
      drawOberkasselerBruecke(W, H);
      drawAltstadt(W, H);
      drawTonhalle(W, H);
      drawRheinkniekbruecke(W, H);
      drawRheinturm(W, H, t);
      drawLandtag(W, H);
      drawGehry(W, H);
      drawRightSkyline(W, H, t);

      // Rhine river (bottom 58%)
      drawRhine(W, H, t);

      // Wind & interaction
      drawWind(W, H, t);
      drawLeaves(t);
      drawParticles(t);
      drawMouseGlow();

      // Top fade for seamless blend with hero
      const topFade = ctx.createLinearGradient(0, 0, 0, H * 0.10);
      topFade.addColorStop(0, 'rgba(0,0,0,0.5)');
      topFade.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, W, H * 0.10);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-black z-10" style={{ height: '30vh' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ display: 'block', background: '#000' }}
      />
      <div className="absolute bottom-2 right-[5vw] flex items-center gap-2 z-10 pointer-events-none">
        <span className="text-[0.45rem] font-mono uppercase tracking-[0.25em] text-neutral-700">
          Düsseldorf am Rhein
        </span>
        <div className="w-1 h-1 rounded-full bg-accent/30 animate-pulse" />
      </div>
    </div>
  );
}
