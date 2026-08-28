import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  LOADER_COLOR_GRADIENT,
  LOADER_COLOR_PRIMARY,
  LOADER_TYPE,
  State,
  type LoaderBackground,
  type LoaderColor,
  type LoaderSize,
  type LoaderType,
  type StateLayout,
} from '@statekitjs/react';
import {
  CODE_EMPTY_COMPONENT,
  CODE_EMPTY_CUSTOM,
  CODE_EMPTY_DEFAULT,
  CODE_ERROR_COMPONENT,
  CODE_ERROR_CUSTOM,
  CODE_ERROR_DEFAULT,
  CODE_GRADIENT,
  CODE_INSTALL_NPM,
  CODE_INSTALL_PNPM,
  CODE_LOADER,
  CODE_LOADING_COMPONENT,
  CODE_LOADING_CUSTOM,
  CODE_LOADING_DEFAULT,
  CODE_PROBLEM,
  CODE_PROGRESS_LOADER,
  CODE_PROVIDER,
  CODE_QUICK_START,
  CODE_SOLUTION,
  LOADER_GALLERY_TYPES,
  NAV_GROUPS,
  NAV_ITEMS,
  STATE_PROPS,
  USE_CASES,
  type NavId,
} from './docsContent';

type DemoMode = 'loading' | 'empty' | 'error' | 'success';

const MODES: { id: DemoMode; label: string }[] = [
  { id: 'loading', label: 'Loading' },
  { id: 'empty', label: 'Empty' },
  { id: 'error', label: 'Error' },
  { id: 'success', label: 'Success' },
];

const LOADING_LAYOUTS: StateLayout[] = ['default', 'table', 'grid', 'list'];
const LOADER_TYPES = Object.values(LOADER_TYPE);
const LOADER_SIZES: LoaderSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const BACKGROUND_OPTIONS: {
  id: string;
  label: string;
  value: LoaderBackground;
  swatch?: string;
}[] = [
  { id: 'none', label: 'None', value: 'none' },
  {
    id: 'bg-indigo',
    label: 'Indigo',
    value: ['#4F46E5'],
    swatch: '#4F46E5',
  },
  {
    id: 'bg-violet',
    label: 'Violet',
    value: ['#7C3AED'],
    swatch: '#7C3AED',
  },
  {
    id: 'bg-blue',
    label: 'Blue',
    value: ['#2563EB'],
    swatch: '#2563EB',
  },
  {
    id: 'bg-cyan',
    label: 'Cyan',
    value: ['#06B6D4'],
    swatch: '#06B6D4',
  },
  {
    id: 'bg-rose',
    label: 'Rose',
    value: ['#F43F5E'],
    swatch: '#F43F5E',
  },
  {
    id: 'bg-emerald',
    label: 'Emerald',
    value: ['#10B981'],
    swatch: '#10B981',
  },
  {
    id: 'bg-amber',
    label: 'Amber',
    value: ['#F59E0B'],
    swatch: '#F59E0B',
  },
  {
    id: 'bg-mist',
    label: 'Mist',
    value: ['#F1F5F9'],
    swatch: '#F1F5F9',
  },
  {
    id: 'bg-ice',
    label: 'Ice',
    value: ['#EEF2FF'],
    swatch: '#EEF2FF',
  },
  {
    id: 'bg-lilac',
    label: 'Lilac',
    value: ['#F3E8FF'],
    swatch: '#F3E8FF',
  },
  {
    id: 'bg-sky',
    label: 'Sky',
    value: ['#E0F2FE'],
    swatch: '#E0F2FE',
  },
  {
    id: 'bg-mint',
    label: 'Mint',
    value: ['#ECFDF5'],
    swatch: '#ECFDF5',
  },
  {
    id: 'bg-blush',
    label: 'Blush',
    value: ['#FFF1F2'],
    swatch: '#FFF1F2',
  },
  {
    id: 'bg-brand',
    label: 'Violet → Blue',
    value: LOADER_COLOR_GRADIENT,
    swatch: 'linear-gradient(135deg, #7C3AED, #2563EB)',
  },
  {
    id: 'bg-aurora',
    label: 'Violet → Cyan',
    value: ['#7C3AED', '#06B6D4'],
    swatch: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
  },
  {
    id: 'bg-sunset',
    label: 'Rose → Amber',
    value: ['#F43F5E', '#F59E0B'],
    swatch: 'linear-gradient(135deg, #F43F5E, #F59E0B)',
  },
];

