import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { State } from '../src/components/State';

describe('State customization', () => {
  it('customizes default loading copy', () => {
    render(
      <State
        loading
        loadingTitle="Fetching users"
        loadingDescription="Hang tight."
      >
        <div>Users</div>
      </State>,
    );

    expect(
      screen.getByRole('heading', { name: 'Fetching users' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Hang tight.')).toBeInTheDocument();
  });

  it('customizes loading title and description colors', () => {
    render(
      <State
        loading
        loadingTitleColor="#4F46E5"
        loadingDescriptionColor="#64748B"
      >
        <div>Users</div>
      </State>,
    );

    expect(screen.getByRole('heading', { name: 'Loading...' })).toHaveStyle({
      color: '#4F46E5',
    });
    expect(screen.getByText('Please wait a moment')).toHaveStyle({
      color: '#64748B',
    });
  });

  it('customizes default empty copy', () => {
    render(
      <State
        empty
        emptyTitle="No users found"
        emptyDescription="Invite a teammate to get started."
      >
        <div>Users</div>
      </State>,
    );

    expect(
      screen.getByRole('heading', { name: 'No users found' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Invite a teammate to get started.'),
    ).toBeInTheDocument();
  });

  it('customizes empty title and description colors', () => {
    render(
      <State empty emptyTitleColor="#1E3A8A" emptyDescriptionColor="#64748B">
        <div>Users</div>
      </State>,
    );

    expect(
      screen.getByRole('heading', { name: 'No records found' }),
    ).toHaveStyle({ color: '#1E3A8A' });
    expect(screen.getByText('There are no records to display.')).toHaveStyle({
      color: '#64748B',
    });
  });

  it('customizes the empty icon', () => {
    const { container } = render(
      <State empty emptyIcon={<span data-testid="custom-empty-icon">∅</span>}>
        <div>Users</div>
      </State>,
    );

    expect(screen.getByTestId('custom-empty-icon')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeNull();
  });

  it('customizes default error copy and retry', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <State
        error={new Error('network')}
        errorTitle="Could not load users"
        errorDescription="Check your connection and try again."
        onRetry={onRetry}
      >
        <div>Users</div>
      </State>,
    );

    expect(
      screen.getByRole('heading', { name: 'Could not load users' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Check your connection and try again.'),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('customizes error title and description colors', () => {
    render(
      <State
        error="boom"
        errorTitleColor="#B91C1C"
        errorDescriptionColor="#9F1239"
      >
        <div>Users</div>
      </State>,
    );

    expect(
      screen.getByRole('heading', { name: 'Something went wrong!' }),
    ).toHaveStyle({ color: '#B91C1C' });
    expect(screen.getByText('Unable to load the content.')).toHaveStyle({
      color: '#9F1239',
    });
  });

  it('uses a custom loading component instead of the default UI', () => {
    render(
      <State
        loading
        loadingTitle="Ignored"
        loadingComponent={<div>Custom spinner</div>}
      >
        <div>Users</div>
      </State>,
    );

    expect(screen.getByText('Custom spinner')).toBeInTheDocument();
    expect(screen.queryByText('Ignored')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Loading...' }),
    ).not.toBeInTheDocument();
  });

  it('uses a custom loading component instead of layout skeletons', () => {
    render(
      <State
        loading
        layout="table"
        loadingComponent={<div>Custom table loader</div>}
      >
        <div>Users</div>
      </State>,
    );

    expect(screen.getByText('Custom table loader')).toBeInTheDocument();
    expect(screen.queryByText('Loading table')).not.toBeInTheDocument();
  });

  it('uses a custom empty component instead of the default UI', () => {
    render(
      <State empty emptyComponent={<div>Nothing here</div>}>
        <div>Users</div>
      </State>,
    );

    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.queryByText('No records found')).not.toBeInTheDocument();
  });

  it('uses a custom error component instead of the default UI', () => {
    render(
      <State
        error="boom"
        errorTitle="Ignored"
        onRetry={() => undefined}
        errorComponent={<div>Custom error panel</div>}
      >
        <div>Users</div>
      </State>,
    );

    expect(screen.getByText('Custom error panel')).toBeInTheDocument();
    expect(screen.queryByText('Ignored')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Try again' }),
    ).not.toBeInTheDocument();
  });

  it('hides the retry button when errorHideRetry is true', () => {
    render(
      <State error="boom" errorHideRetry onRetry={() => undefined}>
        <div>Users</div>
      </State>,
    );

    expect(
      screen.queryByRole('button', { name: 'Try again' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Something went wrong!' }),
    ).toBeInTheDocument();
  });

  it('passes loadingTitle through to skeleton labels', () => {
    render(
      <State loading layout="list" loadingTitle="Refreshing inbox">
        <div>Inbox</div>
      </State>,
    );

    expect(screen.getByText('Refreshing inbox')).toBeInTheDocument();
  });
});
