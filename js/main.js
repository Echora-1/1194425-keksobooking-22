import {getSimilarAds} from './data.js';
import {createAd} from './card-constructor.js';

const SIMILAR_COUNT = 10;
const similarAds = getSimilarAds(SIMILAR_COUNT);
const firstСard = createAd(similarAds[0]);

document.querySelector('.map__canvas').appendChild(firstСard);
