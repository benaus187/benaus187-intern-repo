// Run: API_BASE_URL=https://httpbin.org node scripts/axios-demo.mjs
console.log("[demo] start");
import { api, makeAborter } from "../src/lib/api/axios.js";

(async () => {
  // shorter timeout for demos
  api.defaults.timeout = 3000;
  console.log("[demo] baseURL:", api.defaults.baseURL);

  const { signal, cancel } = makeAborter();
  const t = setTimeout(() => {
    console.log("[demo] auto-cancel -> abort()");
    cancel();
  }, 5000);

  try {
    console.log("[demo] POST /anything (echo)");
    const res = await api.post("/anything", { hello: "world" }, { signal });
    console.log("[demo] status:", res.status);

    // Support both httpbin and our tiny local server
    const echoedHeaders = res.data?.headers;      // httpbin only
    const echoedJson    = res.data?.json;         // httpbin only
    const echoedBody    = res.data?.body;         // local echo server only

    const reqId =
      echoedHeaders?.["x-request-id"] ??
      echoedHeaders?.["X-Request-Id"] ?? // just in case
      "(not returned by server)";
    console.log("[demo] echoed request-id:", reqId);

    const payload = echoedJson ?? echoedBody ?? "(no body returned)";
    console.log("[demo] echoed payload:", payload);
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
