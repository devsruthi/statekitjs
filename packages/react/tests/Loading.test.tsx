import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Loading } from '../src/components/Loading';

describe('Loading', () => {
  it('renders an accessible busy status region with defaults', () => {
    const { container } = render(<Loading />);

    const status = screen.getByRole('status', { busy: true });
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('data-loader-type', 'ring');
    expect(status).toHaveAttribute('data-loader-size', 'md');
    expect(status).toHaveAttribute('data-loader-color', 'solid');
    expect(status).toHaveAttribute('data-loader-background', 'none');
    expect(status.tagName).toBe('SECTION');
    expect(
      screen.getByRole('heading', { name: 'Loading...' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Please wait a moment')).toBeInTheDocument();
    expect(container.querySelector('[data-loader="ring"]')).not.toBeNull();
  });

  it('supports custom copy via text/subtext', () => {
    render(<Loading text="Fetching users" subtext="Almost ready." />);

    expect(
      screen.getByRole('heading', { name: 'Fetching users' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Almost ready.')).toBeInTheDocument();
  });

  it('supports legacy title/description props', () => {
    render(<Loading title="Fetching users" description="Almost ready." />);

    expect(
      screen.getByRole('heading', { name: 'Fetching users' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Almost ready.')).toBeInTheDocument();
  });

  it('renders alternate loader types', () => {
    const { container, rerender } = render(<Loading type="dots" />);
    expect(container.querySelector('[data-loader="dots"]')).not.toBeNull();

    rerender(<Loading type="spokes" />);
    expect(container.querySelector('[data-loader="spokes"]')).not.toBeNull();

    rerender(<Loading type="progress-circle" progress={72} />);
    expect(
      container.querySelector('[data-loader="progress-circle"]'),
    ).not.toBeNull();
    expect(screen.getByText('72%')).toBeInTheDocument();
  });

  it('uses a single color as a solid fill', () => {
    const { container } = render(<Loading color={['#06B6D4']} />);

    const graphic = container.querySelector('[data-loader="ring"]');
    expect(graphic).not.toBeNull();
    expect(
      (graphic as HTMLElement).style.getPropertyValue('--sk-loader-from'),
    ).toBe('#06B6D4');
    expect(
      (graphic as HTMLElement).style.getPropertyValue('--sk-loader-to'),
    ).toBe('#06B6D4');
    expect(screen.getByRole('status')).toHaveAttribute(
      'data-loader-color',
      'solid',
    );
  });

  it('uses multiple colors as a gradient', () => {
    const { container } = render(<Loading color={['#7C3AED', '#06B6D4']} />);

    const graphic = container.querySelector('[data-loader="ring"]');
    expect(graphic).not.toBeNull();
    expect(
      (graphic as HTMLElement).style.getPropertyValue('--sk-loader-from'),
    ).toBe('#7C3AED');
    expect(
      (graphic as HTMLElement).style.getPropertyValue('--sk-loader-to'),
    ).toBe('#06B6D4');
    expect(screen.getByRole('status')).toHaveAttribute(
      'data-loader-color',
      'gradient',
    );
  });

  it('marks decorative media as hidden from assistive tech', () => {
    const { container } = render(<Loading />);
    const media = container.querySelector('[aria-hidden="true"]');
    expect(media).not.toBeNull();
  });

  it('defaults to no background and paints solid or gradient fills', () => {
    const { rerender } = render(<Loading />);
    let status = screen.getByRole('status');
    expect(status).toHaveAttribute('data-loader-background', 'none');
    expect(status).toHaveStyle({ background: 'transparent' });

    rerender(<Loading background={['#4F46E5']} backgroundOpacity={0.2} />);
    status = screen.getByRole('status');
    expect(status).toHaveAttribute('data-loader-background', 'solid');
    expect(status.style.background).toContain('color-mix');
    expect(status.style.background).toMatch(/#4F46E5|rgb\(79,\s*70,\s*229\)/i);
    expect(status.style.getPropertyValue('--sk-color-fg')).toBe('');

    rerender(
      <Loading background={['#7C3AED', '#06B6D4']} backgroundOpacity={0.35} />,
    );
    status = screen.getByRole('status');
    expect(status).toHaveAttribute('data-loader-background', 'gradient');
    expect(status.style.background).toContain('linear-gradient');
    expect(status.style.background).toMatch(/#7C3AED|rgb\(124,\s*58,\s*237\)/i);
    expect(status.style.background).toMatch(/#06B6D4|rgb\(6,\s*182,\s*212\)/i);
  });

  it('does not change title or description color based on background opacity', () => {
    render(<Loading background={['#4F46E5']} backgroundOpacity={0.9} />);

    const status = screen.getByRole('status');
    expect(status.style.getPropertyValue('--sk-color-fg')).toBe('');
    expect(status.style.getPropertyValue('--sk-color-fg-muted')).toBe('');
  });
});
