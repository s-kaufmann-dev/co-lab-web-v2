import React, { useEffect, useRef } from 'react';

export default function JapaneseLandscape() {
  const canvasRef = useRef(null);
  const petalsRef = useRef([]);
  const mouseRef = useRef({ x: -1, y: -1, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    // Use CSS dimensions for drawing
    const cw = () => canvas.offsetWidth;
    const ch = () => canvas.offsetHeight;

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
      // Spawn sakura petals
      for (let i = 0; i < 3; i++) {
        petalsRef.current.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 80,
          y: mouseRef.current.y - 20,
          size: Math.random() * 6 + 3,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.08,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 1.5 + 0.5,
          life: 1,
          decay: Math.random() * 0.008 + 0.004,
          // Pink sakura colors matched to site
          color: Math.random() > 0.5 ? 'rgba(0,255,102,' : 'rgba(255,180,200,',
        });
      }
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleLeave);
    window.addEventListener('resize', resize);

    // ─── Drawing helpers ────────────────────────────────
    function drawMountains(W, H) {
      // Far mountains
      ctx.fillStyle = '#0a1a0a';
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(0, H * 0.55);
      ctx.bezierCurveTo(W * 0.15, H * 0.35, W * 0.25, H * 0.45, W * 0.35, H * 0.5);
      ctx.bezierCurveTo(W * 0.45, H * 0.55, W * 0.5, H * 0.38, W * 0.6, H * 0.42);
      ctx.bezierCurveTo(W * 0.75, H * 0.48, W * 0.85, H * 0.32, W, H * 0.45);
      ctx.lineTo(W, H);
      ctx.fill();

      // Near hills
      ctx.fillStyle = '#0d1f0d';
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(0, H * 0.7);
      ctx.bezierCurveTo(W * 0.2, H * 0.6, W * 0.35, H * 0.72, W * 0.5, H * 0.68);
      ctx.bezierCurveTo(W * 0.65, H * 0.64, W * 0.8, H * 0.72, W, H * 0.65);
      ctx.lineTo(W, H);
      ctx.fill();
    }

    function drawTorii(x, y, scale, W) {
      ctx.strokeStyle = '#00ff66';
      ctx.lineWidth = 2.5 * scale;
      ctx.lineCap = 'round';

      // Two main pillars
      const pillarW = 15 * scale;
      ctx.beginPath();
      ctx.moveTo(x - pillarW, y);
      ctx.lineTo(x - pillarW, y - 50 * scale);
      ctx.moveTo(x + pillarW, y);
      ctx.lineTo(x + pillarW, y - 50 * scale);
      ctx.stroke();

      // Top beam (kasagi) - slightly curved
      ctx.lineWidth = 3 * scale;
      ctx.beginPath();
      ctx.moveTo(x - pillarW - 12 * scale, y - 48 * scale);
      ctx.quadraticCurveTo(x, y - 55 * scale, x + pillarW + 12 * scale, y - 48 * scale);
      ctx.stroke();

      // Middle beam (nuki)
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(x - pillarW - 5 * scale, y - 38 * scale);
      ctx.lineTo(x + pillarW + 5 * scale, y - 38 * scale);
      ctx.stroke();
    }

    function drawTemple(x, y, scale) {
      ctx.strokeStyle = '#00ff6640';
      ctx.fillStyle = '#0a150a';
      ctx.lineWidth = 1.5 * scale;

      // Base
      const bw = 30 * scale;
      const bh = 20 * scale;
      ctx.fillRect(x - bw / 2, y - bh, bw, bh);
      ctx.strokeRect(x - bw / 2, y - bh, bw, bh);

      // Roof
      ctx.strokeStyle = '#00ff6660';
      ctx.beginPath();
      ctx.moveTo(x - bw / 2 - 8 * scale, y - bh);
      ctx.lineTo(x, y - bh - 18 * scale);
      ctx.lineTo(x + bw / 2 + 8 * scale, y - bh);
      ctx.stroke();
      ctx.fillStyle = '#061006';
      ctx.fill();

      // Second tier roof
      ctx.strokeStyle = '#00ff6640';
      ctx.beginPath();
      ctx.moveTo(x - bw / 2 + 3 * scale, y - bh - 18 * scale);
      ctx.lineTo(x, y - bh - 30 * scale);
      ctx.lineTo(x + bw / 2 - 3 * scale, y - bh - 18 * scale);
      ctx.stroke();

      // Door
      ctx.strokeStyle = '#00ff6630';
      ctx.strokeRect(x - 4 * scale, y - bh * 0.7, 8 * scale, bh * 0.7);
    }

    function drawGround(W, H) {
      // Ground plane
      ctx.fillStyle = '#081208';
      ctx.beginPath();
      ctx.moveTo(0, H * 0.78);
      ctx.bezierCurveTo(W * 0.3, H * 0.76, W * 0.7, H * 0.8, W, H * 0.77);
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.fill();
    }

    function drawStars(W, H, time) {
      for (let i = 0; i < 60; i++) {
        const sx = (Math.sin(i * 137.5) * 0.5 + 0.5) * W;
        const sy = (Math.cos(i * 83.7) * 0.5 + 0.5) * H * 0.5;
        const twinkle = Math.sin(time * 0.002 + i) * 0.3 + 0.4;
        ctx.fillStyle = `rgba(255,255,255,${twinkle * 0.3})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawMoon(W, H, time) {
      const mx = W * 0.8;
      const my = H * 0.2;
      // Moon glow
      const grd = ctx.createRadialGradient(mx, my, 5, mx, my, 60);
      grd.addColorStop(0, 'rgba(0,255,102,0.08)');
      grd.addColorStop(1, 'rgba(0,255,102,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(mx, my, 60, 0, Math.PI * 2);
      ctx.fill();

      // Moon body
      ctx.fillStyle = '#00ff6620';
      ctx.beginPath();
      ctx.arc(mx, my, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawPetals(time) {
      petalsRef.current = petalsRef.current.filter(p => p.life > 0);
      for (const p of petalsRef.current) {
        p.x += p.vx + Math.sin(time * 0.003 + p.rotation) * 0.5;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.life -= p.decay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.life;

        // Draw petal shape
        ctx.fillStyle = p.color + p.life + ')';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Inner petal detail
        ctx.fillStyle = p.color + (p.life * 0.5) + ')';
        ctx.beginPath();
        ctx.ellipse(p.size * 0.2, 0, p.size * 0.5, p.size * 0.3, 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    // ─── Main render loop ───────────────────────────────
    const render = (time) => {
      const W = cw();
      const H = ch();
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Sky gradient
      const skyGrd = ctx.createLinearGradient(0, 0, 0, H);
      skyGrd.addColorStop(0, '#020802');
      skyGrd.addColorStop(0.5, '#040d04');
      skyGrd.addColorStop(1, '#081208');
      ctx.fillStyle = skyGrd;
      ctx.fillRect(0, 0, W, H);

      drawStars(W, H, time);
      drawMoon(W, H, time);
      drawMountains(W, H);
      drawGround(W, H);

      // Temple on left
      const groundY = H * 0.78;
      drawTemple(W * 0.12, groundY, 1.2);

      // Torii gate next to temple
      drawTorii(W * 0.22, groundY, 1.0, W);

      // Smaller torii in distance
      drawTorii(W * 0.45, H * 0.68, 0.5, W);

      // Sakura petals
      drawPetals(time);

      // Subtle scan line for depth
      ctx.fillStyle = 'rgba(0,255,102,0.01)';
      const scanY = (time * 0.05) % H;
      ctx.fillRect(0, scanY, W, 1);

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
    <div className="relative w-full h-[35vh] overflow-hidden bg-black border-y border-white/5">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      {/* Subtle hint */}
      <div className="absolute bottom-4 left-[5vw] flex items-center gap-3 z-10 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse" />
        <span className="text-[0.55rem] font-mono uppercase tracking-widest text-neutral-700">
          Bewege den Cursor für Sakura
        </span>
      </div>
    </div>
  );
}
