import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // Only redirect root path
  if (url.pathname === "/") {
    const acceptLanguage = context.request.headers.get("accept-language") || "";
    // Check if Spanish is preferred (includes es, es-ES, es-MX, etc.)
    const preferredLocale = acceptLanguage.toLowerCase().includes("es") ? "es" : "en";
    return context.redirect(`/${preferredLocale}/`, 302);
  }

  return next();
});
