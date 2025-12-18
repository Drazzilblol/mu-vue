export default defineEventHandler(async (event) => {
  const { search, group_id, page, perpage } = getQuery(event);
  const repo = await $fetch(`https://api.mangaupdates.com/v1/releases/search`, {
    method: "POST",
    body: {
      search,
      group_id,
      page,
      perpage,
      include_metadata: true,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error("Error fetching genres data:", error);
    return error;
  });
  return repo;
});
