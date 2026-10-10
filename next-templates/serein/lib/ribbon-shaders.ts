export const ribbonVertex = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * .5 + .5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;
export const ribbonFragment = `
precision mediump float;
uniform sampler2D uImage;
uniform float uTime;
uniform float uAspect;
uniform float uImageAspect;
varying vec2 vUv;
void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);
  float ratio = uAspect / uImageAspect;
  if (ratio > 1.0) uv.y = (uv.y - .5) / ratio + .5;
  else uv.x = (uv.x - .5) * ratio + .5;
  float t = uTime * .23;
  float mask = sin(uv.x * 3.14159) * sin(uv.y * 3.14159);
  uv.x += (sin(uv.y * 7.0 + t) * .020 + cos(uv.x * 5.0 - t * .7) * .008) * mask;
  uv.y += (cos(uv.x * 6.0 + t * .8) * .025 + sin(uv.y * 8.0 - t) * .012) * mask;
  vec3 material = texture2D(uImage, clamp(uv, .001, .999)).rgb;
  material = max(material * 1.06, vec3(.035294));
  gl_FragColor = vec4(material, 1.0);
}`;
