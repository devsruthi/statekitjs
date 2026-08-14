import type { CSSProperties, ReactElement, ReactNode } from 'react';
import surface from '../../styles/surface.module.css';
import { cx } from '../../utils/cx';
import {
  resolveSurfaceBackground,
  SURFACE_BACKGROUND_DEFAULTS,
  type SurfaceBackground,
} from '../../utils/resolveSurfaceBackground';
import styles from './Error.module.css';

export type ErrorProps = {
  /**
   * Error value retained for API compatibility with State.
   * Default copy does not display the raw error message.
   */
  error?: unknown;
  /**
   * Visible title announced via the alert role.
   * @default "Something went wrong!"
   */
  title?: string;
  /**
   * Supporting copy.
   * @default "Unable to load the content."
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
   * Replaces the entire built-in error icon SVG.
   * When set, the default warning triangle is not rendered.
   */
  icon?: ReactNode;
  /**
   * Optional retry handler for the built-in retry button.
   */
  onRetry?: () => void;
  /**
   * Label for the built-in retry button.
   * @default "Try again"
   */
  retryLabel?: string;
  /**
   * Inline styles for the built-in retry button.
   */
  retryStyle?: CSSProperties;
  /**
   * Replaces the built-in retry button. When set, `retryLabel` and
   * `retryStyle` are ignored. Wire click handling inside the component.
   */
  retryComponent?: ReactNode;
  /**
   * When true, hides the built-in retry button (and `retryComponent`).
   * @default false
   */
  hideRetry?: boolean;
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
 * Built-in error presentation used by State.
 * Internal only — not part of the public package API.
 */
function DefaultErrorIcon(): ReactElement {
  return (
    <svg
      className={styles.iconSvg}
      viewBox="0 0 48 48"
      width="48"
      height="48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.iconShape}
        d="M24 4.5 3.2 41.2A2.4 2.4 0 0 0 5.3 44.8h37.4a2.4 2.4 0 0 0 2.1-3.6L24 4.5Z"
      />
      <path
        className={styles.iconMark}
        d="M24 16.2c1.1 0 1.9.9 1.8 2l-.9 12.4c0 .7-.6 1.3-1.3 1.3s-1.2-.6-1.3-1.3L21.4 18.2c-.1-1.1.7-2 1.8-2H24Zm0 22.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z"
      />
    </svg>
  );
}

export function Error({
  error: _error,
  title = 'Something went wrong!',
  description = 'Unable to load the content.',
  titleColor,
  descriptionColor,
  icon,
  onRetry,
  retryLabel = 'Try again',
  retryStyle,
  retryComponent,
  hideRetry = false,
  background = SURFACE_BACKGROUND_DEFAULTS.background,
  backgroundOpacity = SURFACE_BACKGROUND_DEFAULTS.backgroundOpacity,
}: ErrorProps): ReactElement {
  const { mode: backgroundMode, style: backgroundStyle } =
    resolveSurfaceBackground(background, backgroundOpacity);

  const retryAction = hideRetry ? null : retryComponent != null ? (
    retryComponent
  ) : (
    <button
      type="button"
      className={styles.retry}
      style={retryStyle}
      onClick={onRetry}
    >
      {retryLabel}
    </button>
  );

  return (
    <section
      className={cx(surface.surface, styles.root)}
      style={backgroundStyle}
      data-statekit=""
      data-error-background={backgroundMode}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.icon} aria-hidden="true">
        {icon != null ? icon : <DefaultErrorIcon />}
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
      {retryAction}
    </section>
  );
}
