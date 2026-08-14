import type { ReactElement, ReactNode } from 'react';
import surface from '../../styles/surface.module.css';
import { cx } from '../../utils/cx';
import {
  resolveSurfaceBackground,
  SURFACE_BACKGROUND_DEFAULTS,
  type SurfaceBackground,
} from '../../utils/resolveSurfaceBackground';
import styles from './Empty.module.css';

export type EmptyProps = {
  /**
   * Visible title announced to assistive technologies.
   * @default "No records found"
   */
  title?: string;
  /**
   * Supporting copy shown below the title.
   * @default "There are no records to display."
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
   * Replaces the entire built-in empty icon SVG.
   * When set, the default search icon is not rendered.
   */
  icon?: ReactNode;
  /**
   * Surface background.
   * - `"none"` → transparent (default)
   * - `[color]` → solid
   * - `[from, to, …]` → linear gradient
   * @default "none"
   */
  background?: SurfaceBackground;
  /**
   * Opacity for `background` when colors are set (0–1).
   * @default 1
   */
  backgroundOpacity?: number;
};

/**
 * Built-in empty presentation used by State.
 * Internal only — not part of the public package API.
 */
function DefaultEmptyIcon(): ReactElement {
  return (
    <svg
      className={styles.iconSvg}
      viewBox="0 0 48 48"
      width="48"
      height="48"
      aria-hidden="true"
      focusable="false"
    >
      <circle className={styles.iconLens} cx="21" cy="21" r="12.5" />
      <path className={styles.iconHandle} d="M30.2 30.2 41 41" fill="none" />
    </svg>
  );
}

export function Empty({
  title = 'No records found',
  description = 'There are no records to display.',
  titleColor,
  descriptionColor,
  icon,
  background = SURFACE_BACKGROUND_DEFAULTS.background,
  backgroundOpacity = SURFACE_BACKGROUND_DEFAULTS.backgroundOpacity,
}: EmptyProps): ReactElement {
  const { mode: backgroundMode, style: backgroundStyle } =
    resolveSurfaceBackground(background, backgroundOpacity);

  return (
    <section
      className={cx(surface.surface, styles.root)}
      style={backgroundStyle}
      data-statekit=""
      data-empty-background={backgroundMode}
      role="status"
      aria-live="polite"
    >
      <div className={styles.icon} aria-hidden="true">
        {icon != null ? icon : <DefaultEmptyIcon />}
      </div>
      <div className={surface.copy}>
        <h2
          className={surface.title}
          style={titleColor ? { color: titleColor } : undefined}
        >
          {title}
        </h2>
        <p
          className={surface.description}
          style={descriptionColor ? { color: descriptionColor } : undefined}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
