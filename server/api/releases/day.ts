export default defineEventHandler(async (event) => {
  const { page } = getQuery(event);
  const repo = await $fetch(
    `https://api.mangaupdates.com/v1/releases/days?page=${page}&include_metadata=true`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => {
    console.error("Error fetching releases by day data:", error);
    return error;
  });
  return repo;
});
