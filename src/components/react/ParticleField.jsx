import React, { useEffect, useRef } from 'react';

export default function ParticleField() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const PARTICLE_COUNT = 300;
    const REPEL_RADIUS = 120;
    const REPEL_FORCE = 8;
    const RETURN_SPEED = 0.03;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // Initialize particles
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x, y,
        originX: x,
        originY: y,
        size: Math.random() * 2 + 0.5,
        // Color: mix of accent green, blue, and white
        colorR: Math.random() > 0.7 ? 0 : (Math.random() > 0.5 ? 0 : 255),
        colorG: Math.random() > 0.3 ? 255 : (Math.random() > 0.5 ? 102 : 255),
        colorB: Math.random() > 0.5 ? 102 : (Math.random() > 0.5 ? 255 : 255),
        alpha: Math.random() * 0.5 + 0.1,
        vx: 0,
        vy: 0,
        // Subtle float
        floatSpeed: Math.random() * 0.002 + 0.001,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        // Float animation
        const floatX = Math.sin(time * p.floatSpeed + p.floatOffset) * 2;
        const floatY = Math.cos(time * p.floatSpeed * 0.7 + p.floatOffset) * 2;

        // Repulsion from cursor
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Return to origin with float
        p.vx += (p.originX + floatX - p.x) * RETURN_SPEED;
        p.vy += (p.originY + floatY - p.y) * RETURN_SPEED;

        // Damping
        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorR},${p.colorG},${p.colorB},${p.alpha})`;
        ctx.fill();

        // Draw connections to nearby particles
        for (const p2 of particles) {
          if (p === p2) continue;
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,255,102,${0.03 * (1 - d / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', () => {
      resize();
      // Redistribute particles on resize
      particles.forEach(p => {
        p.originX = Math.random() * canvas.width;
        p.originY = Math.random() * canvas.height;
      });
    });

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] w-full h-full"
      style={{ pointerEvents: 'auto' }}
    />
  );
}