const TEXT_COLOR_OPTIONS: {
  id: string;
  label: string;
  value?: string;
  swatch?: string;
}[] = [
  { id: 'default', label: 'Default' },
  {
    id: 'navy',
    label: 'Navy',
    value: '#14212B',
    swatch: '#14212B',
  },
  {
    id: 'slate',
    label: 'Slate',
    value: '#475569',
    swatch: '#475569',
  },
  {
    id: 'white',
    label: 'White',
    value: '#F8FAFC',
    swatch: '#F8FAFC',
  },
  {
    id: 'indigo',
    label: 'Indigo',
    value: '#4F46E5',
    swatch: '#4F46E5',
  },
  {
    id: 'violet',
    label: 'Violet',
    value: '#7C3AED',
    swatch: '#7C3AED',
  },
  {
    id: 'rose',
    label: 'Rose',
    value: '#E11D48',
    swatch: '#E11D48',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    value: '#047857',
    swatch: '#047857',
  },
];

function TextColorSwatches({
  activeId,
  onChange,
}: {
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="appearance__swatches" role="list">
      {TEXT_COLOR_OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={
            activeId === option.id ? 'swatch swatch--active' : 'swatch'
          }
          title={option.label}
          aria-label={option.label}
          aria-pressed={activeId === option.id}
          onClick={() => onChange(option.id)}
        >
          <span
            className={
              option.id === 'default'
                ? 'swatch__fill swatch__fill--none'
                : 'swatch__fill'
            }
            style={option.swatch ? { background: option.swatch } : undefined}
          />
        </button>
      ))}
    </div>
  );
}

const COLOR_OPTIONS = [
  {
    id: 'indigo',
    label: 'Indigo',
    value: ['#4F46E5'] as const satisfies LoaderColor,
    swatch: '#4F46E5',
  },
  {
    id: 'violet',
    label: 'Violet',
    value: ['#7C3AED'] as const satisfies LoaderColor,
    swatch: '#7C3AED',
  },
  {
    id: 'blue',
    label: 'Blue',
    value: ['#2563EB'] as const satisfies LoaderColor,
    swatch: '#2563EB',
  },
  {
    id: 'cyan',
    label: 'Cyan',
    value: ['#06B6D4'] as const satisfies LoaderColor,
    swatch: '#06B6D4',
  },
  {
    id: 'rose',
    label: 'Rose',
    value: ['#F43F5E'] as const satisfies LoaderColor,
    swatch: '#F43F5E',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    value: ['#10B981'] as const satisfies LoaderColor,
    swatch: '#10B981',
  },
  {
    id: 'amber',
    label: 'Amber',
    value: ['#F59E0B'] as const satisfies LoaderColor,
    swatch: '#F59E0B',
  },
  {
    id: 'slate',
    label: 'Slate',
    value: ['#64748B'] as const satisfies LoaderColor,
    swatch: '#64748B',
  },
  {
    id: 'brand',
    label: 'Violet → Blue',
    value: LOADER_COLOR_GRADIENT,
    swatch: 'linear-gradient(135deg, #7C3AED, #2563EB)',
  },
  {
    id: 'aurora',
    label: 'Violet → Cyan',
    value: ['#7C3AED', '#06B6D4'] as const satisfies LoaderColor,
    swatch: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
  },
  {
    id: 'ocean',
    label: 'Blue → Cyan',
    value: ['#2563EB', '#06B6D4'] as const satisfies LoaderColor,
    swatch: 'linear-gradient(135deg, #2563EB, #06B6D4)',
  },
  {
    id: 'sunset',
    label: 'Rose → Amber',
    value: ['#F43F5E', '#F59E0B'] as const satisfies LoaderColor,
    swatch: 'linear-gradient(135deg, #F43F5E, #F59E0B)',
  },
] as const;

const USERS = [
  {
    id: 1,
    name: 'Ada Lovelace',
    role: 'Engineer',
    team: 'Platform',
    status: 'online' as const,
    initials: 'AL',
    accent: '#7C3AED',
  },
  {
    id: 2,
    name: 'Grace Hopper',
    role: 'Architect',
    team: 'Systems',
    status: 'away' as const,
    initials: 'GH',
    accent: '#4F46E5',
  },
  {
    id: 3,
    name: 'Alan Turing',
    role: 'Researcher',
    team: 'Cryptography',
    status: 'online' as const,
    initials: 'AT',
    accent: '#06B6D4',
  },
  {
    id: 4,
    name: 'Katherine Johnson',
    role: 'Analyst',
    team: 'Data',
    status: 'busy' as const,
    initials: 'KJ',
    accent: '#2563EB',
  },
  {
    id: 5,
    name: 'Margaret Hamilton',
    role: 'Lead Engineer',
    team: 'Flight',
    status: 'online' as const,
    initials: 'MH',
    accent: '#8B5CF6',
  },
];

const STATUS_LABEL = {
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
} as const;

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );
}

function resolveNavId(hash: string): NavId {
  const id = hash.replace(/^#/, '') as NavId;
  return NAV_ITEMS.some((item) => item.id === id) ? id : 'live-demo';
}

function useAnimatedProgress(active: boolean): number {
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    if (!active) {
      return;
    }

    let value = 18;
    let direction = 1;
    const id = window.setInterval(() => {
      value += direction * 1.6;
      if (value >= 92) {
        value = 92;
        direction = -1;
      } else if (value <= 12) {
        value = 12;
        direction = 1;
      }
      setProgress(value);
    }, 40);

    return () => window.clearInterval(id);
  }, [active]);

  return progress;
}

