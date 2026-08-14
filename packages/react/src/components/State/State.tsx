import type { ReactElement } from 'react';
import { STATE_LAYOUT } from '../../constants/layout';
import { renderState } from '../../core/renderState';
import { resolveState } from '../../core/resolveState';
import type { StateProps } from './State.types';

/**
 * Renders application UI for loading, error, empty, or success states.
 *
 * Priority order: loading → error → empty → children.
 * Only one state renders at a time.
 */
export function State({
  loading = false,
  error,
  empty = false,
  layout = STATE_LAYOUT.default,
  loaderType,
  loaderSize,
  loaderColor,
  loaderSpeed,
  loaderTheme,
  loaderBackground,
  loaderBackgroundOpacity,
  loaderProgress,
  loadingTitle,
  loadingDescription,
  loadingTitleColor,
  loadingDescriptionColor,
  emptyTitle,
  emptyDescription,
  emptyTitleColor,
  emptyDescriptionColor,
  emptyIcon,
  emptyBackground,
  emptyBackgroundOpacity,
  errorTitle,
  errorDescription,
  errorTitleColor,
  errorDescriptionColor,
  errorIcon,
  errorBackground,
  errorBackgroundOpacity,
  errorRetryLabel,
  errorRetryStyle,
  errorRetryComponent,
  errorHideRetry,
  loadingComponent,
  emptyComponent,
  errorComponent,
  onRetry,
  children,
}: StateProps): ReactElement | null {
  const resolved = resolveState({ loading, error, empty });

  return renderState(resolved, {
    children,
    layout,
    loaderType,
    loaderSize,
    loaderColor,
    loaderSpeed,
    loaderTheme,
    loaderBackground,
    loaderBackgroundOpacity,
    loaderProgress,
    loadingTitle,
    loadingDescription,
    loadingTitleColor,
    loadingDescriptionColor,
    emptyTitle,
    emptyDescription,
    emptyTitleColor,
    emptyDescriptionColor,
    emptyIcon,
    emptyBackground,
    emptyBackgroundOpacity,
    errorTitle,
    errorDescription,
    errorTitleColor,
    errorDescriptionColor,
    errorIcon,
    errorBackground,
    errorBackgroundOpacity,
    errorRetryLabel,
    errorRetryStyle,
    errorRetryComponent,
    errorHideRetry,
    loadingComponent,
    emptyComponent,
    errorComponent,
    onRetry,
  });
}
