export const graphiteVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const graphiteFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform float uIntensity;

  varying vec2 vUv;

  // Simplex-style hash noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rot * p * 2.05;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 centered = (uv - 0.5) * aspect;

    // Scroll-driven dispersion band — sweeps downward as progress increases
    float band = smoothstep(uProgress - 0.35, uProgress + 0.05, uv.y);
    float edge = smoothstep(uProgress - 0.08, uProgress, uv.y);

    // Liquid smoke / graphite dust turbulence
    vec2 flow = vec2(
      fbm(centered * 2.4 + vec2(uTime * 0.04, uProgress * 1.8)),
      fbm(centered * 2.1 - vec2(uProgress * 1.2, uTime * 0.03))
    );

    float dust = fbm(centered * 4.5 + flow * 1.6 + uProgress * 2.0);
    float wisps = fbm(centered * 8.0 - vec2(uTime * 0.06, uProgress * 3.0));

    float dispersion = mix(dust, wisps, edge) * band;
    dispersion *= uIntensity;

    // Luxury palette: milk-white base, graphite gray dust, crimson whisper
    vec3 baseMilk = vec3(0.98, 0.97, 0.95);
    vec3 graphite = vec3(0.55, 0.53, 0.50);
    vec3 crimson = vec3(0.48, 0.016, 0.063);

    vec3 color = mix(baseMilk, graphite, dispersion * 0.75);
    color = mix(color, crimson, dispersion * edge * 0.28);

    // Soft vignette to keep focus on center content
    float vignette = 1.0 - smoothstep(0.35, 1.2, length(centered));
    color *= mix(0.82, 1.0, vignette);

    float alpha = dispersion * 0.72 * band;

    gl_FragColor = vec4(color, alpha);
  }
`;
