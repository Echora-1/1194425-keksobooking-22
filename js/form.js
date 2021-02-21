import {STARTING_LATITUDE, STARTING_LONGITUDE} from './map.js';

const addressInput = document.querySelector('#address');

addressInput.value = `${STARTING_LATITUDE.toFixed(5)}, ${STARTING_LONGITUDE.toFixed(5)} `;
