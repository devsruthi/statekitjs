export const NAV_GROUPS = [
  {
    featured: true,
    icon: '⭐',
    items: [{ id: 'live-demo', label: 'Live Demo' }],
  },
  {
    featured: true,
    icon: '⏳',
    items: [{ id: 'loaders', label: 'Loaders' }],
  },
  {
    label: 'Getting Started',
    icon: '🚀',
    items: [
      { id: 'installation', label: 'Installation' },
      { id: 'quick-start', label: 'Quick Start' },
      { id: 'provider', label: 'Theme provider' },
      { id: 'why', label: 'Why StateKitJS' },
    ],
  },
  {
    label: 'Components',
    icon: '🧩',
    items: [
      { id: 'loading', label: 'Loading State' },
      { id: 'empty', label: 'Empty State' },
      { id: 'error', label: 'Error State' },
    ],
  },
  {
    label: 'API',
    icon: '📖',
    items: [{ id: 'props', label: 'Props' }],
  },
  {
    label: 'Resources',
    icon: '💡',
    items: [
      { id: 'examples', label: 'Examples' },
      { id: 'use-cases', label: 'Use Cases' },
    ],
  },
] as const;

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => [...group.items]);

export type NavId = (typeof NAV_ITEMS)[number]['id'];

/** Built-in loaderType visuals shown in the Loaders gallery. */
export const LOADER_GALLERY_TYPES = [
  'ring',
  'spectrum',
  'dots',
  'circle-dots',
  'pulse',
  'bars',
  'infinity',
  'orbit',
  'spokes',
  'activity',
  'ripple',
  'aurora',
  'bloom',
  'eclipse',
  'orbitals',
  'flare',
  'gauge',
  'progress-circle',
  'progress-bar',
] as const;

export const STATE_PROPS = [
  {
    prop: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Renders the loading state. Highest priority.',
  },
  {
    prop: 'error',
    type: 'unknown',
    defaultValue: '—',
    description:
      'When truthy, renders the error state. Accepts an Error, string, or any value.',
  },
  {
    prop: 'empty',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Renders the empty state.',
  },
  {
    prop: 'layout',
    type: '"default" | "table" | "grid" | "list"',
    defaultValue: '"default"',
    description: 'Skeleton layout for the built-in loading state.',
  },
  {
    prop: 'loaderType',
    type: 'LoaderType',
    defaultValue: '"ring"',
    description: 'Built-in loader visual (default layout only).',
  },
  {
    prop: 'loaderSize',
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    defaultValue: '"md"',
    description: 'Built-in loader size.',
  },
  {
    prop: 'loaderColor',
    type: '[color] or [from, to, …]',
    defaultValue: '["#4F46E5"]',
    description: 'Color array: 1 = solid, 2+ = gradient.',
  },
  {
    prop: 'loaderSpeed',
    type: '"slow" | "normal" | "fast"',
    defaultValue: '"normal"',
    description: 'Loader animation speed.',
  },
  {
    prop: 'loaderTheme',
    type: '"light" | "dark" | "auto"',
    defaultValue: '"auto"',
    description: 'Theme for the built-in loading surface.',
  },
  {
    prop: 'loaderBackground',
    type: '"none" | [color] | [from, to, …]',
    defaultValue: '"none"',
    description: 'Loading surface background.',
  },
  {
    prop: 'loaderBackgroundOpacity',
    type: 'number (0–1)',
    defaultValue: '1',
    description: 'Opacity applied to loaderBackground.',
  },
  {
    prop: 'loaderProgress',
    type: 'number',
    defaultValue: '—',
    description: 'Progress 0–100 for progress-circle / progress-bar.',
  },
  {
    prop: 'loadingTitle',
    type: 'string',
    defaultValue: '"Loading..."',
    description: 'Title for the default loading UI.',
  },
  {
    prop: 'loadingDescription',
    type: 'string',
    defaultValue: '"Please wait a moment"',
    description: 'Description for the default loading UI.',
  },
  {
    prop: 'loadingTitleColor',
    type: 'string',
    defaultValue: '—',
    description: 'CSS color for the default loading title.',
  },
  {
    prop: 'loadingDescriptionColor',
    type: 'string',
    defaultValue: '—',
    description: 'CSS color for the default loading description.',
  },
  {
    prop: 'emptyTitle',
    type: 'string',
    defaultValue: '"No records found"',
    description: 'Title for the default empty UI.',
  },
  {
    prop: 'emptyDescription',
    type: 'string',
    defaultValue: '"There are no records to display."',
    description: 'Description for the default empty UI.',
  },
  {
    prop: 'emptyTitleColor',
    type: 'string',
    defaultValue: '—',
    description: 'CSS color for the default empty title.',
  },
  {
    prop: 'emptyDescriptionColor',
    type: 'string',
    defaultValue: '—',
    description: 'CSS color for the default empty description.',
  },
  {
    prop: 'emptyIcon',
    type: 'ReactNode',
    defaultValue: '—',
    description: 'Replaces the built-in empty icon.',
  },
  {
    prop: 'emptyBackground',
    type: '"none" | [color] | [from, to, …]',
    defaultValue: '"none"',
    description: 'Empty surface background.',
  },
  {
    prop: 'errorTitle',
    type: 'string',
    defaultValue: '"Something went wrong!"',
    description: 'Title for the default error UI.',
  },
  {
    prop: 'errorDescription',
    type: 'string',
    defaultValue: '"Unable to load the content."',
    description: 'Description for the default error UI.',
  },
  {
    prop: 'errorTitleColor',
    type: 'string',
    defaultValue: '—',
    description: 'CSS color for the default error title.',
  },
  {
    prop: 'errorDescriptionColor',
    type: 'string',
    defaultValue: '—',
    description: 'CSS color for the default error description.',
  },
  {
    prop: 'errorIcon',
    type: 'ReactNode',
    defaultValue: '—',
    description: 'Replaces the built-in error icon.',
  },
  {
    prop: 'errorRetryLabel',
    type: 'string',
    defaultValue: '"Try again"',
    description: 'Label for the built-in error retry button.',
  },
  {
    prop: 'errorRetryStyle',
    type: 'CSSProperties',
    defaultValue: '—',
    description: 'Inline styles for the built-in error retry button.',
  },
  {
    prop: 'errorRetryComponent',
    type: 'ReactNode',
    defaultValue: '—',
    description:
      'Replaces the built-in error retry button. Wire your own click handler.',
  },
  {
    prop: 'errorHideRetry',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Hides the built-in error retry button when true.',
  },
  {
    prop: 'loadingComponent',
    type: 'ReactNode',
    defaultValue: '—',
    description: 'Replaces the built-in loading UI.',
  },
  {
    prop: 'emptyComponent',
    type: 'ReactNode',
    defaultValue: '—',
    description: 'Replaces the built-in empty UI.',
  },
  {
    prop: 'errorComponent',
    type: 'ReactNode',
    defaultValue: '—',
    description: 'Replaces the built-in error UI.',
  },
  {
    prop: 'onRetry',
    type: '() => void',
    defaultValue: '—',
    description: 'Called when the default error retry action is activated.',
  },
  {
    prop: 'children',
    type: 'ReactNode',
    defaultValue: '—',
    description:
      'Success content when no loading, error, or empty state is active.',
  },
] as const;

