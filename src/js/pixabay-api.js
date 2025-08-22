import axios from "axios";

 
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = import.meta.env.VITE_PIXABAY_KEY;

export async function getImagesByQuery(query, page=1) {
    if (query.trim().length === 0) {
  throw new Error("Empty query");
  }
  
  try {
    const resp = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page:page,
      }, timeout: 10000
    });
    return {
      hits: resp.data.hits,
      totalHits: resp.data.totalHits
    };
  }catch(err){
  const status = err?.response?.status;
  

  let message;
  if (status === 403) {
    message = "Invalid API key";
  } else if (status === 429) {
    message = "Rate limit exceeded, try again later";
  } else {
    message = "Network or server error";
  }

  throw new Error(message);
}

}   