
<p align="center">
  <img
    src="./assets/branding/github-banner.png"
    alt="StateKitJS"
    width="720"
  />
</p>

<p align="center">
  Stop rewriting loading, empty, error, and success UI.
  Build consistent user experiences with one elegant API.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@statekitjs/react"
    ><img
      src="https://img.shields.io/npm/v/@statekitjs/react.svg?color=cb3837"
      alt="npm version"
  /></a>
  <a href="https://statekitjs-playground.vercel.app"
    ><img src="https://img.shields.io/badge/docs-live-blue" alt="Docs"
  /></a>
  <a href="./LICENSE"
    ><img
      src="https://img.shields.io/badge/license-MIT-green.svg"
      alt="MIT License"
  /></a>
  <img
    src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white"
    alt="TypeScript"
  />
  <img
    src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black"
    alt="React 19"
  />
</p>

<p align="center">
  <a href="https://statekitjs-playground.vercel.app"
    ><strong>Documentation &amp; live demos →</strong></a
  >
</p>

# Why StateKitJS?

Every React application repeats the same UI patterns.

```tsx
if (loading) return <Spinner />

if (error) return <Error />

if (!users.length) return <Empty />

return <Users />
```

Eventually every project becomes filled with duplicated rendering logic.

StateKitJS replaces all of that with one declarative component.

```tsx
<State
    loading={loading}
    error={error}
    empty={users.length === 0}
>
    <Users />
</State>
```

Simple.

Reusable.

Readable.

Consistent.

# Features

- 🚀 One-line state rendering
- 📦 Beautiful loading states
- ❌ Elegant error components
- 📭 Empty state components
- 🦴 Responsive skeleton loaders
- 🌙 Dark mode ready
- 📱 Mobile responsive
- ♿ Accessibility first
- 🌲 Tree-shakable
- ⚡ Tiny bundle size
- 🔷 TypeScript support
- 🎨 Fully customizable

# Documentation

Interactive docs and live demos:

