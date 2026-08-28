# @statekitjs/react

## 0.3.0

### Minor Changes

- 9f91834: Add StateKitProvider so apps can set brand loader, colors, and copy once.

## 0.2.2

### Patch Changes

- 5dbe91b: Keep loading, empty, and error title/description colors unchanged at any background opacity.

## 0.2.1

### Patch Changes

- d14277a: fix Storybook loader styles, docs/README updates

## 0.2.0

### Minor Changes

- Improve default empty and error icons, add `emptyIcon`, and set default `loaderSize` to `md`.

  - Replace circular badge icons with SVG-only warning triangle (error) and search (empty) icons
  - Add `emptyIcon` to customize the built-in empty icon (alongside existing `errorIcon`)
  - Change default `loaderSize` from `lg` to `md`
  - Add `spectrum` loader and related loader/progress refinements

## 0.1.1

### Patch Changes

- 796574b: Remove card border and background from loading, empty, and error states
