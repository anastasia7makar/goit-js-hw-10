import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const BREEDS_END_POINT = 'breeds';
const SEARCH_END_POINT = 'images/search';
const param = 'breed_ids';

axios.defaults.baseURL = BASE_URL;

export function fetchBreeds() {
  return axios.get(`${BREEDS_END_POINT}`);
}

export function fetchCatByBreed(breedId) {
    return axios.get(`${SEARCH_END_POINT}?${param}=${breedId}`)
}