**[https://statekitjs-playground.vercel.app](https://statekitjs-playground.vercel.app)**

You can explore:

- **Live Demo** — try loading, empty, error, and success states interactively
- **Loaders** — spinner and progress variants, sizes, colors, and speeds
- **Getting Started** — installation, quick start, and theme provider
- **Loading / Empty / Error** — default UI, customized props, and fully custom components
- **API props** — full `State` prop reference with types and defaults
- **Examples & use cases** — copy-paste patterns for real apps

# Packages


| Package               | Description             |
| --------------------- | ----------------------- |
| **@statekitjs/react** | React component library |


More packages are planned.

- @statekitjs/icons
- @statekitjs/themes
- @statekitjs/utils
- @statekitjs/cli

# Installation

```bash
npm install @statekitjs/react
```

or

```bash
pnpm add @statekitjs/react
```

# Quick Example

```tsx
import { State } from "@statekitjs/react";

function UsersPage() {
  return (
    <State
      loading={loading}
      error={error}
      empty={users.length === 0}
    >
      <UsersTable />
    </State>
  );
}
```

# Theme provider

Wrap the app in `StateKitProvider` to apply your brand loader, colors, and copy once. Local `State` props still override the provider.

```tsx
import { State, StateKitProvider } from "@statekitjs/react";

<StateKitProvider
  loaderType="activity"
  loaderColor={[theme.primary]}
>
  <App />
</StateKitProvider>
```

# `State` props

Priority when multiple flags are set: **loading → error → empty → children**.


| Prop                      | Type                                                                                                                                                                                                 | Default                              | Description                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------- |
| `loading`                 | `boolean`                                                                                                                                                                                            | `false`                              | Renders the loading state. Highest priority.                                      |
| `error`                   | `unknown`                                                                                                                                                                                            | —                                    | When truthy, renders the error state. Accepts an `Error`, `string`, or any value. |
| `empty`                   | `boolean`                                                                                                                                                                                            | `false`                              | Renders the empty state.                                                          |
| `layout`                  | `"default" | "table" | "grid" | "list"`                                                                                                                                                              | `"default"`                          | Skeleton layout for the built-in loading state.                                   |
| `loaderType`              | `"ring" | "dots" | "circle-dots" | "pulse" | "bars" | "infinity" | "orbit" | "spokes" | "activity" | "ripple" | "aurora" | "bloom" | "eclipse" | "orbitals" | "flare" | "spectrum" | "gauge" | "progress-circle" | "progress-bar"` | `"ring"`                          | Built-in loader visual (default layout only).                                     |
| `loaderSize`              | `"xs" | "sm" | "md" | "lg" | "xl"`                                                                                                                                                                   | `"md"`                               | Built-in loader size.                                                             |
| `loaderColor`             | `[color]` or `[from, to, …]`                                                                                                                                                                         | `["#4F46E5"]`                        | Color array: 1 = solid, 2+ = gradient.                                            |
| `loaderSpeed`             | `"slow" | "normal" | "fast"`                                                                                                                                                                         | `"normal"`                           | Loader animation speed.                                                           |
| `loaderTheme`             | `"light" | "dark" | "auto"`                                                                                                                                                                          | `"auto"`                             | Theme for the built-in loading surface.                                           |
| `loaderBackground`        | `"none" | [color] | [from, to, …]`                                                                                                                                                                   | `"none"`                             | Loading surface background. One color = solid, 2+ = gradient.                     |
| `loaderBackgroundOpacity` | `number` (0–1)                                                                                                                                                                                       | `1`                                  | Opacity applied to `loaderBackground`.                                            |
| `loaderProgress`          | `number`                                                                                                                                                                                             | —                                    | Progress 0–100 for `progress-circle` / `progress-bar`.                            |
| `loadingTitle`            | `string`                                                                                                                                                                                             | `"Loading..."`                       | Title for the default loading UI.                                                 |
| `loadingDescription`      | `string`                                                                                                                                                                                             | `"Please wait a moment"`             | Description for the default loading UI.                                           |
| `loadingTitleColor`       | `string`                                                                                                                                                                                             | —                                    | CSS color for the default loading title.                                          |
| `loadingDescriptionColor` | `string`                                                                                                                                                                                             | —                                    | CSS color for the default loading description.                                    |
| `emptyTitle`              | `string`                                                                                                                                                                                             | `"No records found"`                 | Title for the default empty UI.                                                   |
| `emptyDescription`        | `string`                                                                                                                                                                                             | `"There are no records to display."` | Description for the default empty UI.                                             |
| `emptyTitleColor`         | `string`                                                                                                                                                                                             | —                                    | CSS color for the default empty title.                                            |
| `emptyDescriptionColor`   | `string`                                                                                                                                                                                             | —                                    | CSS color for the default empty description.                                      |
| `emptyIcon`               | `ReactNode`                                                                                                                                                                                          | —                                    | Replaces the built-in empty icon.                                                 |
| `emptyBackground`         | `"none" | [color] | [from, to, …]`                                                                                                                                                                   | `"none"`                             | Empty surface background. One color = solid, 2+ = gradient.                       |
| `emptyBackgroundOpacity`  | `number` (0–1)                                                                                                                                                                                       | `1`                                  | Opacity applied to `emptyBackground`.                                             |
| `errorTitle`              | `string`                                                                                                                                                                                             | `"Something went wrong!"`            | Title for the default error UI.                                                   |
| `errorDescription`        | `string`                                                                                                                                                                                             | `"Unable to load the content."`      | Description for the default error UI.                                             |
| `errorTitleColor`         | `string`                                                                                                                                                                                             | —                                    | CSS color for the default error title.                                            |
| `errorDescriptionColor`   | `string`                                                                                                                                                                                             | —                                    | CSS color for the default error description.                                      |
| `errorIcon`               | `ReactNode`                                                                                                                                                                                          | —                                    | Replaces the built-in error icon.                                                 |
| `errorBackground`         | `"none" | [color] | [from, to, …]`                                                                                                                                                                   | `"none"`                             | Error surface background. One color = solid, 2+ = gradient.                       |
| `errorBackgroundOpacity`  | `number` (0–1)                                                                                                                                                                                       | `1`                                  | Opacity applied to `errorBackground`.                                             |
| `errorRetryLabel`         | `string`                                                                                                                                                                                             | `"Try again"`                        | Label for the built-in error retry button.                                        |
| `errorRetryStyle`         | `CSSProperties`                                                                                                                                                                                      | —                                    | Inline styles for the built-in error retry button.                                |
| `errorRetryComponent`     | `ReactNode`                                                                                                                                                                                          | —                                    | Replaces the built-in error retry button.                                         |
| `errorHideRetry`          | `boolean`                                                                                                                                                                                            | `false`                              | Hides the built-in error retry button when true.                                  |
| `loadingComponent`        | `ReactNode`                                                                                                                                                                                          | —                                    | Replaces the built-in loading UI.                                                 |
| `emptyComponent`          | `ReactNode`                                                                                                                                                                                          | —                                    | Replaces the built-in empty UI.                                                   |
| `errorComponent`          | `ReactNode`                                                                                                                                                                                          | —                                    | Replaces the built-in error UI.                                                   |
| `onRetry`                 | `() => void`                                                                                                                                                                                         | —                                    | Called when the default error retry action is activated.                          |
| `children`                | `ReactNode`                                                                                                                                                                                          | —                                    | Success content when no loading, error, or empty state is active.                 |


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

# Project Structure

```
statekit
│
├── packages/
│   └── react/
│
├── apps/
│   ├── website/
│   └── playground/
│
├── docs/
│
├── examples/
│
└── rfcs/
```

# Philosophy

StateKitJS focuses on one thing.

Making application states beautiful.

Instead of writing repetitive conditional rendering across your application, developers should describe the state—not how to render it.

## Contributing

We welcome contributions.

```bash
git clone https://github.com/devsruthi/statekit.git

pnpm install

pnpm dev
```

# Built With

- React
- TypeScript
- Vite
- Storybook
- Vitest
- pnpm Workspaces
- Changesets
- GitHub Actions

# License

MIT



### ⭐ If you like StateKitJS, please consider giving it a Star.

Built with ❤️ by Sruthi

