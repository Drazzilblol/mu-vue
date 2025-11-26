export default defineEventHandler(async (event) => {
  const repo = await $fetch("https://api.mangaupdates.com/v1/genres", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error("Error fetching genres data:", error);
    return error;
  });
  return repo;
});
