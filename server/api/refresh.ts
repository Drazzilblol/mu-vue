export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = (await getUserSession(event)).secure;

  const refreshResponse = await $fetch<any>(
    `${config.public.apiBaseUrl}account/refresh`,
    {
      method: "GET",
      headers: { authorization: (session as any)?.session_token ?? "" },
    }
  );

  await setUserSession(event, {
    user: { uid: refreshResponse?.context.uid },
    secure: { session_token: refreshResponse?.context.session_token },
  });
});
