import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const BREEDS_END_POINT = 'breeds';
const SEARCH_END_POINT = 'images/search';
const param = 'breed_ids';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}${BREEDS_END_POINT}`);
}

export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}${SEARCH_END_POINT}?${param}=${breedId}`)
}
