import { describe, expect, it } from 'vitest';
import * as publicApi from '../src/index';
import { State } from '../src/index';

describe('@statekit/react public API', () => {
  it('exports the State component', () => {
    expect(State).toBeTypeOf('function');
  });

  it('does not export internal Loading, Error, Empty, or skeleton components', () => {
    expect(publicApi).not.toHaveProperty('Loading');
    expect(publicApi).not.toHaveProperty('Error');
    expect(publicApi).not.toHaveProperty('Empty');
    expect(publicApi).not.toHaveProperty('TableSkeleton');
    expect(publicApi).not.toHaveProperty('GridSkeleton');
    expect(publicApi).not.toHaveProperty('ListSkeleton');
    expect(publicApi).not.toHaveProperty('DefaultLoading');
    expect(publicApi).toHaveProperty('StateKitProvider');
    expect(publicApi).toHaveProperty('useStateConfig');
  });
});
