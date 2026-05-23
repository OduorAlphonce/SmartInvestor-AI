import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? "https://93e048b6a58ff325263770268483e9fc@o4511437972701184.ingest.us.sentry.io/4511437987905536",

  sendDefaultPii: true,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
});
