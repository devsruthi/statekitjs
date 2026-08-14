import type { ReactElement } from 'react';
import {
  LOADER_DEFAULTS,
  LOADER_SIZE,
  LOADER_SPEED,
  LOADER_THEME,
  type LoaderBackground,
  type LoaderColor,
  type LoaderSize,
  type LoaderSpeed,
  type LoaderTheme,
  type LoaderType,
} from '../../constants/loader';
import surface from '../../styles/surface.module.css';
import { cx } from '../../utils/cx';
import { resolveSurfaceBackground } from '../../utils/resolveSurfaceBackground';
import { LoaderGraphic } from './LoaderGraphic';
import styles from './Loading.module.css';

export type LoadingProps = {
  /**
   * Loader visual variant.
   * @default "ring"
   */
  type?: LoaderType;
  /**
   * Loader size scale.
   * @default "md"
   */
  size?: LoaderSize;
  /**
   * One or more CSS colors.
   * - `[color]` → solid
   * - `[from, to, ...]` → gradient
   * @default ["#4F46E5"]
   */
  color?: LoaderColor;
  /**
   * Animation speed.
   * @default "normal"
   */
  speed?: LoaderSpeed;
  /**
   * Color theme for the loading surface.
   * @default "auto"
   */
  theme?: LoaderTheme;
  /**
   * Surface background behind the loader.
   * - `"none"` → transparent (default)
   * - `[color]` → solid
   * - `[from, to, …]` → linear gradient
   * @default "none"
   */
  background?: LoaderBackground;
  /**
   * Opacity for `background` when colors are set (0–1).
   * @default 1
   */
  backgroundOpacity?: number;
  /**
   * Primary label (also accepted as `title` for backwards compatibility).
   * @default "Loading..."
   */
  text?: string;
  /**
   * Secondary label (also accepted as `description`).
   * @default "Please wait a moment"
   */
  subtext?: string;
  /**
   * @deprecated Prefer `text`.
   */
  title?: string;
  /**
   * @deprecated Prefer `subtext`.
   */
  description?: string;
  /**
   * CSS color for the title.
   */
  titleColor?: string;
  /**
   * CSS color for the description.
   */
  descriptionColor?: string;
  /**
   * Progress percentage (0–100) for `progress-circle` and `progress-bar`.
   */
  progress?: number;
};

const SIZE_CLASS: Record<LoaderSize, string> = {
  [LOADER_SIZE.xs]: styles.size_xs!,
  [LOADER_SIZE.sm]: styles.size_sm!,
  [LOADER_SIZE.md]: styles.size_md!,
  [LOADER_SIZE.lg]: styles.size_lg!,
  [LOADER_SIZE.xl]: styles.size_xl!,
};

const SPEED_CLASS: Record<LoaderSpeed, string> = {
  [LOADER_SPEED.slow]: styles.speed_slow!,
  [LOADER_SPEED.normal]: styles.speed_normal!,
  [LOADER_SPEED.fast]: styles.speed_fast!,
};

/**
 * Built-in loading presentation used by State.
 * Internal only — not part of the public package API.
 */
export function Loading({
  type = LOADER_DEFAULTS.type,
  size = LOADER_DEFAULTS.size,
  color = LOADER_DEFAULTS.color,
  speed = LOADER_DEFAULTS.speed,
  theme = LOADER_DEFAULTS.theme,
  background = LOADER_DEFAULTS.background,
  backgroundOpacity = LOADER_DEFAULTS.backgroundOpacity,
  text,
  subtext,
  title,
  description,
  titleColor,
  descriptionColor,
  progress,
}: LoadingProps): ReactElement {
  const label = text ?? title ?? LOADER_DEFAULTS.text;
  const detail = subtext ?? description ?? LOADER_DEFAULTS.subtext;
  const themeAttr =
    theme === LOADER_THEME.auto
      ? undefined
      : theme === LOADER_THEME.dark
        ? 'dark'
        : 'light';
  const { mode: backgroundMode, style: backgroundStyle } =
    resolveSurfaceBackground(background, backgroundOpacity);

  return (
    <section
      className={cx(
        surface.surface,
        styles.root,
        SIZE_CLASS[size],
        SPEED_CLASS[speed],
      )}
      style={backgroundStyle}
      data-statekit=""
      data-statekit-theme={themeAttr}
      data-loader-type={type}
      data-loader-size={size}
      data-loader-color={color.length > 1 ? 'gradient' : 'solid'}
      data-loader-speed={speed}
      data-loader-background={backgroundMode}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
    >
      <div className={cx(surface.media, styles.media)} aria-hidden="true">
        <LoaderGraphic type={type} color={color} progress={progress} />
      </div>
      <div className={surface.copy}>
        <h2
          className={surface.title}
          style={titleColor ? { color: titleColor } : undefined}
        >
          {label}
        </h2>
        {detail ? (
          <p
            className={surface.description}
            style={descriptionColor ? { color: descriptionColor } : undefined}
          >
            {detail}
          </p>
        ) : null}
      </div>
    </section>
  );
}
