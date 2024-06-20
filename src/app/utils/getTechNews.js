export default async function getTechNews() {
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  try {
    const res = await fetch(`https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${API_KEY}`, { 'no-cache': true });
    console.log("NEWS RES", res)
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    console.log("Data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function searchTechNews(searchQuery) {
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  // try {
  const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=${API_KEY}`, { 'no-cache': true });
  console.log("SEARCHED NEWS RES", res)
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  try {
    const data = await res.json();
    console.log("Searched Data fetched successfully:", data);
    console.log("SSR DATA:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
