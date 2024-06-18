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
