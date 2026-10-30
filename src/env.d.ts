/// <reference types="astro/client" />

declare global {
  interface Window {
    plausible: (
      eventName: string,
      options?: {
        props?: Record<string, string | number | boolean>;
        callback?: () => void;
        interactive?: boolean;
      }
    ) => void;
  }
}

export {};