function LoaderPreview({ type }: { type: LoaderType }) {
  const isProgress = type === 'progress-circle' || type === 'progress-bar';
  const progress = useAnimatedProgress(isProgress);

  return (
    <span className="loader-card__preview" aria-hidden="true">
      <State
        loading
        loaderType={type}
        loaderSize="md"
        loaderColor={LOADER_COLOR_PRIMARY}
        loadingTitle=""
        loadingDescription=""
        {...(isProgress ? { loaderProgress: progress } : {})}
      >
        {null}
      </State>
    </span>
  );
}

const RETRY_LOADER_MS = 2000;

function useRetryFlash() {
  const [retrying, setRetrying] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current != null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function startRetry() {
    if (retrying) {
      return;
    }

    setRetrying(true);
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setRetrying(false);
      timerRef.current = null;
    }, RETRY_LOADER_MS);
  }

  return { retrying, startRetry };
}

function ErrorRetryPreview({
  title,
  description,
  custom,
  retryLabel,
  retryStyle,
  icon,
}: {
  title?: string;
  description?: string;
  custom?: boolean;
  retryLabel?: string;
  retryStyle?: CSSProperties;
  icon?: ReactNode;
}) {
  const { retrying, startRetry } = useRetryFlash();

  if (retrying) {
    return (
      <State
        loading
        loaderType="spectrum"
        loaderSize="lg"
        loaderColor={LOADER_COLOR_PRIMARY}
      >
        {null}
      </State>
    );
  }

  if (custom) {
    return (
      <State
        error={new Error('Failed to fetch users.')}
        errorComponent={
          <div className="custom-error">
            <p className="custom-badge custom-badge--error">
              User-created component
            </p>
            <div className="custom-error__icon" aria-hidden>
              <span className="custom-error__mark">!</span>
            </div>
            <div className="custom-error__copy">
              <h2>Something broke</h2>
              <p>Custom error UI via errorComponent.</p>
            </div>
            <button
              type="button"
              className="custom-error__action"
              onClick={startRetry}
            >
              Try again
            </button>
          </div>
        }
      >
        {null}
      </State>
    );
  }

  return (
    <State
      error={new Error('Failed to fetch users.')}
      errorTitle={title}
      errorDescription={description}
      errorIcon={icon}
      errorRetryLabel={retryLabel}
      errorRetryStyle={retryStyle}
      onRetry={startRetry}
    >
      {null}
    </State>
  );
}

