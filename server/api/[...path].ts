export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = (await getUserSession(event)).secure;
  const path = event.context.params?.path || "";
  const url = new URL(`${config.public.apiBaseUrl}${path}`);

  const qs = getQuery(event);
  Object.entries(qs).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.append(k, String(v));
  });

  const method = event.method || "GET";
  const body = method === "GET" ? undefined : await readBody(event);

  const upstreamHeaders: Record<string, string> = {
    authorization: (session as any)?.session_token ?? "",
  };

  const res = await $fetch(url.toString(), {
    method,
    headers: upstreamHeaders,
    body,
  });

  return res;
});
