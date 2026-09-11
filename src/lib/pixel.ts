// Helper para el Meta Pixel (id 1160006168952786).
// El script base (fbq('init'...) + PageView inicial) vive en index.html.
// Este helper solo dispara eventos adicionales y nunca inicializa el pixel.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type PixelParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params?: PixelParams) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;

  if (params) {
    window.fbq("track", event, params);
  } else {
    window.fbq("track", event);
  }
}

export function trackPageView() {
  track("PageView");
}