export const LOADER_DESCRIPTIONS: Record<string, string> = {
  ring: 'Gradient-capable circular spinner with a soft track.',
  dots: 'Three bouncing dots in a horizontal row.',
  'circle-dots': 'Eight dots arranged on a rotating ring.',
  pulse: 'Expanding pulse rings from a solid core.',
  bars: 'Equalizer-style bars with staggered motion.',
  infinity: 'Animated stroke traveling along an ∞ path.',
  orbit: 'A satellite dot orbiting a glowing core.',
  spokes: 'Rotating radial lines from the center.',
  activity: 'Classic 12-blade fading activity indicator.',
  ripple: 'Expanding concentric rings with a breathing core.',
  aurora: 'Dual sweeping arcs around an accent core.',
  bloom: 'Soft rotating petals with a glowing center.',
  eclipse: 'Overlapping discs drifting in orbit.',
  orbitals: 'Nested orbital rings with multi-speed dots.',
  flare: 'Contra-rotating glowing arcs with a bright core.',
  spectrum: 'Continuous multicolor conic ring with a soft fade.',
  gauge: 'Circular arc spinner with a solid center disc.',
  'progress-circle': 'Circular progress with optional percent label.',
  'progress-bar': 'Linear progress bar, determinate or indeterminate.',
};

export const USE_CASES = [
  {
    title: 'Fetch lists & tables',
    body: 'Wrap table or list pages so loading skeletons, empty rows, and fetch errors share one API.',
  },
  {
    title: 'Dashboards',
    body: 'Keep cards and panels consistent while data streams in — swap layouts without rewriting conditionals.',
  },
  {
    title: 'Empty search',
    body: 'Show a clear empty state when filters or search return no matches, with optional custom copy.',
  },
  {
    title: 'Retryable failures',
    body: 'Surface errors with onRetry so users can recover without leaving the page.',
  },
  {
    title: 'Forms & saves',
    body: 'Use loading + success children for submit flows, or pass a custom loadingComponent for branded waits.',
  },
  {
    title: 'Skeleton layouts',
    body: 'Pick table, grid, or list skeletons while content loads, then reveal children on success.',
  },
] as const;

export const CODE_INSTALL_NPM = `npm install @statekitjs/react`;
export const CODE_INSTALL_PNPM = `pnpm add @statekitjs/react`;

export const CODE_PROGRESS_LOADER = `<State
  loading={isLoading}
  loaderType="progress-circle"
  loaderProgress={72}
  loaderColor={['#4F46E5']}
>
  <UsersTable users={users} />
</State>`;

