export const nebulaVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const nebulaFragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  void main() {
    vec2 uv = vUv - 0.5;
    float d = length(uv * vec2(1.6, 1.0));
    float glow = smoothstep(0.9, 0.0, d) * 0.35;
    float swirl = sin((uv.x + uv.y) * 3.0 + uTime * 0.15) * 0.02;
    vec3 color = mix(uColorA, uColorB, glow + swirl);
    gl_FragColor = vec4(color, glow * 1.3);
  }
`
