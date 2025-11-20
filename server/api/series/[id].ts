export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const repo = await $fetch(`https://api.mangaupdates.com/v1/series/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error("Error fetching manga data:", error);
    return error;
  });
  return repo;
});
