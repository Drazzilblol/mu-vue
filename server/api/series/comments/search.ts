export default defineEventHandler(async (event) => {
  const { id, method, page, perpage, added_by } = getQuery(event);
  const repo = await $fetch(
    `https://api.mangaupdates.com/v1/series/${id}/comments/search`,
    {
      method: "POST",
      body: {
        method,
        page,
        perpage,
        added_by,
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
