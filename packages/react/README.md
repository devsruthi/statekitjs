



# @statekitjs/react

Beautiful loading, empty, error and success states for React.

[npm version](https://www.npmjs.com/package/@statekitjs/react)  
[Docs](https://statekitjs-playground.vercel.app)  
[License: MIT](./LICENSE)  
TypeScript  
React



---

## Documentation

Interactive docs and live demos:

**[https://statekitjs-playground.vercel.app](https://statekitjs-playground.vercel.app)**

You can explore:

- **Live Demo** — try loading, empty, error, and success states interactively
- **Loaders** — spinner and progress variants, sizes, colors, and speeds
- **Getting Started** — installation and quick start
- **Loading / Empty / Error** — default UI, customized props, and fully custom components
- **API props** — full `State` prop reference with types and defaults
- **Examples & use cases** — copy-paste patterns for real apps

---

## Installation

```bash
npm install @statekitjs/react
```

or

```bash
pnpm add @statekitjs/react
```

---

## Quick example

```tsx
import { State } from '@statekitjs/react';

function UsersPage({ loading, error, users }) {
  return (
    <State
      loading={loading}
      error={error}
      empty={users.length === 0}
    >
      <UsersTable users={users} />
    </State>
  );
}
```

Customize copy, layouts, and default UI when you need to:

```tsx
<State
  loading={isLoading}
  error={error}
  empty={!users.length}
  layout="table"
  loadingTitle="Fetching users"
  errorTitle="Could not load users"
  errorRetryLabel="Retry now"
  errorRetryStyle={{ background: '#4F46E5', color: '#fff', border: 'none' }}
  onRetry={refetch}
>
  <UsersTable users={users} />
</State>
```

---

## `State` props

Priority when multiple flags are set: **loading → error → empty → children**.


| Prop                      | Type                                                                                                                                                                                                                               | Default                              | Description                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------- |
| `loading`                 | `boolean`                                                                                                                                                                                                                          | `false`                              | Renders the loading state. Highest priority.                                      |
| `error`                   | `unknown`                                                                                                                                                                                                                          | —                                    | When truthy, renders the error state. Accepts an `Error`, `string`, or any value. |
| `empty`                   | `boolean`                                                                                                                                                                                                                          | `false`                              | Renders the empty state.                                                          |
| `layout`                  | `"default" | "table" | "grid" | "list"`                                                                                                                                                                                            | `"default"`                          | Skeleton layout for the built-in loading state.                                   |
| `loaderType`              | `"ring" | "dots" | "circle-dots" | "pulse" | "bars" | "infinity" | "orbit" | "spokes" | "activity" | "ripple" | "aurora" | "bloom" | "eclipse" | "orbitals" | "flare" | "spectrum" | "gauge" | "progress-circle" | "progress-bar"` | `"ring"`                             | Built-in loader visual (default layout only).                                     |
| `loaderSize`              | `"xs" | "sm" | "md" | "lg" | "xl"`                                                                                                                                                                                                 | `"md"`                               | Built-in loader size.                                                             |
| `loaderColor`             | `[color]` or `[from, to, …]`                                                                                                                                                                                                       | `["#4F46E5"]`                        | Color array: 1 = solid, 2+ = gradient.                                            |
| `loaderSpeed`             | `"slow" | "normal" | "fast"`                                                                                                                                                                                                       | `"normal"`                           | Loader animation speed.                                                           |
| `loaderTheme`             | `"light" | "dark" | "auto"`                                                                                                                                                                                                        | `"auto"`                             | Theme for the built-in loading surface.                                           |
| `loaderBackground`        | `"none" | [color] | [from, to, …]`                                                                                                                                                                                                 | `"none"`                             | Loading surface background. One color = solid, 2+ = gradient.                     |
| `loaderBackgroundOpacity` | `number` (0–1)                                                                                                                                                                                                                     | `1`                                  | Opacity applied to `loaderBackground`.                                            |
| `loaderProgress`          | `number`                                                                                                                                                                                                                           | —                                    | Progress 0–100 for `progress-circle` / `progress-bar`.                            |
| `loadingTitle` | `string` | `"Loading..."` | Title for the default loading UI. |
| `loadingDescription` | `string` | `"Please wait a moment"` | Description for the default loading UI. |
| `loadingTitleColor` | `string` | — | CSS color for the default loading title. |
| `loadingDescriptionColor` | `string` | — | CSS color for the default loading description. |
| `emptyTitle` | `string` | `"No records found"` | Title for the default empty UI. |
| `emptyDescription` | `string` | `"There are no records to display."` | Description for the default empty UI. |
| `emptyTitleColor` | `string` | — | CSS color for the default empty title. |
| `emptyDescriptionColor` | `string` | — | CSS color for the default empty description. |
| `emptyIcon`               | `ReactNode`                                                                                                                                                                                                                        | —                                    | Replaces the built-in empty icon.                                                 |
| `emptyBackground`         | `"none" | [color] | [from, to, …]`                                                                                                                                                                                                 | `"none"`                             | Empty surface background. One color = solid, 2+ = gradient.                       |
| `emptyBackgroundOpacity`  | `number` (0–1)                                                                                                                                                                                                                     | `1`                                  | Opacity applied to `emptyBackground`.                                             |
| `errorTitle`              | `string`                                                                                                                                                                                                                           | `"Something went wrong!"`            | Title for the default error UI.                                                   |
| `errorDescription`        | `string`                                                                                                                                                                                                                           | `"Unable to load the content."`      | Description for the default error UI.                                             |
| `errorTitleColor`         | `string`                                                                                                                                                                                                                           | —                                    | CSS color for the default error title.                                            |
| `errorDescriptionColor`   | `string`                                                                                                                                                                                                                           | —                                    | CSS color for the default error description.                                      |
| `errorIcon`               | `ReactNode`                                                                                                                                                                                                                        | —                                    | Replaces the built-in error icon.                                                 |
| `errorBackground`         | `"none" | [color] | [from, to, …]`                                                                                                                                                                                                 | `"none"`                             | Error surface background. One color = solid, 2+ = gradient.                       |
| `errorBackgroundOpacity`  | `number` (0–1)                                                                                                                                                                                                                     | `1`                                  | Opacity applied to `errorBackground`.                                             |
| `errorRetryLabel`         | `string`                                                                                                                                                                                                                           | `"Try again"`                        | Label for the built-in error retry button.                                        |
| `errorRetryStyle`         | `CSSProperties`                                                                                                                                                                                                                    | —                                    | Inline styles for the built-in error retry button.                                |
| `errorRetryComponent`     | `ReactNode`                                                                                                                                                                                                                        | —                                    | Replaces the built-in error retry button.                                         |
| `errorHideRetry`          | `boolean`                                                                                                                                                                                                                          | `false`                              | Hides the built-in error retry button when true.                                  |
| `loadingComponent`        | `ReactNode`                                                                                                                                                                                                                        | —                                    | Replaces the built-in loading UI.                                                 |
| `emptyComponent`          | `ReactNode`                                                                                                                                                                                                                        | —                                    | Replaces the built-in empty UI.                                                   |
| `errorComponent`          | `ReactNode`                                                                                                                                                                                                                        | —                                    | Replaces the built-in error UI.                                                   |
| `onRetry`                 | `() => void`                                                                                                                                                                                                                       | —                                    | Called when the default error retry action is activated.                          |
| `children`                | `ReactNode`                                                                                                                                                                                                                        | —                                    | Success content when no loading, error, or empty state is active.                 |


### Loader example

```tsx
<State
  loading={isLoading}
  loaderType="ring"
  loaderSize="lg"
  loaderColor={['#4F46E5']}
  loadingTitle="Loading your data..."
  loadingDescription="Please wait while we load the data."
>
  <UsersTable users={users} />
</State>
```

Gradient (2+ colors):

```tsx
<State
  loading
  loaderType="ring"
  loaderColor={['#7C3AED', '#06B6D4']}
/>
```

### Custom loader example

```tsx
<State
  loading={isLoading}
  loadingComponent={
    <div>
      <h2>Fetching users…</h2>
      <p>Hang tight while we load your data.</p>
    </div>
  }
>
  <UsersTable users={users} />
</State>
```

---

## Development

From the repository root:

```bash
pnpm install
pnpm --filter @statekitjs/react storybook
pnpm --filter @statekitjs/react test
pnpm --filter @statekitjs/react build
```

---

## Package layout

```
packages/react/
├── src/          # library source
├── stories/      # Storybook stories
├── tests/        # Vitest suites
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tsup.config.ts
```

---

## License

MIT