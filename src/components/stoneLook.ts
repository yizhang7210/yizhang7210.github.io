// The stepping stones' look: a mossy garden boulder. Supplies the rock's base colour, how much of
// the country colour shows through, text colour, and the SVG filter that gives it its surface.

export type StoneLook = {
  base: string; // the rock's own colour
  tint: number; // 0 = pure rock, 1 = pure country colour
  nameFill: string;
  edgeOpacity: number;
  filter: string; // inner markup of the stone's <filter>
};

// --- Filter building blocks. Each reads/writes named results inside one <filter>. ---

// Height map: a blurred silhouette (rounded dome) plus bumps.
const height = (dome: number, freq: string, octaves: number, seed: number, bump: number) => `
  <feGaussianBlur in="SourceAlpha" stdDeviation="${dome}" result="dome" />
  <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${octaves}" seed="${seed}" result="bumps" />
  <feComposite in="dome" in2="bumps" operator="arithmetic" k1="0" k2="1" k3="${bump}" k4="0" result="height" />`;

// Specks of another mineral, from thresholded noise.
const specks = (result: string, freq: number, seed: number, rgb: [number, number, number], cut: number, slope = 12) => `
  <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="${seed}" result="${result}N" />
  <feColorMatrix in="${result}N" type="matrix" values="0 0 0 0 ${rgb[0]}  0 0 0 0 ${rgb[1]}  0 0 0 0 ${rgb[2]}  ${slope} 0 0 0 ${-cut * slope}" result="${result}" />`;

const merge = (result: string, layers: string[]) =>
  `<feMerge result="${result}">${layers.map((l) => `<feMergeNode in="${l}" />`).join('')}</feMerge>`;

// Light the surface: diffuse shading multiplied in, optional specular sheen added, then clip.
const light = (src: string, surface: number, elevation: number, gain: number, spec?: { exp: number; amount: number }) => `
  <feDiffuseLighting in="height" surfaceScale="${surface}" diffuseConstant="1" lighting-color="#ffffff" result="diff">
    <feDistantLight azimuth="225" elevation="${elevation}" />
  </feDiffuseLighting>
  <feComposite in="${src}" in2="diff" operator="arithmetic" k1="${gain}" k2="0" k3="0" k4="0" result="shaded" />
  ${
    spec
      ? `<feSpecularLighting in="height" surfaceScale="${surface}" specularConstant="0.9" specularExponent="${spec.exp}" lighting-color="#ffffff" result="spec">
    <feDistantLight azimuth="225" elevation="${elevation + 8}" />
  </feSpecularLighting>
  <feComposite in="shaded" in2="spec" operator="arithmetic" k1="0" k2="1" k3="${spec.amount}" k4="0" result="lit" />`
      : `<feMerge result="lit"><feMergeNode in="shaded" /></feMerge>`
  }
  <feComposite in="lit" in2="SourceAlpha" operator="in" />`;

export const stoneLook: StoneLook = {
  base: '#94918a',
  tint: 0.2,
  nameFill: '#eef3f6', // frost white — light lettering that reads cleanly on the mid-toned rock
  edgeOpacity: 0.25,
  filter:
    height(16, '0.05', 4, 6, 0.35) +
    // fewer, darker moss patches, with a deep-green leafy texture inside them
    specks('moss', 0.03, 41, [0.22, 0.31, 0.13], 0.67, 7) +
    specks('mossLight', 0.5, 43, [0.3, 0.39, 0.17], 0.6) +
    `<feComposite in="mossLight" in2="moss" operator="in" result="mossTex" />` +
    // only the odd muted lichen spot
    specks('lichen', 0.12, 47, [0.7, 0.69, 0.56], 0.75, 14) +
    merge('base', ['SourceGraphic', 'lichen', 'moss', 'mossTex']) +
    light('base', 6, 50, 1.28, { exp: 20, amount: 0.04 }),
};
