import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const infoEl = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_I2zuxC7T4yi6lru2DPe0ECVJNV2vnCj9XnJPFYuu3O4WuY4KDJBC52Dl1qrEyX39';

fetchBreeds()
  .then(resp => {
    const data = resp.data;

    selectEl.innerHTML = createMarkup(data);
  })
  .catch(err => console.log(err));

function createMarkup(arr) {
  return arr
    .map(item => {
      return `<option value="${item.id}">${item.name}</option>`;
    })
    .join('');
}

selectEl.addEventListener('change', handleSelectElChange);

function handleSelectElChange(evt) {
  const currentId = evt.currentTarget.value;

  fetchCatByBreed(currentId).then(resp => {
    const infoData = resp.data;

    infoEl.insertAdjacentHTML('beforeend', createInfo(infoData));
  });
}

function createInfo(arr) {
  return arr
    .map(({ url, breeds: [{ name, description, temperament }] }) => {
      return `<img src="${url}" alt="${name}" width=400">
      <h2>${name}</h2>
      <p>${description}</p>
      <p>${temperament}</p>`;
    })
    .join('');
}
