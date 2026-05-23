import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://93e048b6a58ff325263770268483e9fc@o4511437972701184.ingest.us.sentry.io/4511437987905536",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});