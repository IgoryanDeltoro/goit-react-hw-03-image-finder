import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33271147-5afaaee1c63d4032ce2c866af';

const apiQueries = async (currentNume, page) => {
  const response = await axios.get(
    `${BASE_URL}?q=${currentNume}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};

export default apiQueries;
