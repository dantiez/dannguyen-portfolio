import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the hero name', () => {
    render(<App />);
    expect(screen.getAllByText(/DAN NGUYEN TIEN/i).length).toBeGreaterThan(0);
  });

  it('renders main landmark with all section anchors', () => {
    const { container } = render(<App />);
    const ids = ['about', 'experience', 'careertimeline', 'skills', 'contact'];
    ids.forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
  });
});
