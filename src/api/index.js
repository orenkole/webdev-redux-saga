export const getLatestNews = async (query) => {
  const request = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
  return await request.json();
}
