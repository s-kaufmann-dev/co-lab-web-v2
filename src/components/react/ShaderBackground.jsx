import React, { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;
      uniform vec2 mouse;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 center = mouse;
        
        float dist = distance(uv, center);
        
        // Concentric ripple rings
        float ripple1 = sin(dist * 40.0 - time * 3.0) * 0.5 + 0.5;
        float ripple2 = sin(dist * 25.0 - time * 2.0 + 1.5) * 0.5 + 0.5;
        float ripple3 = sin(dist * 60.0 - time * 4.0 + 3.0) * 0.5 + 0.5;
        
        // Fade out from center
        float fade = 1.0 - smoothstep(0.0, 0.8, dist);
        
        // Color channels with neon green accent
        float r = ripple1 * 0.02 * fade;
        float g = (ripple1 * 0.08 + ripple2 * 0.04) * fade;
        float b = ripple3 * 0.03 * fade;
        
        // Subtle vignette
        float vignette = 1.0 - length(uv - 0.5) * 0.6;
        
        gl_FragColor = vec4(r * vignette, g * vignette, b * vignette, 1.0);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'time');
    const resLoc = gl.getUniformLocation(program, 'resolution');
    const mouseLoc = gl.getUniformLocation(program, 'mouse');

    let animId;
    function render(now) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, now * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseRef.current.x, 1.0 - mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const handleMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouse);
    handleResize();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full pointer-events-none opacity-60" />;
}
