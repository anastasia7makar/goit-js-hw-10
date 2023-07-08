import axios from 'axios';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const infoEl = document.querySelector('.cat-info');

const select = new SlimSelect({
  select: '.breed-select',
});

const messageRefs = {
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

messageRefs.loaderEl.classList.add('is-hidden');
messageRefs.errorEl.classList.add('is-hidden');

axios.defaults.headers.common['x-api-key'] =
  'live_I2zuxC7T4yi6lru2DPe0ECVJNV2vnCj9XnJPFYuu3O4WuY4KDJBC52Dl1qrEyX39';

fetchBreeds()
  .then(resp => {
    const data = resp.data;
    select.setData(createMarkup(data));
  })
  .catch(err => console.log(err));

function createMarkup(arr) {
  return arr.map(item => {
    // return `<option value="${item.id}">${item.name}</option>`;
    {
      return { text: `${item.name}`, value: `${item.id}` };
    }
  });
  // .join('');
}

selectEl.addEventListener('change', handleSelectElChange);

function handleSelectElChange(evt) {
  const currentId = evt.currentTarget.value;

  messageRefs.loaderEl.classList.remove('is-hidden');

  fetchCatByBreed(currentId)
    .then(resp => {
      const infoData = resp.data;

      if (infoData) {
        messageRefs.loaderEl.classList.add('is-hidden');

        infoEl.innerHTML = createInfo(infoData);
      }
    })
    .catch(err => {
      messageRefs.loaderEl.classList.add('is-hidden');
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
      console.log(err);
    });
}

function createInfo(arr) {
  return arr
    .map(({ url, breeds: [{ name, description, temperament }] }) => {
      return `<img src="${url}" alt="${name}" width=400">
      <div class="container">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><strong>Temperament:</strong> ${temperament}
      </p >
      </div>
      `;
    })
    .join('');
}
