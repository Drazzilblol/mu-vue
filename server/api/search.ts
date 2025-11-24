export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const repo = await $fetch("https://api.mangaupdates.com/v1/series/search", {
    method: "POST",
    body: {
      ...query,
      orderby: "year_pos",
      perpage: 40,
      include_rank_metadata: true,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error("Error fetching manga data:", error);
    return error;
  });
  return repo;
});
