import { useRef, useEffect } from 'react';

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;

  // Desaturated teal/slate & accentuated sage palette
  const vec3 COL_BLACK = vec3(0.001, 0.002, 0.004);
  const vec3 COL_TEAL  = vec3(0.14, 0.28, 0.34);  // Muted, desaturated slate-teal
  const vec3 COL_SAGE  = vec3(0.682, 0.741, 0.600); // #AEBD99 (Sage)

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  float bayer4(vec2 pos) {
    vec2 p = floor(mod(pos, 4.0));
    float m = mod(floor(p.x / 2.0) + floor(p.y / 2.0) * 2.0, 4.0) * 4.0;
    m += mod(mod(p.x, 2.0) + mod(p.y, 2.0) * 2.0, 4.0);
    return m / 16.0;
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / u_resolution.y;

    // Origin at Top-Right
    vec2 trUV = vec2((1.0 - uv.x) * aspect, 1.0 - uv.y);

    float t = u_time * 0.25;

    // Parallel ray direction coming from Top-Right (~32 deg)
    float angle = 0.56;
    vec2 rayDir = vec2(cos(angle), sin(angle));
    vec2 perpDir = vec2(-sin(angle), cos(angle));

    float streamPos = dot(trUV, rayDir);
    float bandPos = dot(trUV, perpDir);

    // --- Base Parallel Light Beams ---
    float bands = 0.0;
    bands += sin(bandPos * 8.0  + t * 0.5) * 0.35;
    bands += sin(bandPos * 16.0 - t * 0.3) * 0.20;
    bands += sin(bandPos * 26.0 + t * 0.8) * 0.12;
    bands += sin(bandPos * 4.0  + t * 0.2) * 0.25;
    bands = bands * 0.5 + 0.5;

    // --- Organic Noise & Shadows ---
    vec2 mistUV1 = vec2(bandPos * 2.5 + t * 0.15, streamPos * 1.5 - t * 0.6);
    float mist1 = fbm(mistUV1);

    vec2 shadowUV = vec2(bandPos * 1.2 - t * 0.1, streamPos * 0.8 + t * 0.3);
    float shadowPatches = fbm(shadowUV);
    
    float brightnessModulation = smoothstep(0.1, 0.85, shadowPatches) * 0.7 + 0.35;

    float rayPattern = mix(bands, mist1, 0.5) * brightnessModulation;

    // --- Falloff Curve from Top-Right ---
    float falloff = 1.0 - smoothstep(0.0, 1.65 * aspect, streamPos);
    falloff = pow(max(0.0, falloff), 1.2);

    float sourceGlow = exp(-length(trUV) * 1.3) * 0.35;

    float finalLight = (rayPattern * falloff + sourceGlow) * 1.05;
    finalLight = clamp(finalLight, 0.0, 1.0);

    // --- Color Mapping (Desaturated Blue/Slate, Accentuated #AEBD99 Sage) ---
    vec3 color;
    float tTeal = smoothstep(0.02, 0.40, finalLight);
    // Accentuate #AEBD99: starts spreading earlier & dominates mid-to-bright regions
    float tSage = smoothstep(0.32, 0.78, finalLight);

    color = mix(COL_BLACK, COL_TEAL, tTeal);
    color = mix(color, COL_SAGE, tSage);

    // --- Dithering & Fine Grain ---
    vec2 pixelPos = gl_FragCoord.xy / 2.0;
    float dither = (bayer4(pixelPos) - 0.5) * 0.15;
    color += dither;

    float grain = (hash(gl_FragCoord.xy + fract(u_time * 7.0) * 1000.0) - 0.5) * 0.05;
    color += grain;

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vs, fs) {
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

export default function DitheringShader() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'a_position');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);
    const t0 = performance.now();

    const render = () => {
      gl.useProgram(program);
      gl.enableVertexAttribArray(aPos);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
