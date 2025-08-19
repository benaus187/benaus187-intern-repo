// Run: API_BASE_URL=https://httpbin.org node scripts/axios-demo.mjs
console.log("[demo] start");

import { api, makeAborter } from "../src/lib/api/axios.js"; // ← adjust path if needed

(async () => {
  // Keep your configuration; we’ll only shorten timeout for the demo run
  api.defaults.timeout = 3000; // 3s so it can’t “hang” silently
  console.log("[demo] baseURL:", api.defaults.baseURL);

  const { signal, cancel } = makeAborter();
  // auto-cancel after 5s as a safety net
  const t = setTimeout(() => {
    console.log("[demo] auto-cancel -> abort()");
    cancel();
  }, 5000);

  try {
    console.log("[demo] POST /anything (echo)");
    const res = await api.post("/anything", { hello: "world" }, { signal });
    console.log("[demo] status:", res.status);
    console.log("[demo] echoed headers.x-request-id:", res.data?.headers?.["x-request-id"]);
    console.log("[demo] echoed json:", res.data?.json);
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      console.error("[demo] timeout:", err.message);
    } else if (err.code === "ERR_CANCELED") {
      console.error("[demo] canceled:", err.message);
    } else if (err.response) {
      console.error("[demo] http error:", err.response.status, err.response.data);
    } else {
      console.error("[demo] network/other:", err.message || err);
    }
  } finally {
    clearTimeout(t);
    console.log("[demo] done");
  }
})();
