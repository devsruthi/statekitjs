import { createElement, type ReactElement } from 'react';
import { Loading as DefaultLoading } from '../components/Loading';
import {
  GridSkeleton,
  ListSkeleton,
  TableSkeleton,
} from '../components/skeletons';
import { STATE_LAYOUT, type StateLayout } from '../constants/layout';
import type {
  LoaderBackground,
  LoaderColor,
  LoaderSize,
  LoaderSpeed,
  LoaderTheme,
  LoaderType,
} from '../constants/loader';

export type RenderLoadingOptions = {
  title?: string;
  description?: string;
  titleColor?: string;
  descriptionColor?: string;
  type?: LoaderType;
  size?: LoaderSize;
  color?: LoaderColor;
  speed?: LoaderSpeed;
  theme?: LoaderTheme;
  background?: LoaderBackground;
  backgroundOpacity?: number;
  progress?: number;
};

/**
 * Selects the loading presentation for a given layout hint.
 */
export function renderLoading(
  layout: StateLayout = STATE_LAYOUT.default,
  {
    title,
    description,
    titleColor,
    descriptionColor,
    type,
    size,
    color,
    speed,
    theme,
    background,
    backgroundOpacity,
    progress,
  }: RenderLoadingOptions = {},
): ReactElement {
  switch (layout) {
    case STATE_LAYOUT.table:
      return createElement(TableSkeleton, { label: title });
    case STATE_LAYOUT.grid:
      return createElement(GridSkeleton, { label: title });
    case STATE_LAYOUT.list:
      return createElement(ListSkeleton, { label: title });
    case STATE_LAYOUT.default:
    default:
      return createElement(DefaultLoading, {
        title,
        description,
        titleColor,
        descriptionColor,
        type,
        size,
        color,
        speed,
        theme,
        background,
        backgroundOpacity,
        progress,
      });
  }
}
