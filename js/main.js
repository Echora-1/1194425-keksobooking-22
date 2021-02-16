import {getSimilarAds} from './data.js';
import {creationAd} from './card-constructor.js';

const SIMILAR_COUNT = 10;
const similarAds = getSimilarAds(SIMILAR_COUNT);
const firstСard = creationAd(similarAds[0]);

document.querySelector('.map__canvas').appendChild(firstСard);
