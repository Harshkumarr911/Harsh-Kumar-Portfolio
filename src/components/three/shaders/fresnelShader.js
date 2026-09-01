export const fresnelVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

export const fresnelFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform vec3 uColor;
  uniform float uIntensity;

  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.2);
    vec3 color = uColor * fresnel * uIntensity;
    gl_FragColor = vec4(color, fresnel * 0.9);
  }
`
