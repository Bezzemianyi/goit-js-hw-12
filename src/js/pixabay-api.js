import axios from "axios";

const API_KEY = "47599452-88585afd800a8eb35bdc3af8b";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(currentQury = "", page = 1) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: currentQury,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page,
        per_page: 15
    });
    try {
        const response = await axios(`${BASE_URL}?${params}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.statusText);
    }
}