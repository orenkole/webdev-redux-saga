export const getLatestNews = async () => {
  const request = await fetch(`http://hn.algolia.com/api/v1/search?query=react`);
  return await request.json();
}
