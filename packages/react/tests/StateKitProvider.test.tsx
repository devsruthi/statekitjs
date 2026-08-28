import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { State, StateKitProvider } from '../src/components/State';

describe('StateKitProvider', () => {
  it('applies loader defaults to every State in the tree', () => {
    render(
      <StateKitProvider loaderType="spokes" loaderColor={['#06B6D4']}>
        <State loading>
          <div>Users</div>
        </State>
      </StateKitProvider>,
    );

    const status = screen.getByRole('status', { busy: true });
    expect(status).toHaveAttribute('data-loader-type', 'spokes');
    expect(status).toHaveAttribute('data-loader-color', 'solid');
  });

  it('lets instance props override provider defaults', () => {
    render(
      <StateKitProvider loaderType="spokes" loadingTitle="From provider">
        <State loading loaderType="dots" loadingTitle="From instance">
          <div>Users</div>
        </State>
      </StateKitProvider>,
    );

    expect(screen.getByRole('status')).toHaveAttribute(
      'data-loader-type',
      'dots',
    );
    expect(
      screen.getByRole('heading', { name: 'From instance' }),
    ).toBeInTheDocument();
  });

  it('merges nested providers so inner values win', () => {
    render(
      <StateKitProvider loaderType="ring" loaderSize="xl">
        <StateKitProvider loaderType="bars">
          <State loading>
            <div>Users</div>
          </State>
        </StateKitProvider>
      </StateKitProvider>,
    );

    const status = screen.getByRole('status', { busy: true });
    expect(status).toHaveAttribute('data-loader-type', 'bars');
    expect(status).toHaveAttribute('data-loader-size', 'xl');
  });

  it('can replace the built-in loader globally via loadingComponent', () => {
    render(
      <StateKitProvider loadingComponent={<div>Brand spinner</div>}>
        <State loading>
          <div>Users</div>
        </State>
      </StateKitProvider>,
    );

    expect(screen.getByText('Brand spinner')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
