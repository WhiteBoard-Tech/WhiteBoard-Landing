let calendlyLoaded = false;
let calendlyLoading: Promise<void> | null = null;

export async function loadCalendly(): Promise<void> {
  if (calendlyLoaded) return;
  if (calendlyLoading) return calendlyLoading;

  calendlyLoading = new Promise((resolve, reject) => {
    // Load CSS first
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      calendlyLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Calendly widget'));
    document.head.appendChild(script);
  });

  return calendlyLoading;
}

export function openCalendlyPopup(locale: string): void {
  const baseUrl = 'https://calendly.com/whiteboard-co/30min';
  const url = `${baseUrl}?locale=${locale}`;
  window.Calendly.initPopupWidget({ url });
}
