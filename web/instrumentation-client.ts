import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? "https://93e048b6a58ff325263770268483e9fc@o4511437972701184.ingest.us.sentry.io/4511437987905536",

  sendDefaultPii: true,

  // 100% in dev, 10% in production
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  // Session Replay: 10% of all sessions, 100% of sessions with errors
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration(),
  ],
});

// Hook into App Router navigation transitions (App Router only)
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
