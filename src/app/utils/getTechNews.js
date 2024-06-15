export default async function getTechNews() {
  try {
    const res = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json');
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