export const CODE_PROBLEM = `if (loading) return <Spinner />;

if (error) return <ErrorView onRetry={refetch} />;

if (!users.length) return <EmptyState />;

return <UsersTable users={users} />;`;

export const CODE_SOLUTION = `import { State } from '@statekitjs/react';

<State
  loading={loading}
  error={error}
  empty={users.length === 0}
  onRetry={refetch}
>
  <UsersTable users={users} />
</State>`;

export const CODE_QUICK_START = `import { State } from '@statekitjs/react';

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
}`;

export const CODE_PROVIDER = `import { State, StateKitProvider } from '@statekitjs/react';

const theme = {
  primary: '#0F6E6A',
};

export function App() {
  return (
    <StateKitProvider
      loaderType="activity"
      loaderColor={[theme.primary]}
      loaderSize="md"
      errorRetryLabel="Try again"
    >
      <UsersPage />
    </StateKitProvider>
  );
}

function UsersPage({ loading, error, users }) {
  return (
    <State loading={loading} error={error} empty={!users.length}>
      <UsersTable users={users} />
    </State>
  );
}

// Override one screen without changing the rest of the app:
<State loading loaderType="dots">
  <UsersTable users={users} />
</State>`;

export const CODE_LOADING_DEFAULT = `<State loading>
  <UsersTable users={users} />
</State>`;

export const CODE_LOADING_CUSTOM = `<State
  loading={isLoading}
  loaderType="ring"
  loaderSize="lg"
  loaderColor={['#7C3AED', '#06B6D4']}
  loadingTitle="Fetching users"
  loadingDescription="Please wait while we load your team."
>
  <UsersTable users={users} />
</State>`;

export const CODE_LOADING_COMPONENT = `<State
  loading={isLoading}
  loadingComponent={
    <div>
      <h2>Syncing your workspace</h2>
      <p>This fully replaces the built-in loading UI.</p>
    </div>
  }
>
  <UsersTable users={users} />
</State>`;

export const CODE_EMPTY_DEFAULT = `<State empty>
  <UsersTable users={users} />
</State>`;

export const CODE_EMPTY_CUSTOM = `<State
  empty={!users.length}
  emptyTitle="No users yet"
  emptyDescription="Invite someone to get started."
  emptyIcon={
    <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden>
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        fill="none"
        stroke="#2563EB"
        strokeWidth="2"
      />
      <path
        d="M15.5 15.5 20 20"
        fill="none"
        stroke="#2563EB"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  }
  emptyBackground={['#7C3AED', '#2563EB']}
  emptyBackgroundOpacity={0.12}
>
  <UsersTable users={users} />
</State>`;

export const CODE_EMPTY_COMPONENT = `<State
  empty={!users.length}
  emptyComponent={
    <div>
      <h2>Nothing here yet</h2>
      <p>Custom empty UI via emptyComponent.</p>
    </div>
  }
>
  <UsersTable users={users} />
</State>`;

export const CODE_ERROR_DEFAULT = `<State error={error} onRetry={refetch}>
  <UsersTable users={users} />
</State>`;

export const CODE_ERROR_CUSTOM = `<State
  error={error}
  errorTitle="Could not load users"
  errorDescription="Check your connection and try again."
  errorIcon={
    <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden>
      <path
        fill="#EA580C"
        d="M12 2.5 1.8 20.2c-.4.7.1 1.6.9 1.6h18.6c.8 0 1.3-.9.9-1.6L12 2.5zm0 5.2c.6 0 1 .5.9 1.1l-.5 6.2c0 .4-.4.7-.8.7s-.7-.3-.8-.7l-.5-6.2c0-.6.4-1.1.9-1.1H12zm0 11.1a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z"
      />
    </svg>
  }
  errorRetryLabel="Retry now"
  errorRetryStyle={{
    background: '#4F46E5',
    color: '#fff',
    border: 'none',
  }}
  onRetry={refetch}
>
  <UsersTable users={users} />
</State>`;

export const CODE_ERROR_COMPONENT = `<State
  error={error}
  errorComponent={
    <div>
      <h2>Something broke</h2>
      <button type="button" onClick={refetch}>Try again</button>
    </div>
  }
>
  <UsersTable users={users} />
</State>`;

export const CODE_LOADER = `<State
  loading={isLoading}
  loaderType="activity"
  loaderSize="lg"
  loaderColor={['#4F46E5']}
>
  <UsersTable users={users} />
</State>`;

export const CODE_GRADIENT = `<State
  loading
  loaderType="ring"
  loaderColor={['#7C3AED', '#06B6D4']}
/>`;

export const CODE_CUSTOM = CODE_LOADING_COMPONENT;
export const CODE_EMPTY = CODE_EMPTY_CUSTOM;
export const CODE_ERROR = CODE_ERROR_CUSTOM;
