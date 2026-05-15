import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { LocaleProvider } from './lib/i18n/locale-provider';

const renderApp = () =>
  render(
    <LocaleProvider>
      <App />
    </LocaleProvider>,
  );

describe('App', () => {
  it('renders the hero name', () => {
    renderApp();
    expect(screen.getAllByText(/DAN NGUYEN TIEN/i).length).toBeGreaterThan(0);
  });

  it('renders main landmark with all section anchors', () => {
    const { container } = renderApp();
    const ids = ['about', 'achievements', 'careertimeline', 'skills', 'contact'];
    ids.forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
  });
});
