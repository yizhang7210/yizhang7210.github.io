// Colours shared by the garden drawing and its legend.
import { stoneLook as look } from './stoneLook';

export function hexToRgb(hex: string) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

// Mix two colours: amt = 0 keeps `hex`, amt = 1 gives `other`.
export function mix(hex: string, other: string, amt: number) {
  const a = hexToRgb(hex);
  const b = hexToRgb(other);
  const m = (x: number, y: number) => Math.round(x + (y - x) * amt);
  return `rgb(${m(a.r, b.r)}, ${m(a.g, b.g)}, ${m(a.b, b.b)})`;
}

// Real stone is mostly grey — the country colour is just a mineral cast through it.
export const stoneFill = (c: string) => mix(c, look.base, 1 - look.tint);
export const stoneEdge = (c: string) => mix(c, '#4a4740', 0.72);

// Scope & responsibility flowers.
export const flowerPetal = '#e0443a';
export const flowerCentre = '#f6c445';
export const flowerOutline = '#9c241c';

// Legend dots are drawn as tiny stones: the stones' fill, lit at the top-left and falling into
// shade at the bottom-right, the way the stone texture's lighting renders the real ones.
export function legendDotStyle(countryHex: string) {
  const c = hexToRgb(countryHex);
  const b = hexToRgb(look.base);
  const fill = [c.r, c.g, c.b].map((v, i) => v * look.tint + [b.r, b.g, b.b][i] * (1 - look.tint));
  const rgb = (k: (v: number) => number) => `rgb(${fill.map((v) => Math.round(k(v))).join(', ')})`;
  const lit = rgb((v) => v + (255 - v) * 0.22);
  const mid = rgb((v) => v * 1.06);
  const shade = rgb((v) => v * 0.8);
  return `background:radial-gradient(circle at 35% 30%, ${lit} 0%, ${mid} 45%, ${shade} 100%);border:1px solid rgba(40, 38, 32, 0.25);width:15px;height:15px;border-radius:50%;display:inline-block;`;
}
