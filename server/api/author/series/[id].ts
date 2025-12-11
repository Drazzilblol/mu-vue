export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const repo = await $fetch(
    `https://api.mangaupdates.com/v1/authors/${id}/series`,
    {
      method: "POST",
      body: {
        orderby: "year",
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => {
    console.error("Error fetching author data:", error);
    return error;
  });
  return repo;
});
