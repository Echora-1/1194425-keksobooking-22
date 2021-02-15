import {getSimilarAds} from './data.js';
import {getCard} from './ad-generation.js';

const SIMILAR_COUNT = 10;
const similarAds = getSimilarAds(SIMILAR_COUNT);
const firstСard = getCard(similarAds[0]);

document.querySelector('.map__canvas').appendChild(firstСard);
