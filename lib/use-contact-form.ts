import { useCallback, useState } from 'react';

export type FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'offline';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as
  | string
  | undefined;

interface SubmitOptions {
  /** Honeypot field value — non-empty means bot, silently succeed. */
  honeypot?: string;
}

/**
 * Hook wrapping the Formspree contact form submission.
 *
 * Env var `VITE_FORMSPREE_ENDPOINT` must be set (e.g. https://formspree.io/f/xxxxxxxx).
 * When missing, the hook returns status='offline' so the UI can degrade
 * gracefully to a "please email me directly" notice instead of a broken form.
 */
export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>(
    FORMSPREE_ENDPOINT ? 'idle' : 'offline',
  );

  const submit = useCallback(
    async (form: HTMLFormElement, options: SubmitOptions = {}) => {
      // Drop bot submissions silently — looks like success to the bot.
      if (options.honeypot && options.honeypot.trim() !== '') {
        setStatus('success');
        return;
      }

      if (!FORMSPREE_ENDPOINT) {
        setStatus('offline');
        return;
      }

      setStatus('sending');

      try {
        const formData = new FormData(form);
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          form.reset();
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setStatus(FORMSPREE_ENDPOINT ? 'idle' : 'offline');
  }, []);

  return { status, submit, reset, isOffline: !FORMSPREE_ENDPOINT };
}
