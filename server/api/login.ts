export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { username, password } = await readBody<{
    username: string;
    password: string;
  }>(event);

  try {
    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing credentials",
      });
    }
    const loginResponse = await $fetch<any>(
      `${config.public.apiBaseUrl}account/login`,
      {
        method: "PUT",
        body: { username, password },
      }
    );

    await setUserSession(event, {
      user: { uid: loginResponse?.context.uid },
      secure: { session_token: loginResponse?.context.session_token },
    });
  } catch (e: any) {
    throw createError({
      statusCode: e.data?.statusCode || e.statusCode || 500,
      statusMessage: e.data?.message || e.statusMessage || "Login failed",
    });
  }
});
