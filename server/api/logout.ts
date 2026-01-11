export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = (await getUserSession(event)).secure;

  await $fetch<any>(`${config.public.apiBaseUrl}account/logout`, {
    method: "POST",
    headers: { authorization: (session as any)?.session_token ?? "" },
  });

  await clearUserSession(event);
});