export function App() {
  const [mode, setMode] = useState<DemoMode>('loading');
  const [layout, setLayout] = useState<StateLayout>('default');
  const [useCustomComponent, setUseCustomComponent] = useState(false);
  const [loaderType, setLoaderType] = useState<LoaderType>('ring');
  const [loaderSize, setLoaderSize] = useState<LoaderSize>('md');
  const [backgroundId, setBackgroundId] = useState('none');
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.16);
  const [titleColorId, setTitleColorId] = useState('default');
  const [descriptionColorId, setDescriptionColorId] = useState('default');
  const [colorId, setColorId] =
    useState<(typeof COLOR_OPTIONS)[number]['id']>('indigo');
  const [navOpen, setNavOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavId>(() =>
    typeof window !== 'undefined'
      ? resolveNavId(window.location.hash)
      : 'live-demo',
  );
  const { retrying, startRetry } = useRetryFlash();

  const loaderColor =
    COLOR_OPTIONS.find((option) => option.id === colorId)?.value ??
    LOADER_COLOR_PRIMARY;

  const effectiveMode: DemoMode = retrying ? 'loading' : mode;
  const effectiveLoaderType: LoaderType = retrying ? 'spectrum' : loaderType;

  const showLayout =
    effectiveMode === 'loading' && !useCustomComponent && !retrying;
  const showLoaderControls =
    effectiveMode === 'loading' &&
    !useCustomComponent &&
    layout === 'default' &&
    !retrying;
  const showCustomToggle = mode !== 'success' && !retrying;
  const showSurfaceBackground =
    !useCustomComponent &&
    !retrying &&
    (mode === 'empty' ||
      mode === 'error' ||
      (mode === 'loading' && layout === 'default'));
  const showBackgroundOpacity =
    showSurfaceBackground && backgroundId !== 'none';

  const surfaceBackground =
    BACKGROUND_OPTIONS.find((option) => option.id === backgroundId)?.value ??
    'none';
  const titleColor = TEXT_COLOR_OPTIONS.find(
    (option) => option.id === titleColorId,
  )?.value;
  const descriptionColor = TEXT_COLOR_OPTIONS.find(
    (option) => option.id === descriptionColorId,
  )?.value;

  const animateDemoProgress =
    effectiveMode === 'loading' &&
    !useCustomComponent &&
    layout === 'default' &&
    !retrying &&
    (loaderType === 'progress-circle' || loaderType === 'progress-bar');
  const demoProgress = useAnimatedProgress(animateDemoProgress);

  const stateProps = useMemo(
    () => ({
      loading: effectiveMode === 'loading',
      empty: effectiveMode === 'empty',
      error:
        effectiveMode === 'error'
          ? new Error('Failed to fetch users.')
          : undefined,
      layout: retrying ? 'default' : layout,
      loaderType: effectiveLoaderType,
      loaderSize,
      loaderColor,
      loaderBackground:
        effectiveMode === 'loading' && !retrying ? surfaceBackground : 'none',
      loaderBackgroundOpacity: backgroundOpacity,
      emptyBackground: effectiveMode === 'empty' ? surfaceBackground : 'none',
      emptyBackgroundOpacity: backgroundOpacity,
      errorBackground: effectiveMode === 'error' ? surfaceBackground : 'none',
      errorBackgroundOpacity: backgroundOpacity,
      loadingTitleColor: titleColor,
      loadingDescriptionColor: descriptionColor,
      emptyTitleColor: titleColor,
      emptyDescriptionColor: descriptionColor,
      errorTitleColor: titleColor,
      errorDescriptionColor: descriptionColor,
      loaderProgress: animateDemoProgress ? demoProgress : undefined,
      onRetry: startRetry,
    }),
    [
      animateDemoProgress,
      backgroundOpacity,
      demoProgress,
      descriptionColor,
      effectiveLoaderType,
      effectiveMode,
      layout,
      loaderColor,
      loaderSize,
      retrying,
      startRetry,
      surfaceBackground,
      titleColor,
    ],
  );

  const customToggleLabel =
    mode === 'loading'
      ? 'Pass loadingComponent'
      : mode === 'empty'
        ? 'Pass emptyComponent'
        : 'Pass errorComponent';

  useEffect(() => {
    const onHash = () => setActiveNav(resolveNavId(window.location.hash));
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#live-demo');
    }
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveNav(visible.target.id as NavId);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function goTo(id: NavId) {
    setActiveNav(id);
    setNavOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  }

  function pickLoader(type: LoaderType) {
    setMode('loading');
    setLayout('default');
    setUseCustomComponent(false);
    setLoaderType(type);
    goTo('live-demo');
  }

  const successUsers = (
    <div className="users">
      <div className="users__head">
        <div>
          <p className="users__eyebrow">Team directory</p>
          <h2 className="users__title">People</h2>
        </div>
        <span className="users__count">{USERS.length} members</span>
      </div>
      <ul className="users__list">
        {USERS.map((user) => (
          <li key={user.id} className="users__item">
            <span
              className="users__avatar"
              style={{
                background: `linear-gradient(145deg, ${user.accent}, color-mix(in srgb, ${user.accent} 55%, #0f172a))`,
              }}
              aria-hidden="true"
            >
              {user.initials}
            </span>
            <div className="users__meta">
              <div className="users__row">
                <strong>{user.name}</strong>
                <span className={`users__status users__status--${user.status}`}>
                  {STATUS_LABEL[user.status]}
                </span>
              </div>
              <div className="users__row users__row--sub">
                <span>{user.role}</span>
                <span className="users__dot" aria-hidden="true" />
                <span>{user.team}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="docs">
      <div className="ambient" aria-hidden="true" />

      <header className="docs-top">
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-controls="docs-sidebar"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span className="nav-toggle__bars" aria-hidden="true" />
          Menu
        </button>

        <a
          className="docs-top__brand"
          href="#live-demo"
          aria-label="StateKitJS"
          onClick={(e) => {
            e.preventDefault();
            goTo('live-demo');
          }}
        >
          <img
            className="docs-logo-mark"
            src="/favicon.svg"
            alt=""
            width={36}
            height={36}
          />
          <span className="docs-logo-text" aria-hidden="true">
            StateKitJS
          </span>
        </a>

        <nav className="docs-top__links" aria-label="External links">
          <a
            className="docs-top__link"
            href="https://www.npmjs.com/package/@statekitjs/react"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="docs-top__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.01 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
              />
            </svg>
            npm
          </a>
          <a
            className="docs-top__link docs-top__link--primary"
            href="https://github.com/devsruthi/statekit"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              className="docs-top__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            GitHub
          </a>
        </nav>
      </header>

      {navOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      ) : null}

      <div className="docs-shell">
        <aside
          id="docs-sidebar"
          className={navOpen ? 'sidebar sidebar--open' : 'sidebar'}
        >
          <p className="sidebar__label">
            <span className="sidebar__label-icon" aria-hidden="true">
              📘
            </span>
            Documentation
          </p>
          <nav className="sidebar__nav" aria-label="Docs">
            {NAV_GROUPS.map((group, groupIndex) => {
              const groupLabel = 'label' in group ? group.label : undefined;
              const groupIcon = 'icon' in group ? group.icon : undefined;
              const isFeatured = 'featured' in group && group.featured;

              if (isFeatured) {
                const item = group.items[0];
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={
                      activeNav === item.id
                        ? 'sidebar__featured sidebar__featured--active'
                        : 'sidebar__featured'
                    }
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(item.id);
                    }}
                  >
                    <span className="sidebar__featured-icon" aria-hidden="true">
                      {groupIcon}
                    </span>
                    <span>{item.label}</span>
                  </a>
                );
              }

              return (
                <div
                  key={groupLabel ?? `group-${groupIndex}`}
                  className="sidebar__group"
                >
                  {groupLabel ? (
                    <p className="sidebar__group-label">
                      <span aria-hidden="true">{groupIcon}</span>
                      {groupLabel}
                    </p>
                  ) : null}
                  <div className="sidebar__group-links">
                    {group.items.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={
                          activeNav === item.id
                            ? 'sidebar__link sidebar__link--active'
                            : 'sidebar__link'
                        }
                        onClick={(event) => {
                          event.preventDefault();
                          goTo(item.id);
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="docs-main">
          <section id="live-demo" className="docs-section">
            <div className="section-head">
              <h1>Live Demo</h1>
              <p>
                Tune the interactive <code>State</code> preview. Priority when
                multiple flags are set: loading → error → empty → children.
              </p>
            </div>

            <div className="mode-row" role="tablist" aria-label="Demo mode">
              {MODES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === item.id}
                  className={
                    mode === item.id
                      ? 'mode-chip mode-chip--active'
                      : 'mode-chip'
                  }
                  onClick={() => {
                    setMode(item.id);
                    setUseCustomComponent(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="workspace">
              <div className="workspace__main">
                <div className="stage" key={mode}>
                  <div className="stage__chrome">
                    <span className="stage__dot" />
                    <span className="stage__dot" />
                    <span className="stage__dot" />
                    <span className="stage__label">Live preview</span>
                  </div>
                  <div className="stage__canvas">
                    <State
                      {...stateProps}
                      loadingComponent={
                        mode === 'loading' && useCustomComponent ? (
                          <div
                            className="custom-loading"
                            role="status"
                            aria-live="polite"
                          >
                            <p className="custom-badge">
                              User-created component
                            </p>
                            <div className="custom-loading__orb" aria-hidden>
                              <span className="custom-loading__ring" />
                              <span className="custom-loading__core" />
                            </div>
                            <div className="custom-loading__copy">
                              <p className="custom-loading__eyebrow">
                                loadingComponent
                              </p>
                              <h2>Syncing your workspace</h2>
                              <p>
                                This is a user-created component passed via
                                loadingComponent.
                              </p>
                            </div>
                            <div className="custom-loading__track" aria-hidden>
                              <span className="custom-loading__bar" />
                            </div>
                            <ul
                              className="custom-loading__skeleton"
                              aria-hidden
                            >
                              <li />
                              <li />
                              <li />
                            </ul>
                          </div>
                        ) : undefined
                      }
                      emptyComponent={
                        mode === 'empty' && useCustomComponent ? (
                          <div className="custom-empty">
                            <p className="custom-badge">
                              User-created component
                            </p>
                            <div className="custom-empty__icon" aria-hidden>
                              <span className="custom-empty__tray" />
                              <span className="custom-empty__dot" />
                            </div>
                            <div className="custom-empty__copy">
                              <h2>No users yet</h2>
                              <p>
                                This is a user-created component passed via
                                emptyComponent. Invite someone to get started.
                              </p>
                            </div>
                          </div>
                        ) : undefined
                      }
                      errorComponent={
                        mode === 'error' && useCustomComponent ? (
                          <div className="custom-error">
                            <p className="custom-badge custom-badge--error">
                              User-created component
                            </p>
                            <div className="custom-error__icon" aria-hidden>
                              <span className="custom-error__mark">!</span>
                            </div>
                            <div className="custom-error__copy">
                              <h2>Oops!</h2>
                              <p>
                                This is a user-created component passed via
                                errorComponent. Something went wrong while
                                fetching data.
                              </p>
                            </div>
                            <button
                              type="button"
                              className="custom-error__action"
                              onClick={startRetry}
                            >
                              Try again
                            </button>
                          </div>
                        ) : undefined
                      }
                    >
                      {successUsers}
                    </State>
                  </div>
                </div>

                {showLoaderControls || showSurfaceBackground ? (
                  <div className="appearance">
                    {showLoaderControls ? (
                      <section className="appearance__group">
                        <h3 className="appearance__label">Color</h3>
                        <div className="appearance__swatches" role="list">
                          {COLOR_OPTIONS.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              className={
                                colorId === option.id
                                  ? 'swatch swatch--active'
                                  : 'swatch'
                              }
                              title={option.label}
                              aria-label={option.label}
                              aria-pressed={colorId === option.id}
                              onClick={() => setColorId(option.id)}
                            >
                              <span
                                className="swatch__fill"
                                style={{ background: option.swatch }}
                              />
                            </button>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    {showSurfaceBackground ? (
                      <section className="appearance__group">
                        <h3 className="appearance__label">Background</h3>
                        <div className="appearance__swatches" role="list">
                          {BACKGROUND_OPTIONS.map((option) => (
                            <button
                              key={option.id}
                              type="button"
                              className={
                                backgroundId === option.id
                                  ? 'swatch swatch--active'
                                  : 'swatch'
                              }
                              title={option.label}
                              aria-label={option.label}
                              aria-pressed={backgroundId === option.id}
                              onClick={() => setBackgroundId(option.id)}
                            >
                              <span
                                className={
                                  option.id === 'none'
                                    ? 'swatch__fill swatch__fill--none'
                                    : 'swatch__fill'
                                }
                                style={
                                  option.swatch
                                    ? { background: option.swatch }
                                    : undefined
                                }
                              />
                            </button>
                          ))}
                        </div>
                        {showBackgroundOpacity ? (
                          <div className="appearance__opacity">
                            <div className="range-head">
                              <span>Opacity</span>
                              <span>
                                {Math.round(backgroundOpacity * 100)}%
                              </span>
                            </div>
                            <input
                              className="range"
                              type="range"
                              min={0}
                              max={1}
                              step={0.01}
                              value={backgroundOpacity}
                              onChange={(event) =>
                                setBackgroundOpacity(Number(event.target.value))
                              }
                            />
                          </div>
                        ) : null}
                      </section>
                    ) : null}

                    {showSurfaceBackground ? (
                      <section className="appearance__group">
                        <h3 className="appearance__label">Title</h3>
                        <TextColorSwatches
                          activeId={titleColorId}
                          onChange={setTitleColorId}
                        />
                      </section>
                    ) : null}

                    {showSurfaceBackground ? (
                      <section className="appearance__group">
                        <h3 className="appearance__label">Description</h3>
                        <TextColorSwatches
                          activeId={descriptionColorId}
                          onChange={setDescriptionColorId}
                        />
                      </section>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <aside className="panel">
                <div className="panel__head">
                  <h2>Controls</h2>
                  <p>Tune the live State preview.</p>
                </div>

                {showLayout ? (
                  <section className="panel__section">
                    <h3>Layout</h3>
                    <div className="chip-row">
                      {LOADING_LAYOUTS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={
                            layout === value ? 'chip chip--active' : 'chip'
                          }
                          onClick={() => setLayout(value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </section>
                ) : null}

                {showLoaderControls ? (
                  <>
                    <section className="panel__section">
                      <h3>Loader type</h3>
                      <div className="chip-row chip-row--wrap">
                        {LOADER_TYPES.map((value) => (
                          <button
                            key={value}
                            type="button"
                            className={
                              loaderType === value
                                ? 'chip chip--active'
                                : 'chip'
                            }
                            onClick={() => setLoaderType(value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </section>

                    <section className="panel__section">
                      <h3>Size</h3>
                      <div className="chip-row">
                        {LOADER_SIZES.map((value) => (
                          <button
                            key={value}
                            type="button"
                            className={
                              loaderSize === value
                                ? 'chip chip--active'
                                : 'chip'
                            }
                            onClick={() => setLoaderSize(value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </section>
                  </>
                ) : null}

                {showCustomToggle ? (
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={useCustomComponent}
                      onChange={(event) =>
                        setUseCustomComponent(event.target.checked)
                      }
                    />
                    <span className="toggle__ui" aria-hidden="true" />
                    <span className="toggle__label">{customToggleLabel}</span>
                  </label>
                ) : null}
              </aside>
            </div>
          </section>

          <section id="loaders" className="docs-section">
            <div className="section-head">
              <h2>Loaders</h2>
              <p>
                Built-in visuals for <code>loaderType</code> when{' '}
                <code>layout=&quot;default&quot;</code>. Click a type to try it
                in the live demo.
              </p>
            </div>
            <div className="loader-grid">
              {LOADER_GALLERY_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={
                    loaderType === type && mode === 'loading'
                      ? 'loader-card loader-card--active'
                      : 'loader-card'
                  }
                  onClick={() => pickLoader(type)}
                >
                  <span className="loader-card__name">{type}</span>
                  <LoaderPreview type={type} />
                </button>
              ))}
            </div>
            <div className="section-head section-head--sub">
              <h3>Loader example</h3>
            </div>
            <CodeBlock code={CODE_LOADER} />
            <div className="section-head section-head--sub">
              <h3>Progress example</h3>
            </div>
            <CodeBlock code={CODE_PROGRESS_LOADER} />
            <div className="section-head section-head--sub">
              <h3>Gradient colors</h3>
            </div>
            <CodeBlock code={CODE_GRADIENT} />
          </section>

          <section id="installation" className="docs-section">
            <div className="section-head">
              <h2>Installation</h2>
              <p>Add the React package to your app.</p>
            </div>
            <CodeBlock code={CODE_INSTALL_NPM} />
            <p className="docs-muted">or</p>
            <CodeBlock code={CODE_INSTALL_PNPM} />
          </section>

          <section id="quick-start" className="docs-section">
            <div className="section-head">
              <h2>Quick Start</h2>
              <p>
                Replace nested loading / error / empty conditionals with one
                declarative component.
              </p>
            </div>
            <CodeBlock code={CODE_QUICK_START} />
          </section>

          <section id="provider" className="docs-section">
            <div className="section-head">
              <h2>Theme provider</h2>
              <p>
                Wrap the app in <code>StateKitProvider</code> to apply loader,
                copy, and colors once. Local <code>State</code> props still
                override the provider. Use this when the host app already has a
                brand theme and you do not want to pass <code>loaderColor</code>{' '}
                on every screen.
              </p>
            </div>
            <CodeBlock code={CODE_PROVIDER} />
          </section>

          <section id="why" className="docs-section">
            <div className="section-head">
              <h2>Why StateKitJS</h2>
              <p>
                StateKitJS is a small React UI kit for loading, empty, error,
                and success. Most apps repeat the same branching for those
                states — that logic gets copied across pages and drifts over
                time.
              </p>
            </div>

            <div className="section-head section-head--sub">
              <h3>The problem</h3>
              <p>
                Nested conditionals and one-off state components everywhere:
              </p>
            </div>
            <CodeBlock code={CODE_PROBLEM} />

            <div className="section-head section-head--sub">
              <h3>The solution</h3>
              <p>
                One declarative <code>State</code> component with a clear
                priority order: loading → error → empty → children.
              </p>
            </div>
            <CodeBlock code={CODE_SOLUTION} />
          </section>

          <section id="loading" className="docs-section">
            <div className="section-head">
              <h2>Loading State</h2>
              <p>
                Highest priority. Use the built-in loader UI, tune copy and
                colors, or replace everything with <code>loadingComponent</code>
                .
              </p>
            </div>

            <div className="section-head section-head--sub">
              <h3>Default UI</h3>
              <p>Out-of-the-box loading title, description, and ring loader.</p>
            </div>
            <div className="mini-stage">
              <State loading>{null}</State>
            </div>
            <CodeBlock code={CODE_LOADING_DEFAULT} />

            <div className="section-head section-head--sub">
              <h3>Customized UI</h3>
              <p>
                Customize loader type, colors, and copy while keeping the
                built-in layout.
              </p>
            </div>
            <div className="mini-stage">
              <State
                loading
                loaderType="ring"
                loaderSize="lg"
                loaderColor={['#7C3AED', '#06B6D4']}
                loadingTitle="Fetching users"
                loadingDescription="Please wait while we load your team."
              >
                {null}
              </State>
            </div>
            <CodeBlock code={CODE_LOADING_CUSTOM} />

            <div className="section-head section-head--sub">
              <h3>Fully custom component</h3>
              <p>
                Pass <code>loadingComponent</code> to replace the built-in UI.
              </p>
            </div>
            <div className="mini-stage">
              <State
                loading
                loadingComponent={
                  <div className="custom-loading" role="status">
                    <p className="custom-badge">User-created component</p>
                    <div className="custom-loading__orb" aria-hidden>
                      <span className="custom-loading__ring" />
                      <span className="custom-loading__core" />
                    </div>
                    <div className="custom-loading__copy">
                      <h2>Syncing your workspace</h2>
                      <p>This fully replaces the built-in loading UI.</p>
                    </div>
                  </div>
                }
              >
                {null}
              </State>
            </div>
            <CodeBlock code={CODE_LOADING_COMPONENT} />
          </section>

          <section id="empty" className="docs-section">
            <div className="section-head">
              <h2>Empty State</h2>
              <p>
                Shown when <code>empty</code> is true and loading/error are not
                active.
              </p>
            </div>

            <div className="section-head section-head--sub">
              <h3>Default UI</h3>
              <p>Built-in empty icon, title, and description.</p>
            </div>
            <div className="mini-stage">
              <State empty>{null}</State>
            </div>
            <CodeBlock code={CODE_EMPTY_DEFAULT} />

            <div className="section-head section-head--sub">
              <h3>Customized UI</h3>
              <p>
                Override the icon, titles, and surface background on the
                built-in empty UI.
              </p>
            </div>
            <div className="mini-stage">
              <State
                empty
                emptyTitle="No users yet"
                emptyDescription="Invite someone to get started."
                emptyIcon={
                  <svg
                    className="docs-empty-glyph"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                    aria-hidden
                  >
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
                emptyBackground={LOADER_COLOR_GRADIENT}
                emptyBackgroundOpacity={0.12}
              >
                {null}
              </State>
            </div>
            <CodeBlock code={CODE_EMPTY_CUSTOM} />

            <div className="section-head section-head--sub">
              <h3>Fully custom component</h3>
              <p>
                Pass <code>emptyComponent</code> for a branded empty view.
              </p>
            </div>
            <div className="mini-stage">
              <State
                empty
                emptyComponent={
                  <div className="custom-empty">
                    <p className="custom-badge">User-created component</p>
                    <div className="custom-empty__icon" aria-hidden>
                      <span className="custom-empty__tray" />
                      <span className="custom-empty__dot" />
                    </div>
                    <div className="custom-empty__copy">
                      <h2>Nothing here yet</h2>
                      <p>Custom empty UI via emptyComponent.</p>
                    </div>
                  </div>
                }
              >
                {null}
              </State>
            </div>
            <CodeBlock code={CODE_EMPTY_COMPONENT} />
          </section>

          <section id="error" className="docs-section">
            <div className="section-head">
              <h2>Error State</h2>
              <p>
                Truthy <code>error</code> wins over empty. Wire{' '}
                <code>onRetry</code> or replace the UI with{' '}
                <code>errorComponent</code>.
              </p>
            </div>

            <div className="section-head section-head--sub">
              <h3>Default UI</h3>
              <p>Built-in error mark, message, and retry action.</p>
            </div>
            <div className="mini-stage">
              <ErrorRetryPreview />
            </div>
            <CodeBlock code={CODE_ERROR_DEFAULT} />

            <div className="section-head section-head--sub">
              <h3>Customized UI</h3>
              <p>
                Override the icon, titles, retry label, and retry button styles
                on the built-in error UI.
              </p>
            </div>
            <div className="mini-stage">
              <ErrorRetryPreview
                title="Could not load users"
                description="Check your connection and try again."
                icon={
                  <svg
                    className="docs-error-glyph"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                    aria-hidden
                  >
                    <path
                      fill="#EA580C"
                      d="M12 2.5 1.8 20.2c-.4.7.1 1.6.9 1.6h18.6c.8 0 1.3-.9.9-1.6L12 2.5zm0 5.2c.6 0 1 .5.9 1.1l-.5 6.2c0 .4-.4.7-.8.7s-.7-.3-.8-.7l-.5-6.2c0-.6.4-1.1.9-1.1H12zm0 11.1a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z"
                    />
                  </svg>
                }
                retryLabel="Retry now"
                retryStyle={{
                  background: '#4F46E5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.65rem',
                  padding: '0.55rem 1.1rem',
                }}
              />
            </div>
            <CodeBlock code={CODE_ERROR_CUSTOM} />

            <div className="section-head section-head--sub">
              <h3>Fully custom component</h3>
              <p>
                Pass <code>errorComponent</code> for full control.
              </p>
            </div>
            <div className="mini-stage">
              <ErrorRetryPreview custom />
            </div>
            <CodeBlock code={CODE_ERROR_COMPONENT} />
          </section>

          <section id="props" className="docs-section">
            <div className="section-head">
              <h2>Props</h2>
              <p>
                Priority when multiple flags are set:{' '}
                <strong>loading → error → empty → children</strong>.
              </p>
            </div>
            <div className="props-table-wrap">
              <table className="props-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {STATE_PROPS.map((row) => (
                    <tr key={row.prop}>
                      <td>
                        <code>{row.prop}</code>
                      </td>
                      <td>
                        <code className="props-table__type">{row.type}</code>
                      </td>
                      <td>
                        <code>{row.defaultValue}</code>
                      </td>
                      <td>{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="examples" className="docs-section">
            <div className="section-head">
              <h2>Examples</h2>
              <p>Common customization patterns from the package README.</p>
            </div>
            <div className="section-head section-head--sub">
              <h3>Gradient loader</h3>
            </div>
            <CodeBlock code={CODE_GRADIENT} />
            <div className="section-head section-head--sub">
              <h3>Custom loading component</h3>
            </div>
            <CodeBlock code={CODE_LOADING_COMPONENT} />
            <div className="section-head section-head--sub">
              <h3>Layouts</h3>
              <p>
                Use <code>layout=&quot;table&quot;</code>,{' '}
                <code>&quot;grid&quot;</code>, or <code>&quot;list&quot;</code>{' '}
                for skeleton loading — try them in the live demo controls.
              </p>
            </div>
          </section>

          <section id="use-cases" className="docs-section">
            <div className="section-head">
              <h2>Use Cases</h2>
              <p>Where StateKit tends to fit best in product UI.</p>
            </div>
            <div className="use-grid">
              {USE_CASES.map((item) => (
                <article key={item.title} className="use-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <footer className="footer">
            <p>
              Built with <code>@statekitjs/react</code>
            </p>
            <div className="footer__links">
              <a
                href="https://www.npmjs.com/package/@statekitjs/react"
                target="_blank"
                rel="noreferrer"
              >
                npm
              </a>
              <a
                href="https://github.com/devsruthi/statekit"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
