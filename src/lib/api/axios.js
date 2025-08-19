// src/lib/api/axios.js
import axios from "axios";

/** Generate a request ID without extra deps */
function genRequestId() {
  // modern browsers have crypto.randomUUID()
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Create one reusable axios instance */
export const api = axios.create({
  baseURL: import.meta?.env?.VITE_API_BASE_URL || process.env.API_BASE_URL || "http://localhost:8000",
  timeout: 10_000, // 10s: fail fast on bad networks
  headers: {
    Accept: "*/*",
  },
});

/**
 * Request interceptor
 * - add dynamic request id
 * - attach Bearer token from localStorage if present
 */
api.interceptors.request.use(
  (config) => {
    // Always attach a fresh request id
    config.headers["x-request-id"] = genRequestId();

    // Attach auth token if we have one
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // localStorage may be unavailable (SSR), just ignore
    }

    return config;
  },
  (error) => {
    // Something went wrong before the request was sent
    return Promise.reject(error);
  }
);

/**
 * Response/error handling helper (optional)
 * can centralize common error shapes/logging here.
 */
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Axios v1 supports AbortController; canceled requests arrive with code: 'ERR_CANCELED'
    if (axios.isCancel?.(error) || error.code === "ERR_CANCELED") {
      // Swallow or rethrow depending on your UX
      return Promise.reject(error);
    }

    // Timeout errors carry code 'ECONNABORTED'
    if (error.code === "ECONNABORTED") {
      // You could show a toast, retry logic, etc.
      // Example: attach a friendly message
      error.friendlyMessage = "The request took too long and timed out. Please try again.";
      return Promise.reject(error);
    }

    // 401 → not authenticated
    if (error.response?.status === 401) {
      // Optional: clear token and redirect to login
      try {
        localStorage.removeItem("auth_token");
      } catch {}
      // You can centralize navigation elsewhere; here we just tag the error
      error.needsAuthRedirect = true;
    }

    return Promise.reject(error);
  }
);

/**
 * Helper to create a cancellable request
 * Usage:
 *   const { signal, cancel } = makeAborter();
 *   api.get('/path', { signal })
 *   cancel(); // to abort
 */
export function makeAborter() {
  const controller = new AbortController();
  return { signal: controller.signal, cancel: () => controller.abort() };
}
