export default defineEventHandler(async (event) => {
  const { search } = getQuery(event);
  const repo = await $fetch(
    `https://api.mangaupdates.com/v1/categories/search`,
    {
      method: "POST",
      body: {
        search,
        perpage: 25,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => {
    console.error("Error fetching genres data:", error);
    return error;
  });
  return repo;
});
