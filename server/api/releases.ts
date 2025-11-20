export default defineEventHandler(async (event) => {
  const repo = await $fetch(
    "https://api.mangaupdates.com/v1/releases/days?include_metadata=true",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => {
    console.error("Error fetching manga data:", error);
    return error;
  });
  return repo;
});
