import {
  createContext,
  useContext,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { StateDefaults, StateProps } from './State.types';

const StateConfigContext = createContext<StateDefaults>({});

function pickDefined<T extends object>(value: T): Partial<T> {
  const next: Partial<T> = {};

  for (const key of Object.keys(value) as (keyof T)[]) {
    if (value[key] !== undefined) {
      next[key] = value[key];
    }
  }

  return next;
}

/**
 * Merges provider defaults with instance props.
 * Defined instance values win; omitted values fall back to the provider.
 */
export function mergeStateProps(
  defaults: StateDefaults,
  props: StateProps,
): StateProps {
  return {
    ...defaults,
    ...pickDefined(props),
  };
}

export type StateKitProviderProps = StateDefaults & {
  children: ReactNode;
};

/**
 * Supplies default `State` appearance for the subtree.
 * Use this to apply a host theme (loader, copy, colors, icons) once
 * instead of repeating props on every `State`.
 *
 * Nested providers merge: inner values override outer ones.
 * A `State` instance still wins over the provider.
 *
 * @example
 * <StateKitProvider loaderType="activity" loaderColor={[theme.primary]}>
 *   <App />
 * </StateKitProvider>
 */
export function StateKitProvider({
  children,
  ...defaults
}: StateKitProviderProps): ReactElement {
  const parent = useContext(StateConfigContext);
  const value = { ...parent, ...pickDefined(defaults) };

  return (
    <StateConfigContext.Provider value={value}>
      {children}
    </StateConfigContext.Provider>
  );
}

/**
 * Current provider defaults. Empty object when no `StateKitProvider` is mounted.
 */
export function useStateConfig(): StateDefaults {
  return useContext(StateConfigContext);
}
