import React, { type ReactNode } from 'react';

interface TooltipProps {
  label: string;
  children: ReactNode;
  /** Which edge of the trigger the tooltip sits on. Default 'top'. */
  side?: 'top' | 'bottom';
  /** Suppress the bubble (e.g. while the trigger's own menu is open). */
  disabled?: boolean;
}

/**
 * Pure-CSS tooltip wrapper. No JS state, no library deps.
 *
 * Reveal:
 *   - mouse hover on trigger     → group-hover/tooltip
 *   - keyboard focus on trigger  → :focus-visible inside the group
 *     (NOT plain focus: a mouse click keeps focus on the button, which made
 *     the bubble stick around after the pointer had left)
 *
 * a11y: the bubble is `aria-hidden` because every consumer already
 * provides an `aria-label` on the icon-only button. The tooltip is
 * purely visual reinforcement — no duplicate screen reader announce.
 *
 * Mobile: touch devices have no hover, so the tooltip never shows.
 * That's fine — touch users get the same info via the button's
 * `aria-label` exposed through accessibility tools.
 */
const Tooltip: React.FC<TooltipProps> = ({ label, children, side = 'top', disabled = false }) => {
  const positionClass =
    side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';

  return (
    <span className="relative inline-flex group/tooltip">
      {children}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 z-50 ${positionClass} ${disabled ? 'hidden' : ''}`}
      >
        <span className="block whitespace-nowrap rounded-md bg-slate-900 dark:bg-slate-100 px-2.5 py-1 text-xs font-medium text-white dark:text-slate-900 shadow-lg opacity-0 transition-opacity duration-150 group-hover/tooltip:opacity-100 group-has-[:focus-visible]/tooltip:opacity-100">
          {label}
        </span>
      </span>
    </span>
  );
};

export default Tooltip;
