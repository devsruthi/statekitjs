import type { CSSProperties } from 'react';

/**
 * One or more CSS colors for a state surface background.
 * - 1 color → solid
 * - 2+ colors → linear gradient
 */
export type SurfaceColor = readonly [string, ...string[]];

/**
 * Built-in state surface background.
 * - `"none"` → transparent (default)
 * - `[color]` → solid
 * - `[from, to, …]` → linear gradient
 */
export type SurfaceBackground = 'none' | SurfaceColor;

export const SURFACE_BACKGROUND_DEFAULTS = {
  background: 'none' as const satisfies SurfaceBackground,
  backgroundOpacity: 1,
} as const;

function clampOpacity(value: number): number {
  if (Number.isNaN(value)) {
    return SURFACE_BACKGROUND_DEFAULTS.backgroundOpacity;
  }

  return Math.min(1, Math.max(0, value));
}

function withOpacity(color: string, opacity: number): string {
  const pct = clampOpacity(opacity) * 100;
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`;
}

/**
 * Resolves a surface background into an inline style that overrides
 * the shared `.surface` elevated fill.
 */
export function resolveSurfaceBackground(
  background: SurfaceBackground = SURFACE_BACKGROUND_DEFAULTS.background,
  opacity: number = SURFACE_BACKGROUND_DEFAULTS.backgroundOpacity,
): {
  mode: 'none' | 'solid' | 'gradient';
  style: CSSProperties;
} {
  if (background === 'none' || background.length === 0) {
    return {
      mode: 'none',
      style: { background: 'transparent' },
    };
  }

  const colors = background;
  const clamped = clampOpacity(opacity);
  const mode = colors.length > 1 ? 'gradient' : 'solid';
  const fill =
    mode === 'solid'
      ? withOpacity(colors[0]!, clamped)
      : `linear-gradient(135deg, ${colors
          .map((color) => withOpacity(color, clamped))
          .join(', ')})`;

  return {
    mode,
    style: { background: fill },
  };
}
