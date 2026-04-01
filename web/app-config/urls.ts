const rawBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ??
  (process.env.NODE_ENV === "development" ? "http://localhost:8080" : "");

// Keep a stable URL shape with no trailing slash.
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");
