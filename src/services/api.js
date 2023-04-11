import axios from 'axios';

const KEY_API = '33747694-4a7d646e14d783512846269ff';
const BASE_URL = 'https://pixabay.com/api/';

export default async function apiService(searchQuery) {
  const response = await axios.get(
    `${BASE_URL}?q=${searchQuery}&page=1&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
}
